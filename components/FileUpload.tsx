"use client";
import { useRef, useState } from "react";

type Props = {
  label: string;
  multiple?: boolean;
  required?: boolean;
  bucket?: string;
  prefix?: string;
  onFiles: (urls: string[]) => void;
};

export default function FileUpload({ label, multiple, required, bucket = "daycare", prefix = "uploads", onFiles }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [names, setNames] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openPicker = () => inputRef.current?.click();
  const handleChange = async () => {
    const files = Array.from(inputRef.current?.files || []);
    if (!files.length) return;
    setNames(files.map((f) => f.name));
    setUploading(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append('bucket', bucket);
      fd.append('prefix', prefix);
      files.forEach((f) => fd.append('files', f));
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Upload failed');
      onFiles(json.urls || []);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Upload failed';
      setError(msg);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <span className="text-sm text-gray-600">{label}{required ? " *" : ""}</span>
      <div
        className="glass p-4 rounded-xl border border-primary/30 hover:border-primary transition cursor-pointer"
        onClick={openPicker}
        role="button"
        aria-label={label}
      >
        <div className="flex items-center justify-between">
          <div className="text-gray-500">
            {names.length ? (
              <ul className="list-disc ml-4 text-sm text-gray-700">
                {names.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            ) : (
              <span>{uploading ? "Uploading…" : "Click to choose files"}</span>
            )}
          </div>
          <button className="btn-secondary">Browse</button>
        </div>
        <input
          ref={inputRef}
          type="file"
          multiple={multiple}
          required={required}
          className="hidden"
          onChange={handleChange}
        />
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </div>
    </div>
  );
}