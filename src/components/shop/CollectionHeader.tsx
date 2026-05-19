interface Props {
    title: string;
    count: number;
}

export default function CollectionHeader({ title, count }: Props) {
    return (
        <div className="py-6 px-4 mx-7 flex items-center justify-between mt-25">
            <h1 className="text-5xl tracking-widest uppercase font-bold mt-6">
                {title}
            </h1>
            <span className="text-sm text-gray-400">{count} products</span>
        </div>
    );
}
