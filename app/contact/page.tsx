"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;

    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement)?.value || "",
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    setLoading(false);

    const json = await res.json();

    if (!res.ok) {
      setError(json.error || "Something went wrong");
      return;
    }

    setSent(true);
    form.reset();
  }

  return (
    <Container>
      <Section title="Contact">
        <form onSubmit={handleSubmit} className="max-w-lg space-y-4">

          {/* Honeypot field (hidden from humans) */}
          <input
            type="text"
            name="company"
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          <Input name="name" placeholder="Your name" required />
          <Input name="email" placeholder="Your email" required />
          <Textarea name="message" placeholder="Your message" rows={4} required />

          <Button disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </Button>

          {sent && (
            <p className="text-green-600 text-sm">
              Message sent successfully ✔
            </p>
          )}

          {error && (
            <p className="text-red-600 text-sm">
              {error}
            </p>
          )}
        </form>
      </Section>
    </Container>
  );
}
