"use client";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Stepper from "../../components/Stepper";
import CheckboxPill from "../../components/CheckboxPill";
import FileUpload from "../../components/FileUpload";

type FormData = Record<string, any>;

const stepLabels = [
  "Owner Info",
  "Daycare Basics",
  "Address",
  "Contact",
  "Operating",
  "Pricing",
  "Food",
  "Amenities",
  "Photos",
  "Review",
];

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const canGoNext = useMemo(() => validateStep(step, form), [step, form]);

  const next = () => setStep((s) => Math.min(10, s + 1));
  const prev = () => setStep((s) => Math.max(1, s - 1));
  const update = (k: string, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  const header = (
    <header className="text-center mt-6">
      <div className="inline-flex items-center gap-3">
        <img src="/logo.svg" alt="Daycaryo" className="w-10 h-10" />
        <span className="brand text-4xl tracking-wide">Daycaryo</span>
      </div>
      <p className="text-gray-600 mt-1">Finding you a home away from home</p>
    </header>
  );

  return (
    <main className="w-full flex flex-col items-center">
      {header}
      <div className="w-full mt-4 flex flex-col items-center">
        <Stepper current={step} total={10} labels={stepLabels} onJump={(s) => setStep(s)} />

        <section className="glass w-full max-w-4xl mt-4 p-6">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                <h2 className="section-title">Owner Information</h2>
                <p className="section-subtitle">Let’s start with your personal details</p>
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <span className="text-sm text-gray-600">Full Name *</span>
                    <input className="input" required placeholder="Enter your full name" value={form.owner_full_name || ""} onChange={(e) => update("owner_full_name", e.target.value)} />
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Date of Birth *</span>
                    <input className="input" required type="date" value={form.owner_dob || ""} onChange={(e) => update("owner_dob", e.target.value)} />
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Phone Number *</span>
                    <div className="flex items-center gap-2">
                      <div className="px-4 py-3 rounded-xl bg-white border border-primary/25">+91</div>
                      <input
                        className="input"
                        required
                        placeholder="XXXXXXXXXX"
                        value={form.owner_phone || ""}
                        onChange={(e) => update("owner_phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                      />
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Email Address *</span>
                    <input className="input" required type="email" placeholder="your.email@example.com" value={form.owner_email || ""} onChange={(e) => update("owner_email", e.target.value)} />
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Gender *</span>
                    <select className="input" value={form.owner_gender || ""} onChange={(e) => update("owner_gender", e.target.value)}>
                      <option value="">Select gender</option>
                      <option>Female</option>
                      <option>Male</option>
                      <option>Non-binary</option>
                      <option>Prefer not to say</option>
                    </select>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Graduation University</span>
                    <input className="input" placeholder="e.g., University of Delhi" value={form.owner_education || ""} onChange={(e) => update("owner_education", e.target.value)} />
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Experience (years)</span>
                    <input className="input" type="number" min={0} max={60} placeholder="Enter number of years" value={form.owner_experience_years || ""} onChange={(e) => update("owner_experience_years", e.target.value)} />
                  </div>
                  <div>
                    <FileUpload label="Profile Photo" bucket="daycare" prefix="owner_profile" onFiles={(urls) => update("owner_photo", urls)} />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                <h2 className="section-title">Daycare Basics</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <span className="text-sm text-gray-600">Daycare Name *</span>
                    <input className="input" required value={form.daycare_name || ""} onChange={(e) => update("daycare_name", e.target.value)} />
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Year Established *</span>
                    <input className="input" type="number" min={1900} max={2100} required value={form.daycare_year || ""} onChange={(e) => update("daycare_year", e.target.value)} />
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-sm text-gray-600">Short Description *</span>
                    <textarea className="input" rows={3} required value={form.daycare_desc || ""} onChange={(e) => update("daycare_desc", e.target.value)} />
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-sm text-gray-600">Daycare Type *</span>
                    <div className="flex gap-2 mt-2">
                      {["Home-based","Center-based"].map((opt) => (
                        <CheckboxPill
                          key={opt}
                          label={opt}
                          checked={form.daycare_type === opt}
                          onChange={(next) => update("daycare_type", next ? opt : "")}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="s3" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                <h2 className="section-title">Address Information</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <span className="text-sm text-gray-600">Block/Street *</span>
                    <input className="input" required value={form.addr_street || ""} onChange={(e) => update("addr_street", e.target.value)} />
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Area/Locality *</span>
                    <input className="input" required value={form.addr_area || ""} onChange={(e) => update("addr_area", e.target.value)} />
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-sm text-gray-600">Address Line 3</span>
                    <input className="input" value={form.addr_line3 || ""} onChange={(e) => update("addr_line3", e.target.value)} />
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">City *</span>
                    <input className="input" required value={form.addr_city || ""} onChange={(e) => update("addr_city", e.target.value)} />
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">State *</span>
                    <input className="input" required value={form.addr_state || ""} onChange={(e) => update("addr_state", e.target.value)} />
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Pin Code *</span>
                    <input className="input" required pattern="\d{6}" value={form.addr_pincode || ""} onChange={(e) => update("addr_pincode", e.target.value.replace(/\D/g, "").slice(0, 6))} />
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-sm text-gray-600">Distance & Landmark</span>
                    <div className="grid grid-cols-[1fr_auto_2fr] gap-2">
                      <input className="input" type="number" min={0} placeholder="Distance" value={form.addr_distance || ""} onChange={(e) => update("addr_distance", e.target.value)} />
                      <div className="self-center text-gray-600">km</div>
                      <input className="input" placeholder="Landmark (e.g., 5 km from Statue Circle)" value={form.addr_landmark || ""} onChange={(e) => update("addr_landmark", e.target.value)} />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-sm text-gray-600">Google Maps Link *</span>
                    <input className="input" type="url" required placeholder="https://maps.google.com/..." value={form.addr_gmap || ""} onChange={(e) => update("addr_gmap", e.target.value)} />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="s4" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                <h2 className="section-title">Contact Information</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <span className="text-sm text-gray-600">Daycare Phone Number *</span>
                    <input className="input" required value={form.contact_phone || ""} onChange={(e) => update("contact_phone", e.target.value)} />
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Alternate Number</span>
                    <input className="input" value={form.contact_alt || ""} onChange={(e) => update("contact_alt", e.target.value)} />
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Daycare Email *</span>
                    <input className="input" type="email" required value={form.contact_email || ""} onChange={(e) => update("contact_email", e.target.value)} />
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">WhatsApp Number</span>
                    <input className="input" value={form.contact_whatsapp || ""} onChange={(e) => update("contact_whatsapp", e.target.value)} />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div key="s5" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                <h2 className="section-title">Operating Days & Timings</h2>
                <p className="section-subtitle">When is your daycare open?</p>
                <div className="space-y-4">
                  <div className="glass p-4">
                    <span className="text-sm text-gray-600">Operating Days *</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map((d) => (
                        <CheckboxPill
                          key={d}
                          label={d}
                          checked={(form.op_days || []).includes(d)}
                          onChange={(next) => {
                            const list = new Set(form.op_days || []);
                            if (next) list.add(d); else list.delete(d);
                            update("op_days", Array.from(list));
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="glass p-4 grid md:grid-cols-2 gap-3">
                    <div>
                      <span className="text-sm text-gray-600">Opening Time *</span>
                      <input className="input" type="time" required value={form.op_open || ""} onChange={(e) => update("op_open", e.target.value)} />
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Closing Time *</span>
                      <input className="input" type="time" required value={form.op_close || ""} onChange={(e) => update("op_close", e.target.value)} />
                    </div>
                    <div className="md:col-span-2">
                      <span className="text-sm text-gray-600">Age Range</span>
                      <div className="grid grid-cols-[1fr_1fr_auto_1fr_1fr] gap-2 mt-2">
                        <input className="input" type="number" min={0} max={15} placeholder="Years (0–15)" value={form.op_age_y_from || ""} onChange={(e) => update("op_age_y_from", e.target.value)} />
                        <input className="input" type="number" min={0} max={11} placeholder="Months (0–11)" value={form.op_age_m_from || ""} onChange={(e) => update("op_age_m_from", e.target.value)} />
                        <div className="self-center text-gray-500">—</div>
                        <input className="input" type="number" min={0} max={15} placeholder="Years (0–15)" value={form.op_age_y_to || ""} onChange={(e) => update("op_age_y_to", e.target.value)} />
                        <input className="input" type="number" min={0} max={11} placeholder="Months (0–11)" value={form.op_age_m_to || ""} onChange={(e) => update("op_age_m_to", e.target.value)} />
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Maximum Child Capacity</span>
                      <input className="input" type="number" min={1} value={form.op_capacity || ""} onChange={(e) => update("op_capacity", e.target.value)} />
                    </div>
                    <div className="md:col-span-2">
                      <span className="text-sm text-gray-600">Staff-to-Child Ratio</span>
                      <input className="input" placeholder="e.g., if 10 children and 2 staff, ratio is 1:5" value={form.op_ratio || ""} onChange={(e) => update("op_ratio", e.target.value)} />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 6 && (
              <motion.div key="s6" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                <h2 className="section-title">Pricing</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="md:col-span-2">
                    <span className="text-sm text-gray-600">Hourly Rate *</span>
                    <input className="input" type="number" min={0} step={0.01} required placeholder="What will be cost per hour daycare? e.g., 50" value={form.price_hourly || ""} onChange={(e) => update("price_hourly", e.target.value)} />
                    <p className="text-sm text-gray-500 mt-1">Example: monthly fees for 4 hours/day × 30 days = {Number(form.price_hourly || 0) ? `${form.price_hourly} × 4 × 30 = ${Number(form.price_hourly) * 4 * 30}` : "rate × 4 × 30"}</p>
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-sm text-gray-600">Minimum Charge</span>
                    <input className="input" type="number" min={0} step={0.01} placeholder="Enter minimum charge" value={form.min_charge || ""} onChange={(e) => update("min_charge", e.target.value)} />
                    <p className="text-sm text-gray-500 mt-1">Example: If your hourly price is ₹100 but your minimum charge is ₹300, a 2‑hour stay would still cost ₹300.</p>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 7 && (
              <motion.div key="s7" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                <h2 className="section-title">Food Facility</h2>
                <div>
                  <span className="text-sm text-gray-600">Food Facility Available</span>
                  <div className="flex gap-2 mt-2">
                    {[{label:"Yes",value:true},{label:"No",value:false}].map((opt)=> (
                      <CheckboxPill key={String(opt.value)} label={opt.label} checked={Boolean(form.food_available)===opt.value} onChange={()=>update("food_available", opt.value)} />
                    ))}
                  </div>
                </div>
                {form.food_available && (
                  <div className="grid md:grid-cols-2 gap-3 mt-3">
                    <div>
                      <span className="text-sm text-gray-600">Breakfast Price</span>
                      <input className="input" type="number" min={0} step={0.01} placeholder="₹" value={form.food_breakfast || ""} onChange={(e) => update("food_breakfast", e.target.value)} />
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Lunch Price</span>
                      <input className="input" type="number" min={0} step={0.01} placeholder="₹" value={form.food_lunch || ""} onChange={(e) => update("food_lunch", e.target.value)} />
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Dinner Price</span>
                      <input className="input" type="number" min={0} step={0.01} placeholder="₹" value={form.food_dinner || ""} onChange={(e) => update("food_dinner", e.target.value)} />
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Snacks Price</span>
                      <input className="input" type="number" min={0} step={0.01} placeholder="₹" value={form.food_snacks || ""} onChange={(e) => update("food_snacks", e.target.value)} />
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {step === 8 && (
              <motion.div key="s8" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                <h2 className="section-title">Amenities & Facilities</h2>
                <div className="grid md:grid-cols-3 gap-2 mt-2">
                  {[
                    "CCTV Surveillance",
                    "Live Camera Feed",
                    "Daily Photos",
                    "Toys & Books",
                    "Nap Room",
                    "Outdoor Play Area",
                    "Indoor Play Area",
                    "Air Conditioning",
                    "Pickup/Drop Service",
                    "Activity Room",
                    "Visitor Log",
                    "First Aid Kit",
                    "Safety Checklist",
                    "Homework Support",
                    "Air Purifier",
                    "Daily Reports",
                  ].map((a) => (
                    <CheckboxPill
                      key={a}
                      label={a}
                      checked={(form.amenities || []).includes(a)}
                      onChange={(next) => {
                        const set = new Set(form.amenities || []);
                        if (next) set.add(a); else set.delete(a);
                        update("amenities", Array.from(set));
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {step === 9 && (
              <motion.div key="s9" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                <h2 className="section-title">Photos & Documents</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  <FileUpload label="Indoor Photos" multiple bucket="daycare" prefix="indoor" onFiles={(urls) => update("photo_indoor", urls)} />
                  <FileUpload label="Outdoor Photos" multiple bucket="daycare" prefix="outdoor" onFiles={(urls) => update("photo_outdoor", urls)} />
                  <FileUpload label="Activity Photos" multiple bucket="daycare" prefix="activity" onFiles={(urls) => update("photo_activity", urls)} />
                  <FileUpload label="Daycare License (Optional)" bucket="daycare" prefix="documents" onFiles={(urls) => update("doc_license", urls)} />
                </div>
              </motion.div>
            )}

            {step === 10 && (
              <motion.div key="s10" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                <h2 className="section-title">Review & Submit</h2>
                <p className="section-subtitle">Please verify the details below</p>
                <div className="grid gap-4">
                  {Object.entries(groupBySection(form)).map(([title, entries]) => (
                    <div key={title} className="glass p-4">
                      <h3 className="font-semibold mb-2 text-gray-700">{title}</h3>
                      <div className="grid md:grid-cols-2 gap-2">
                        {entries.map(([k, v]) => (
                          <div key={k} className="flex justify-between gap-4">
                            <span className="text-gray-500 text-sm">{labelize(k)}</span>
                            <span className="text-gray-800 font-medium text-sm break-words">{formatValue(v)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-4 grid grid-cols-[auto_1fr_auto] items-center gap-3">
            <button className="btn-secondary" disabled={step === 1 || submitting} onClick={prev}>Previous</button>
            <span className="text-center text-gray-500">Step {step} of 10</span>
            <button
              className="btn-primary"
              disabled={!canGoNext || submitting}
              onClick={async () => {
                if (step < 10) return next();
                setSubmitting(true);
                setSubmitError(null);
                try {
                  const res = await fetch('/api/submit', {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(form)
                  });
                  const json = await res.json();
                  if (!res.ok) throw new Error(json.error || 'Failed to submit');
                  router.push('/success');
                } catch (e: unknown) {
                  const msg = e instanceof Error ? e.message : 'Submission failed';
                  setSubmitError(msg);
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {submitting ? 'Submitting…' : step === 10 ? 'Submit' : 'Next'}
            </button>
          </div>
          {submitError && <p className="text-red-600 mt-2">{submitError}</p>}
        </section>
      </div>
    </main>
  );
}

function labelize(key: string) {
  return key
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatValue(v: unknown) {
  if (Array.isArray(v)) return v.join(", ");
  if (v === undefined || v === null || v === "") return "—";
  return String(v);
}

function groupBySection(data: FormData) {
  const byStep: Record<string, string[]> = {
    "Owner Info": [
      "owner_full_name","owner_dob","owner_phone","owner_email","owner_gender","owner_education","owner_experience_years","owner_photo"
    ],
    "Daycare Basics": ["daycare_name","daycare_year","daycare_desc","daycare_type"],
    "Address": ["addr_street","addr_area","addr_line3","addr_city","addr_state","addr_pincode","addr_distance","addr_landmark","addr_gmap"],
    "Contact": ["contact_phone","contact_alt","contact_email","contact_whatsapp"],
    "Operating": ["op_days","op_open","op_close","op_age_y_from","op_age_m_from","op_age_y_to","op_age_m_to","op_capacity","op_ratio"],
    "Pricing": ["price_hourly","min_charge"],
    "Food": ["food_available","food_breakfast","food_lunch","food_dinner","food_snacks"],
    "Amenities": ["amenities"],
    "Photos & Documents": ["photo_indoor","photo_outdoor","photo_activity","doc_license"],
  };

  const result: Record<string, Array<[string, unknown]>> = {};
  const record = data as Record<string, unknown>;
  Object.entries(byStep).forEach(([section, keys]) => {
    result[section] = keys
      .map((k) => [k, record[k]] as [string, unknown])
      .filter(([, v]) => v !== undefined);
  });
  return result;
}

function validateStep(step: number, form: FormData) {
  switch (step) {
    case 1:
      return Boolean(
        form.owner_full_name &&
        form.owner_dob &&
        (form.owner_phone || "").length === 10 &&
        form.owner_email
      );
    case 2:
      return Boolean(form.daycare_name && form.daycare_year && form.daycare_desc && form.daycare_type);
    case 3:
      return Boolean(
        form.addr_street &&
        form.addr_area &&
        form.addr_city &&
        form.addr_state &&
        /\d{6}/.test((form.addr_pincode || "") as string) &&
        form.addr_gmap
      );
    case 4:
      return Boolean(form.contact_phone && form.contact_email);
    case 5:
      return Boolean((form.op_days || []).length > 0 && form.op_open && form.op_close);
    case 6:
      return Boolean(form.price_hourly);
    default:
      return true;
  }
}