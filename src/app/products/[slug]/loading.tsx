export default function ProductLoading() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-12 mt-25">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="aspect-square bg-gray-700 animate-pulse rounded" />
                <div className="flex flex-col gap-4">
                    <div className="h-4 bg-gray-700 animate-pulse rounded w-2/3" />
                    <div className="h-4 bg-gray-700 animate-pulse rounded w-1/3" />
                    <div className="h-20 bg-gray-700 animate-pulse rounded mt-4" />
                    <div className="flex gap-2 mt-4">
                        {Array(5)
                            .fill(0)
                            .map((_, i) => (
                                <div
                                    key={i}
                                    className="h-10 w-14 bg-gray-700 animate-pulse rounded"
                                />
                            ))}
                    </div>
                    <div className="h-12 bg-gray-700 animate-pulse rounded mt-4" />
                </div>
            </div>
        </div>
    );
}
