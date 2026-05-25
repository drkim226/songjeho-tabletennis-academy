"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";


type Member = {
  id: number;
  full_name: string;
  email: string;
  phone: string;
};

const levels = ["S", "A", "B", "C", "D", "Beginner"];

const associations = [
  "LA KTTA",
  "Orange County KTTA",
  "New York KTTA",
  "New Jersey KTTA",
  "Dallas KTTA",
  "Boston KTTA",
  "Other",
];

export default function RatingPage() {
  const router = useRouter();

  const photoInputRef1 = useRef<HTMLInputElement | null>(null);
  const photoInputRef2 = useRef<HTMLInputElement | null>(null);
  const photoInputRef3 = useRef<HTMLInputElement | null>(null);

  const [loading, setLoading] = useState(true);
  const [member, setMember] = useState<Member | null>(null);

  const [playingName, setPlayingName] = useState("");
  const [association, setAssociation] = useState("");
  const [otherAssociation, setOtherAssociation] = useState("");
  const [requestedLevel, setRequestedLevel] = useState("");
  const [phone, setPhone] = useState("");
  const [playingExperience, setPlayingExperience] = useState("");
  const [tournamentExperience, setTournamentExperience] = useState("");
  const [message, setMessage] = useState("");
  const [photos, setPhotos] = useState<(File | null)[]>([null, null, null]);

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadMember();
  }, []);

  const loadMember = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/admin");
      return;
    }

    const { data, error } = await supabase
      .from("members")
      .select("id, full_name, email, phone")
      .eq("auth_user_id", user.id)
      .single();

    if (error) {
      alert("Could not load your member information.");
      setLoading(false);
      return;
    }

    setMember(data);
    setPlayingName(data.full_name || "");
    setPhone(data.phone || "");
    setRequestedLevel("");
    setLoading(false);
  };

  const handlePhotoChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0] || null;

    setPhotos((prev) => {
      const next = [...prev];
      next[index] = file;
      return next;
    });
  };

  const uploadPhotos = async () => {
    if (!member) return [];

    const uploadedUrls: string[] = [];
    const selectedPhotos = photos.filter((photo): photo is File => !!photo);

    for (const photo of selectedPhotos) {
      const fileExt = photo.name.split(".").pop();
      const fileName = `${member.id}-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2)}.${fileExt}`;

      const { error } = await supabase.storage
        .from("rating-photos")
        .upload(fileName, photo);

      if (error) {
        throw new Error(error.message);
      }

      const { data } = supabase.storage
        .from("rating-photos")
        .getPublicUrl(fileName);

      uploadedUrls.push(data.publicUrl);
    }

    return uploadedUrls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!member) return;

    if (!playingName.trim()) {
      alert("Please enter the name people know you by when you play table tennis.");
      return;
    }

    if (!requestedLevel) {
      alert("Please select your requested rating level.");
      return;
    }

    setSubmitting(true);

    try {
      const photoUrls = await uploadPhotos();

      const finalAssociation =
        association === "Other" ? otherAssociation.trim() : association;

      const { error } = await supabase.from("rating_applications").insert({
        member_id: member.id,
        full_name: playingName.trim(),
        email: member.email,
        association: finalAssociation,
        phone,
        requested_level: requestedLevel,
        playing_experience: playingExperience,
        tournament_experience: tournamentExperience,
        message,
        photo_urls: photoUrls,
        status: "pending",
      });

      if (error) {
        alert("Application failed: " + error.message);
        setSubmitting(false);
        return;
      }

      alert("Your rating application has been submitted.");
      router.push("/members/profile");
    } catch (err: any) {
      alert("Photo upload failed: " + err.message);
      setSubmitting(false);
    }
  };

  const photoRefs = [photoInputRef1, photoInputRef2, photoInputRef3];

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-24">
        <p>Loading...</p>
      </main>
    );
  }

  if (!member) return null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-orange-50 text-slate-800">


  <section className="px-6 py-24">
    <div className="mx-auto max-w-3xl">
      <div className="mb-10 text-center">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
          KTTAUSA Official Rating
        </p>

        <h1 className="text-5xl font-extrabold text-slate-900">
          Apply for Official Rating
        </h1>

        <p className="mt-4 text-slate-600">
          Required fields are playing name, email, and requested rating level.
          Everything else is optional.
        </p>
      </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-3xl bg-white p-8 shadow-2xl"
        >
          <Input
            label="Playing Name"
            value={playingName}
            onChange={setPlayingName}
            required
            helper="Please enter the name people know you by when you play table tennis."
          />

          <Input
            label="Email"
            value={member.email}
            disabled
            required
            helper="This email comes from your member account."
          />

          <div>
            <label className="mb-2 block font-bold text-slate-700">
              KTTA Affiliation
              <span className="ml-2 text-sm font-normal text-slate-400">
                Optional
              </span>
            </label>

            <p className="mb-3 text-sm text-slate-500">
              Select your affiliated KTTA association if applicable.
            </p>

            <select
              value={association}
              onChange={(e) => setAssociation(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 p-4"
            >
              <option value="">Select KTTA affiliation</option>
              {associations.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {association === "Other" && (
            <Input
              label="Other KTTA / Club Name"
              value={otherAssociation}
              onChange={setOtherAssociation}
              optional
              helper="Enter your association or club name."
            />
          )}

          <div>
            <label className="mb-2 block font-bold text-slate-700">
              Identification Photos
              <span className="ml-2 text-sm font-normal text-slate-400">
                Optional
              </span>
            </label>

            <p className="mb-4 text-sm leading-6 text-slate-500">
              Please upload photos that help KTTAUSA identify who you are.
              A table tennis playing photo or a clear face photo is helpful.
              You may upload up to 3 photos.
            </p>

            <div className="grid gap-3 md:grid-cols-3">
              {[0, 1, 2].map((index) => (
                <div key={index}>
                  <input
                    ref={photoRefs[index]}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handlePhotoChange(index, e)}
                  />

                  <button
                    type="button"
                    onClick={() => photoRefs[index].current?.click()}
                    className="w-full rounded-2xl border border-sky-200 bg-sky-50 px-4 py-6 font-bold text-sky-700 transition hover:-translate-y-1 hover:border-sky-400 hover:bg-sky-100 hover:shadow-lg"
                  >
                    Photo {index + 1}

                    <div className="mt-2 break-words text-xs font-normal text-slate-500">
                      {photos[index] ? photos[index]?.name : "Click to upload"}
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block font-bold text-slate-700">
              Requested Rating Level <span className="text-orange-500">*</span>
            </label>

            <select
              value={requestedLevel}
              onChange={(e) => setRequestedLevel(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-4"
              required
            >
              <option value="">Select level</option>
              {levels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          <Input label="Phone" value={phone} onChange={setPhone} optional />

          <Textarea
            label="Playing Experience"
            value={playingExperience}
            onChange={setPlayingExperience}
            placeholder="How long have you played table tennis?"
            optional
          />

          <Textarea
            label="Tournament Experience"
            value={tournamentExperience}
            onChange={setTournamentExperience}
            placeholder="Any tournament or league experience?"
            optional
          />

          <Textarea
            label="Message"
            value={message}
            onChange={setMessage}
            placeholder="Any information that may help determine your rating?"
            optional
          />

          <button
            disabled={submitting}
            className="w-full rounded-full bg-sky-600 px-8 py-4 font-bold text-white hover:bg-sky-700 disabled:bg-slate-400"
          >
            {submitting ? "Submitting..." : "Submit Rating Application"}
          </button>
        </form>
</div>

</section>


</main>
);
}

function Input({
  label,
  value,
  onChange,
  disabled,
  required,
  optional,
  helper,
}: {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  optional?: boolean;
  helper?: string;
}) {
  return (
    <div>
      <label className="mb-2 block font-bold text-slate-700">
        {label} {required && <span className="text-orange-500">*</span>}
        {optional && (
          <span className="ml-2 text-sm font-normal text-slate-400">
            Optional
          </span>
        )}
      </label>

      {helper && <p className="mb-2 text-sm text-slate-500">{helper}</p>}

      <input
        value={value}
        disabled={disabled}
        required={required}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full rounded-xl border border-slate-300 bg-slate-50 p-4"
      />
    </div>
  );
}

function Textarea({
  label,
  value,
  onChange,
  placeholder,
  optional,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  optional?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block font-bold text-slate-700">
        {label}
        {optional && (
          <span className="ml-2 text-sm font-normal text-slate-400">
            Optional
          </span>
        )}
      </label>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className="w-full rounded-xl border border-slate-300 p-4"
      />
    </div>
  );
}