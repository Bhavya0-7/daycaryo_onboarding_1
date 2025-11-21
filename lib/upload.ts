import { getAdminClient } from "./supabase";

export async function uploadFile(bucket: string, file: File, prefix: string) {
  const supabase = getAdminClient();
  const ext = file.name.split(".").pop() || "bin";
  const name = `${prefix}/${crypto.randomUUID()}.${ext}`;
  const arrayBuffer = await file.arrayBuffer();
  const { error } = await supabase.storage.from(bucket).upload(name, arrayBuffer, { contentType: file.type });
  if (error) return { error };
  const { data } = supabase.storage.from(bucket).getPublicUrl(name);
  return { url: data.publicUrl };
}