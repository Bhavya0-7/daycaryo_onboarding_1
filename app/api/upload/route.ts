import { NextResponse } from "next/server";
import { getAdminClient } from "../../../lib/supabase";

async function ensureBucket(supabase: ReturnType<typeof getAdminClient>, bucket: string) {
  const { data: buckets } = await supabase.storage.listBuckets();
  const existing = (buckets || []).find((b) => b.name === bucket);
  if (!existing) {
    await supabase.storage.createBucket(bucket, {
      public: true,
      allowedMimeTypes: ["image/*"],
      fileSizeLimit: "5MB",
    });
  } else if (!existing.public) {
    await supabase.storage.updateBucket(bucket, { public: true });
  }
}

export async function POST(req: Request) {
  try {
    const supabase = getAdminClient();
    const fd = await req.formData();
    const bucket = String(fd.get("bucket") || "daycare");
    const prefix = String(fd.get("prefix") || "uploads");
    const files = fd.getAll("files");

    await ensureBucket(supabase, bucket);

    const urls: string[] = [];
    for (const f of files) {
      if (!(f instanceof File)) continue;
      const ext = f.name.split(".").pop() || "bin";
      const name = `${prefix}/${crypto.randomUUID()}.${ext}`;
      const ab = await f.arrayBuffer();
      const { error } = await supabase.storage.from(bucket).upload(name, ab, { contentType: f.type });
      if (error) return NextResponse.json({ error: error.message }, { status: 400 });
      const { data } = supabase.storage.from(bucket).getPublicUrl(name);
      urls.push(data.publicUrl);
    }

    return NextResponse.json({ urls }, { status: 200 });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Upload failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}