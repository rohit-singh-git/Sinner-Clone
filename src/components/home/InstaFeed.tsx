import React from "react";
import Image from "next/image";
import { FaInstagram } from "react-icons/fa";

function InstaFeed() {
    const posts = [
        "/insta/file1.jpg",
        "/insta/file2.jpg",
        "/insta/file3.jpg",
        "/insta/file4.jpg",
        "/insta/file5.jpg",
        "/insta/file6.jpg",
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-3 p-2 bg-gray-900/20">
            {posts.map((img, i) => (
                <a
                    key={i}
                    href="https://instagram.com/hardystunts"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden my-5"
                >
                    <Image
                        src={img}
                        alt="Instagram post"
                        width={500}
                        height={500}
                        className="aspect-square bg-gray-800/60 object-contain duration-300 hover:opacity-80 group-hover:blur-sm transition-all group-hover:scale-105"
                    />

                    {/* dark overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 transition duration-300 group-hover:opacity-100" />

                    {/* instagram icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100">
                        <FaInstagram size={45} />
                    </div>
                </a>
            ))}
        </div>
    );
}

export default InstaFeed;
