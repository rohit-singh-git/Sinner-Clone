export default function CheckoutLoading() {
    return (
        <div className="max-w-6xl mx-auto px-4 py-12 mt-25">
            <div className="h-4 w-24 bg-gray-700 animate-pulse rounded mb-10" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="flex flex-col gap-4">
                    {Array(5)
                        .fill(0)
                        .map((_, i) => (
                            <div
                                key={i}
                                className="h-12 bg-gray-700 animate-pulse rounded"
                            />
                        ))}
                </div>
                <div className="h-80 bg-gray-700 animate-pulse rounded" />
            </div>
        </div>
    );
}
