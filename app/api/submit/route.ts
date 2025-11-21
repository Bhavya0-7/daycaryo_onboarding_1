import { NextResponse } from "next/server";
import { getAdminClient } from "../../../lib/supabase";

function mapToInsert(body: Record<string, unknown>) {
  const g = (k: string) => body[k];
  const toEnum = (v: unknown, map: Record<string, string>) => (typeof v === "string" ? (map[v] || v) : v);

  const daycare_type = toEnum(g("daycare_type"), { "Home-based": "home_based", "Center-based": "center_based" });
  const gender = toEnum(g("owner_gender"), { Female: "female", Male: "male", "Non-binary": "other", "Prefer not to say": "other" });

  return {
    full_name: g("owner_full_name"),
    date_of_birth: g("owner_dob"),
    phone_number: g("owner_phone"),
    email: g("owner_email"),
    gender,
    graduation_university: g("owner_education") || null,
    experience_years: g("owner_experience_years") ? Number(g("owner_experience_years")) : null,
    profile_photo_url: Array.isArray(g("owner_photo")) ? ((g("owner_photo") as string[])[0] || null) : null,

    daycare_name: g("daycare_name"),
    year_established: Number(g("daycare_year")),
    short_description: g("daycare_desc"),
    daycare_type,

    street: g("addr_street"),
    locality: g("addr_area"),
    address_line3: g("addr_line3") || null,
    city: g("addr_city"),
    state: g("addr_state"),
    pin_code: g("addr_pincode"),
    distance_km: g("addr_distance") ? Number(g("addr_distance")) : null,
    landmark: g("addr_landmark") || null,
    google_maps_link: g("addr_gmap"),

    daycare_phone_number: g("contact_phone"),
    alternate_number: g("contact_alt") || null,
    daycare_email: g("contact_email"),
    whatsapp_number: g("contact_whatsapp") || null,

    operating_days: Array.isArray(g("op_days")) ? (g("op_days") as string[]) : [],
    opening_time: g("op_open"),
    closing_time: g("op_close"),
    age_min_years: g("op_age_y_from") ? Number(g("op_age_y_from")) : 0,
    age_min_months: g("op_age_m_from") ? Number(g("op_age_m_from")) : 0,
    age_max_years: g("op_age_y_to") ? Number(g("op_age_y_to")) : 0,
    age_max_months: g("op_age_m_to") ? Number(g("op_age_m_to")) : 0,
    max_child_capacity: g("op_capacity") ? Number(g("op_capacity")) : 0,
    staff_to_child_ratio: g("op_ratio") || "",

    hourly_rate: Number(g("price_hourly")),
    minimum_charge: g("min_charge") ? Number(g("min_charge")) : null,

    food_available: Boolean(g("food_available")),
    breakfast_price: g("food_breakfast") ? Number(g("food_breakfast")) : null,
    lunch_price: g("food_lunch") ? Number(g("food_lunch")) : null,
    dinner_price: g("food_dinner") ? Number(g("food_dinner")) : null,
    snacks_price: g("food_snacks") ? Number(g("food_snacks")) : null,

    amenities: Array.isArray(g("amenities")) ? (g("amenities") as string[]) : [],
  };
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const supabase = getAdminClient();
    const insert = mapToInsert(body);

    const { data, error } = await supabase
      .from("daycares")
      .insert(insert)
      .select("id")
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    const id = data?.id as string;

    const photoOps: Promise<void>[] = [];
    const arr = (k: string) => (Array.isArray(body[k]) ? (body[k] as string[]) : []);
    arr("photo_indoor").forEach((url) => {
      photoOps.push((async () => {
        const { error } = await supabase.from("daycare_photos_indoor").insert({ daycare_id: id, url });
        if (error) throw new Error(error.message);
      })());
    });
    arr("photo_outdoor").forEach((url) => {
      photoOps.push((async () => {
        const { error } = await supabase.from("daycare_photos_outdoor").insert({ daycare_id: id, url });
        if (error) throw new Error(error.message);
      })());
    });
    arr("photo_activity").forEach((url) => {
      photoOps.push((async () => {
        const { error } = await supabase.from("daycare_photos_activity").insert({ daycare_id: id, url });
        if (error) throw new Error(error.message);
      })());
    });
    const docs = arr("doc_license");
    if (docs.length) {
      docs.forEach((url) => {
        photoOps.push((async () => {
          const { error } = await supabase
            .from("daycare_documents")
            .insert({ daycare_id: id, url, doc_type: "license" });
          if (error) throw new Error(error.message);
        })());
      });
    }
    if (photoOps.length) await Promise.all(photoOps);

    return NextResponse.json({ id }, { status: 200 });
  } catch (err: unknown) {
    const msg = (err instanceof Error) ? err.message : "Server error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}