import React from "react";
import Link from "next/link";

function NotFound() {
    return (
        <div className="flex flex-col w-full h-screen justify-center items-center">
            <div className="m-4 text-2xl">The section you are trying to reach may not exist.</div>
            <Link href={"/"} className="bg-white uppercase text-black p-3 rounded-xs hover:bg-red-800 border-2 transition-colors ease-in-out duration-700 hover:border-white hover:text-white">
                Back to Home
            </Link>
        </div>
    );
}

export default NotFound;
