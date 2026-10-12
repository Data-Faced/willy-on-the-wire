"use client";

import { useState } from "react";

const empty = {
  name: "",
  email: "",
  phone: "",
  event: "",
  date: "",
  time: "",
  endTime: "",
  attendees: "",
  details: "",
};

export default function BookingForm() {
  const [fields, setFields] = useState(empty);
  const [status, setStatus] = useState("idle");

  function update(event) {
    const { name, value } = event.target;
    setFields((current) => ({ ...current, [name]: value }));
  }

  async function submit(event) {
    event.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setFields(empty);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p className="form-note">
        Request received. We will follow up. If you need a faster answer, DM
        @willyonthewire.
      </p>
    );
  }

  return (
    <form className="booking-form" onSubmit={submit}>
      <div className="form-row">
        <label>
          Name
          <input
            name="name"
            type="text"
            required
            autoComplete="name"
            value={fields.name}
            onChange={update}
          />
        </label>
        <label>
          Email
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            value={fields.email}
            onChange={update}
          />
        </label>
      </div>
      <div className="form-row">
        <label>
          Phone
          <input
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            value={fields.phone}
            onChange={update}
          />
        </label>
        <label>
          Event
          <input
            name="event"
            type="text"
            required
            placeholder="Bar, wedding, private party"
            value={fields.event}
            onChange={update}
          />
        </label>
      </div>
      <div className="form-row">
        <label>
          Date
          <input
            name="date"
            type="date"
            required
            value={fields.date}
            onChange={update}
          />
        </label>
        <label>
          Start time
          <input
            name="time"
            type="time"
            required
            value={fields.time}
            onChange={update}
          />
        </label>
      </div>
      <div className="form-row">
        <label>
          End time
          <input
            name="endTime"
            type="time"
            required
            value={fields.endTime}
            onChange={update}
          />
        </label>
        <label>
          Expected attendance
          <input
            name="attendees"
            type="number"
            min="1"
            required
            value={fields.attendees}
            onChange={update}
          />
        </label>
      </div>
      <label>
        Tell us more!
        <textarea
          name="details"
          rows="4"
          value={fields.details}
          onChange={update}
        />
      </label>
      <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending" : "Send booking request"}
      </button>
      {status === "error" ? (
        <p className="form-note">
          That did not send. Try again or DM @willyonthewire.
        </p>
      ) : null}
    </form>
  );
}
