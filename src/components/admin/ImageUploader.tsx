"use client";
import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface Props {
    images: string[];
    onChange: (images: string[]) => void;
}

export default function ImageUploader({ images, onChange }: Props) {
    const [uploading, setUploading] = useState(false);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []);
        if (!files.length) return;

        setUploading(true);
        const uploaded: string[] = [];

        for (const file of files) {
            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (data.url) uploaded.push(data.url);
        }

        onChange([...images, ...uploaded]);
        setUploading(false);
    };

    const remove = (url: string) => onChange(images.filter((i) => i !== url));

    return (
        <div>
            {/* Preview */}
            {images.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                    {images.map((url) => (
                        <div key={url} className="relative w-20 h-20">
                            <Image
                                src={url}
                                alt=""
                                fill
                                className="object-cover"
                                sizes="80px"
                            />
                            <button
                                onClick={() => remove(url)}
                                className="absolute -top-1 -right-1 bg-black text-white rounded-full w-4 h-4 flex items-center justify-center"
                            >
                                <X size={10} />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Upload button */}
            <label
                className={`block border border-dashed p-6 text-center text-sm tracking-widest uppercase cursor-pointer hover:bg-gray-500 border-white hover:text-black font-semibold transition-colors ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
                {uploading ? "Uploading..." : "Click to Upload Images"}
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    disabled={uploading}
                    onChange={handleUpload}
                />
            </label>
        </div>
    );
}
