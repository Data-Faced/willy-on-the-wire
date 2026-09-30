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

  return Response.json({ ok: true });
}
