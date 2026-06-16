"use client";

import { useId, useState, useTransition, type FormEvent } from "react";

type Intent = "relocation" | "tour";
type City = "Busan" | "Seoul" | "Other";
type Duration = "half" | "full";

type FieldErrors = Record<string, string>;

const serviceOptions = [
  { value: "visa", label: "Visa" },
  { value: "housing", label: "Housing" },
  { value: "settling-in", label: "Settling-in" },
  { value: "transportation", label: "Transportation" },
];

const inputClass =
  "w-full rounded-xl border border-navy-900/15 bg-white px-4 py-3 text-sm text-navy-900 placeholder:text-navy-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-500";

const labelClass = "text-sm font-semibold text-navy-900";

function fieldErrorClass(hasError: boolean) {
  return hasError ? "border-[#B42318] focus-visible:outline-[#B42318]" : "";
}

export function ConsultationForm({ context }: { context: Intent }) {
  const formId = useId();
  const [intent, setIntent] = useState<Intent>(context);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [city, setCity] = useState<City | "">("");
  const [services, setServices] = useState<string[]>([]);
  const [timeline, setTimeline] = useState("");
  const [tourDate, setTourDate] = useState("");
  const [partySize, setPartySize] = useState("");
  const [duration, setDuration] = useState<Duration | "">("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");

  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  function toggleService(value: string) {
    setServices((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
    );
  }

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (!name.trim()) next.name = "Name is required.";
    if (!email.trim()) {
      next.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = "Enter a valid email address.";
    }
    if (!message.trim()) next.message = "Tell us a little about what you need.";

    if (intent === "tour") {
      if (!tourDate) next.tourDate = "Preferred date is required.";
      if (!partySize || Number(partySize) <= 0) next.partySize = "Party size is required.";
      if (!duration) next.duration = "Choose a duration.";
    }

    return next;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (website.trim()) {
      // Honeypot tripped — silently drop without revealing the trap to bots.
      setStatus("success");
      setStatusMessage("Thanks — Rosh will be in touch shortly.");
      return;
    }

    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length > 0) {
      setStatus("idle");
      return;
    }

    const payload = {
      intent,
      name,
      email,
      phone,
      company,
      city: city || undefined,
      services: intent === "relocation" ? services : undefined,
      timeline: intent === "relocation" ? timeline : undefined,
      tourDate: intent === "tour" ? tourDate : undefined,
      partySize: intent === "tour" ? Number(partySize) : undefined,
      duration: intent === "tour" ? duration : undefined,
      message,
      website,
    };

    startTransition(async () => {
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();

        if (res.ok && data.ok) {
          setStatus("success");
          setStatusMessage("Thanks — Rosh will be in touch shortly.");
          setErrors({});
        } else {
          setStatus("error");
          setStatusMessage(
            data.error || "Something went wrong sending your message. Please try again."
          );
        }
      } catch {
        setStatus("error");
        setStatusMessage("Something went wrong sending your message. Please try again.");
      }
    });
  }

  const sending = isPending;

  return (
    <div className="rounded-2xl border border-navy-900/10 bg-white p-6 shadow-sm sm:p-8">
      {/* Intent toggle */}
      <div
        role="radiogroup"
        aria-label="What do you need help with?"
        className="mb-8 inline-flex rounded-full bg-sand-50 p-1"
      >
        {(
          [
            { value: "relocation", label: "Relocation" },
            { value: "tour", label: "Private Tour" },
          ] as const
        ).map((option) => (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={intent === option.value}
            onClick={() => setIntent(option.value)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-500 ${
              intent === option.value
                ? "bg-steel-500 text-white"
                : "text-navy-900/70 hover:text-navy-900"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {/* Honeypot — hidden from sighted users, present for bots */}
        <div
          className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
          aria-hidden="true"
        >
          <label htmlFor={`${formId}-website`}>Leave this empty</label>
          <input
            id={`${formId}-website`}
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor={`${formId}-name`} className={labelClass}>
              Name <span className="text-[#B42318]">*</span>
            </label>
            <input
              id={`${formId}-name`}
              name="name"
              type="text"
              required
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? `${formId}-name-error` : undefined}
              className={`${inputClass} ${fieldErrorClass(Boolean(errors.name))}`}
            />
            {errors.name && (
              <p id={`${formId}-name-error`} className="text-sm text-[#B42318]">
                {errors.name}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor={`${formId}-email`} className={labelClass}>
              Email <span className="text-[#B42318]">*</span>
            </label>
            <input
              id={`${formId}-email`}
              name="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? `${formId}-email-error` : undefined}
              className={`${inputClass} ${fieldErrorClass(Boolean(errors.email))}`}
            />
            {errors.email && (
              <p id={`${formId}-email-error`} className="text-sm text-[#B42318]">
                {errors.email}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor={`${formId}-phone`} className={labelClass}>
              WhatsApp <span className="text-navy-900/40">(optional)</span>
            </label>
            <input
              id={`${formId}-phone`}
              name="phone"
              type="tel"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor={`${formId}-company`} className={labelClass}>
              Company <span className="text-navy-900/40">(optional)</span>
            </label>
            <input
              id={`${formId}-company`}
              name="company"
              type="text"
              autoComplete="organization"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor={`${formId}-city`} className={labelClass}>
              City <span className="text-navy-900/40">(optional)</span>
            </label>
            <select
              id={`${formId}-city`}
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value as City)}
              className={inputClass}
            >
              <option value="">Select a city</option>
              <option value="Busan">Busan</option>
              <option value="Seoul">Seoul</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {intent === "relocation" ? (
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <span className={labelClass}>
                Services <span className="text-navy-900/40">(optional)</span>
              </span>
              <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-4">
                {serviceOptions.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-2 text-sm text-navy-900/80"
                  >
                    <input
                      type="checkbox"
                      name="services"
                      value={option.value}
                      checked={services.includes(option.value)}
                      onChange={() => toggleService(option.value)}
                      className="h-4 w-4 rounded border-navy-900/25 text-steel-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-500"
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor={`${formId}-timeline`} className={labelClass}>
                Timeline <span className="text-navy-900/40">(optional)</span>
              </label>
              <input
                id={`${formId}-timeline`}
                name="timeline"
                type="text"
                placeholder="e.g. Moving in 3 months"
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="flex flex-col gap-2">
              <label htmlFor={`${formId}-tourDate`} className={labelClass}>
                Preferred date <span className="text-[#B42318]">*</span>
              </label>
              <input
                id={`${formId}-tourDate`}
                name="tourDate"
                type="date"
                required
                value={tourDate}
                onChange={(e) => setTourDate(e.target.value)}
                aria-invalid={Boolean(errors.tourDate)}
                aria-describedby={errors.tourDate ? `${formId}-tourDate-error` : undefined}
                className={`${inputClass} ${fieldErrorClass(Boolean(errors.tourDate))}`}
              />
              {errors.tourDate && (
                <p id={`${formId}-tourDate-error`} className="text-sm text-[#B42318]">
                  {errors.tourDate}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor={`${formId}-partySize`} className={labelClass}>
                Party size <span className="text-[#B42318]">*</span>
              </label>
              <input
                id={`${formId}-partySize`}
                name="partySize"
                type="number"
                min={1}
                required
                value={partySize}
                onChange={(e) => setPartySize(e.target.value)}
                aria-invalid={Boolean(errors.partySize)}
                aria-describedby={errors.partySize ? `${formId}-partySize-error` : undefined}
                className={`${inputClass} ${fieldErrorClass(Boolean(errors.partySize))}`}
              />
              {errors.partySize && (
                <p id={`${formId}-partySize-error`} className="text-sm text-[#B42318]">
                  {errors.partySize}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <span className={labelClass}>
                Duration <span className="text-[#B42318]">*</span>
              </span>
              <div className="flex gap-4 pt-1">
                {(
                  [
                    { value: "half", label: "Half day" },
                    { value: "full", label: "Full day" },
                  ] as const
                ).map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-2 text-sm text-navy-900/80"
                  >
                    <input
                      type="radio"
                      name="duration"
                      value={option.value}
                      checked={duration === option.value}
                      onChange={() => setDuration(option.value)}
                      className="h-4 w-4 border-navy-900/25 text-steel-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-500"
                    />
                    {option.label}
                  </label>
                ))}
              </div>
              {errors.duration && (
                <p className="text-sm text-[#B42318]">{errors.duration}</p>
              )}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label htmlFor={`${formId}-message`} className={labelClass}>
            Message <span className="text-[#B42318]">*</span>
          </label>
          <textarea
            id={`${formId}-message`}
            name="message"
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? `${formId}-message-error` : undefined}
            className={`${inputClass} ${fieldErrorClass(Boolean(errors.message))}`}
          />
          {errors.message && (
            <p id={`${formId}-message-error`} className="text-sm text-[#B42318]">
              {errors.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            disabled={sending}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-steel-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-500 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {sending ? "Sending…" : "Request a consultation"}
          </button>

          <div aria-live="polite">
            {status === "success" && (
              <p className="text-sm font-medium text-[#027A48]">{statusMessage}</p>
            )}
            {status === "error" && (
              <p className="text-sm font-medium text-[#B42318]">{statusMessage}</p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
