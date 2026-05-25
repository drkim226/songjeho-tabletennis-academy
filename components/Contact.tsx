"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Contact() {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [sending, setSending] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    const { error } = await supabase.from("contact_messages").insert({
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      status: "new",
    });

    setSending(false);

    if (error) {
      alert("Message failed: " + error.message);
      return;
    }

    alert("Your message has been sent.");
    setShowEmailModal(false);
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <section id="contact" className="bg-gradient-to-br from-sky-50 to-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
            Contact Us
          </p>

          <h2 className="text-5xl font-extrabold text-slate-900">
            Visit Song Jeho Table Tennis Club
          </h2>
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          <div className="rounded-3xl bg-white p-10 shadow-xl">
            <h3 className="mb-8 text-3xl font-bold text-slate-900">
              Club Information
            </h3>

            <div className="space-y-8 text-lg text-slate-700">
              <div>
                <p className="mb-2 text-sm font-bold uppercase tracking-widest text-sky-600">
                  Address
                </p>
                <p>1049 S Grand View St, Los Angeles, CA 90006</p>
              </div>

              <div>
                <p className="mb-2 text-sm font-bold uppercase tracking-widest text-sky-600">
                  Phone
                </p>
                <a
                  href="tel:2133830096"
                  className="text-2xl font-bold text-sky-700 hover:text-orange-500"
                >
                  (213) 383-0096
                </a>
              </div>

              <div>
                <p className="mb-2 text-sm font-bold uppercase tracking-widest text-sky-600">
                  Email
                </p>
                <button
                  type="button"
                  onClick={() => setShowEmailModal(true)}
                  className="text-left text-sky-700 hover:text-orange-500 hover:underline"
                >
                  songjehotta@gmail.com
                </button>
              </div>

              <div>
                <p className="mb-4 text-sm font-bold uppercase tracking-widest text-sky-600">
                  Business Hours
                </p>

                <div className="space-y-2 leading-8">
                  <p>
                    <span className="font-semibold">Saturday:</span> 8:00 AM – 6:00 PM
                  </p>
                  <p>
                    <span className="font-semibold">Sunday:</span> Closed
                  </p>
                  <p>
                    <span className="font-semibold">Monday-Friday:</span> 8:00 AM – 8:00 PM
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-6">
                <p className="mb-3 text-sm font-bold uppercase tracking-widest text-orange-500">
                  Holiday Closures
                </p>

                <div className="flex flex-wrap gap-x-3 gap-y-2 text-sm leading-relaxed text-slate-500">
                  <span>New Year's Day</span>
                  <span>•</span>
                  <span>Memorial Day</span>
                  <span>•</span>
                  <span>Independence Day</span>
                  <span>•</span>
                  <span>Labor Day</span>
                  <span>•</span>
                  <span>Thanksgiving Day</span>
                  <span>•</span>
                  <span>Christmas Day</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-2xl">
            <h3 className="mb-6 text-3xl font-bold text-slate-900">
              Location Map
            </h3>

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
              <svg
                viewBox="0 0 700 520"
                className="h-[500px] w-full"
                role="img"
                aria-label="Map to Song Jeho Table Tennis Club"
              >
                <rect width="700" height="520" fill="#f8fafc" />

                <line x1="80" y1="120" x2="620" y2="120" stroke="#cbd5e1" strokeWidth="34" strokeLinecap="round" />
                <line x1="110" y1="320" x2="640" y2="250" stroke="#cbd5e1" strokeWidth="34" strokeLinecap="round" />
                <line x1="210" y1="60" x2="210" y2="455" stroke="#cbd5e1" strokeWidth="30" strokeLinecap="round" />
                <line x1="430" y1="80" x2="430" y2="455" stroke="#cbd5e1" strokeWidth="30" strokeLinecap="round" />

                <line x1="90" y1="220" x2="610" y2="220" stroke="#e2e8f0" strokeWidth="22" strokeLinecap="round" />
                <line x1="120" y1="410" x2="560" y2="360" stroke="#e2e8f0" strokeWidth="22" strokeLinecap="round" />
                <line x1="320" y1="70" x2="320" y2="440" stroke="#e2e8f0" strokeWidth="22" strokeLinecap="round" />
                <line x1="540" y1="100" x2="540" y2="420" stroke="#e2e8f0" strokeWidth="22" strokeLinecap="round" />

                <text x="95" y="105" fill="#475569" fontSize="20" fontWeight="700">
                  Olympic Blvd
                </text>
                <text x="100" y="305" fill="#475569" fontSize="20" fontWeight="700">
                  11th St
                </text>
                <text x="225" y="70" fill="#475569" fontSize="18" fontWeight="700">
                  Grand View St
                </text>
                <text x="445" y="75" fill="#475569" fontSize="18" fontWeight="700">
                  Vermont Ave
                </text>

                <text x="95" y="255" fill="#64748b" fontSize="16">
                  Koreatown Area
                </text>
                <text x="460" y="185" fill="#64748b" fontSize="16">
                  Local Shops
                </text>
                <text x="450" y="395" fill="#64748b" fontSize="16">
                  Parking Nearby
                </text>

                <circle cx="210" cy="220" r="22" fill="#f97316" />
                <circle cx="210" cy="220" r="38" fill="#f97316" opacity="0.18" />
                <text x="245" y="213" fill="#0f172a" fontSize="22" fontWeight="800">
                  Song Jeho
                </text>
                <text x="245" y="240" fill="#0f172a" fontSize="18" fontWeight="700">
                  Table Tennis Club
                </text>

                <rect x="80" y="440" width="540" height="56" rx="18" fill="#ffffff" stroke="#cbd5e1" />
                <text x="105" y="475" fill="#0f172a" fontSize="20" fontWeight="700">
                  1049 S Grand View St, Los Angeles, CA 90006
                </text>
              </svg>
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=1049+S+Grand+View+St+Los+Angeles+CA+90006"
              target="_blank"
              className="mt-6 inline-block rounded-full bg-sky-600 px-8 py-4 font-bold text-white hover:bg-sky-700"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>

      {showEmailModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-6">
          <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-2xl font-extrabold text-slate-900">
                Send Message
              </h3>

              <button
                onClick={() => setShowEmailModal(false)}
                className="rounded-full bg-slate-900 px-4 py-2 font-bold text-white hover:bg-orange-500"
              >
                X
              </button>
            </div>

            <form onSubmit={sendMessage} className="space-y-4">
              <input
                required
                placeholder="Your name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full rounded-2xl border border-slate-200 px-5 py-4"
              />

              <input
                required
                type="email"
                placeholder="Your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full rounded-2xl border border-slate-200 px-5 py-4"
              />

              <input
                placeholder="Subject"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                className="w-full rounded-2xl border border-slate-200 px-5 py-4"
              />

              <textarea
                required
                rows={5}
                placeholder="Message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full rounded-2xl border border-slate-200 px-5 py-4"
              />

              <button
                disabled={sending}
                className="w-full rounded-2xl bg-sky-600 py-4 font-bold text-white hover:bg-sky-700 disabled:bg-slate-400"
              >
                {sending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}