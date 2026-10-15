"use client";

import { useState } from "react";

const empty = {
  name: "",
  email: "",
  phone: "",
  date: "",
  location: "",
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
        Request received. We will get back to you. If you need a faster answer, DM
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
            autoComplete="tel"
            value={fields.phone}
            onChange={update}
          />
        </label>
        <label>
          Event date
          <input
            name="date"
            type="date"
            value={fields.date}
            onChange={update}
          />
        </label>
      </div>
      <div className="form-row">
        <label>
          Start time
          <input
            name="time"
            type="time"
            value={fields.time}
            onChange={update}
          />
        </label>
        <label>
          End time
          <input
            name="endTime"
            type="time"
            value={fields.endTime}
            onChange={update}
          />
        </label>
      </div>
      <div className="form-row">
        <label>
          Event location
          <input
            name="location"
            type="text"
            placeholder="Venue or address"
            value={fields.location}
            onChange={update}
          />
        </label>
        <label>
          Expected attendance
          <input
            name="attendees"
            type="number"
            min="1"
            value={fields.attendees}
            onChange={update}
          />
        </label>
      </div>
      <label>
        Additional details
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
