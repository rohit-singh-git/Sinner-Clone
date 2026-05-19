export default function CollectionLoading() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-12 mt-25">
            <div className="h-4 w-32 bg-gray-200 animate-pulse mb-8 rounded" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array(8)
                    .fill(0)
                    .map((_, i) => (
                        <div key={i}>
                            <div className="aspect-square bg-gray-700 animate-pulse rounded" />
                            <div className="h-3 bg-gray-700 animate-pulse mt-3 rounded w-3/4" />
                            <div className="h-3 bg-gray-700 animate-pulse mt-2 rounded w-1/2" />
                        </div>
                    ))}
            </div>
        </div>
    );
}
