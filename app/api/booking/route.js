const TO = "booking@willyonthewire.com";

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

  const required = ["name", "email", "phone", "date", "location", "time", "endTime", "attendees"];
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
    line("Event date", body.date),
    line("Event location", body.location),
    line("Start time", body.time),
    line("End time", body.endTime),
    line("Expected attendance", body.attendees),
    line("Additional details", body.details),
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Willy on the Wire <booking@mail.willyonthewire.com>",
      to: [TO],
      reply_to: String(body.email).trim(),
      subject: `Booking: ${String(body.location).trim()} — ${String(body.name).trim()}`,
      text,
    }),
  });

  if (!response.ok) {
    return Response.json({ error: "Mail failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
