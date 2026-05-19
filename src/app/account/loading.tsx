export default function AccountLoading() {
    return (
        <div className="max-w-2xl mx-auto px-4 py-16 mt-25">
            <div className="h-4 w-32 bg-gray-700 animate-pulse rounded mb-8" />
            <div className="border border-gray-700 p-6 mb-6">
                <div className="h-3 w-24 bg-gray-700 animate-pulse rounded mb-4" />
                <div className="h-4 w-40 bg-gray-700 animate-pulse rounded mb-2" />
                <div className="h-3 w-48 bg-gray-700 animate-pulse rounded" />
            </div>
            <div className="border border-gray-700 p-6">
                <div className="h-3 w-28 bg-gray-700 animate-pulse rounded mb-4" />
                <div className="h-16 bg-gray-700 animate-pulse rounded" />
            </div>
        </div>
    );
}
