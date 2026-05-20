export function formatPrice(priceInINR: number, currency: string, rates: any) {
    const converted = priceInINR * rates[currency];

    return new Intl.NumberFormat("en", {
        style: "currency",
        currency,
    }).format(converted);
}
