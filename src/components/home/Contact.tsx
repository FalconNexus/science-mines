"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";
import { generateWhatsAppContactUrl } from "@/lib/whatsapp";

export function Contact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const interest = formData.get("interest") as string;
    const message = formData.get("message") as string;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          phone: formData.get("phone"),
          email: formData.get("email"),
          message: interest
            ? `[Interest: ${interest}]\n\n${message}`
            : message,
        }),
      });

      if (!res.ok) throw new Error("Failed to send message");
      setSuccess(true);
      e.currentTarget.reset();
    } catch {
      setError(
        "Something went wrong. Please try again or contact us on WhatsApp."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="section-padding bg-black">
      <div className="container-wide px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 max-w-2xl mx-auto"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Let&apos;s build something.
          </h2>
          <p className="text-muted text-lg">
            Workshops, school partnerships, 3D printing or just a lab tour —
            we&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden border border-border aspect-square lg:aspect-auto lg:min-h-[480px]"
          >
            <iframe
              src={SITE.mapsEmbed}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "480px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="ScienceMines Location"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {success ? (
              <div className="p-8 rounded-2xl border border-primary/30 bg-primary/5 text-center h-full flex flex-col justify-center">
                <p className="text-lg font-semibold mb-2">Message Sent!</p>
                <p className="text-muted mb-6">
                  We&apos;ll get back to you shortly.
                </p>
                <Button variant="outline" onClick={() => setSuccess(false)}>
                  Send Another
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  name="name"
                  label="Full Name"
                  required
                  placeholder="Your name"
                />
                <Input
                  name="email"
                  label="Email"
                  type="email"
                  required
                  placeholder="you@email.com"
                />
                <Input
                  name="phone"
                  label="Phone"
                  required
                  placeholder="+91 XXXXX XXXXX"
                />
                <Input
                  name="interest"
                  label="Interest"
                  required
                  placeholder="Workshop / 3D Print / School…"
                />
                <Textarea
                  name="message"
                  label="Message"
                  required
                  placeholder="Tell us what you'd like to build..."
                />
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button type="submit" disabled={loading} className="flex-1">
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                  <a
                    href={generateWhatsAppContactUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/10 transition-colors text-sm font-semibold"
                  >
                    <MessageCircle size={18} />
                    WhatsApp
                  </a>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
