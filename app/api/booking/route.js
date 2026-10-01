const TO = "wsandish@gmail.com";

function line(label, value) {
  return `${label}: ${String(value || "").trim() || "—"}`;
}

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const required = ["name", "email", "phone", "event", "date", "time", "attendees"];
  const missing = required.filter((key) => !String(body?.[key] || "").trim());

  if (missing.length) {
    return Response.json({ error: "Missing fields", missing }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return Response.json({ error: "Mail is not configured" }, { status: 500 });
  }

  const text = [
    "New booking request from willyonthewire.com",
    "",
    line("Name", body.name),
    line("Email", body.email),
    line("Phone", body.phone),
    line("Event", body.event),
    line("Date", body.date),
    line("Time", body.time),
    line("Attendees", body.attendees),
    line("Details", body.details),
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Willy on the Wire <onboarding@resend.dev>",
      to: [TO],
      reply_to: String(body.email).trim(),
      subject: `Booking: ${String(body.event).trim()} — ${String(body.name).trim()}`,
      text,
    }),
  });

  if (!response.ok) {
    return Response.json({ error: "Mail failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
