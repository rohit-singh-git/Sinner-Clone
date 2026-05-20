import { NextResponse } from "next/server";

export async function GET() {
    const res = await fetch(
        `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest/INR`,
        { next: { revalidate: 86400 } }, // cache 24 hrs
    );

    const data = await res.json();

    return NextResponse.json(data.conversion_rates);
}
