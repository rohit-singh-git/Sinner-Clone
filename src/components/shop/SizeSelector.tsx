"use client";

interface Props {
    sizes: string[];
    soldOut: boolean;
    selected: string | null;
    onSelect: (size: string) => void;
}

export default function SizeSelector({
    sizes,
    soldOut,
    selected,
    onSelect,
}: Props) {
    return (
        <div>
            <p className="text-xs tracking-widest uppercase mb-3">
                Select Size
            </p>
            <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                    <button
                        key={size}
                        disabled={soldOut}
                        onClick={() => onSelect(size)}
                        className={`border px-4 py-2 text-xs tracking-widest uppercase transition-colors 
              ${soldOut ? "border-gray-200 text-gray-300 cursor-not-allowed" : ""}
              ${selected === size && !soldOut ? "border-red-800" : "border-white hover:border-gray-500 hover:text-gray-500"}
            `}
                    >
                        {size}
                    </button>
                ))}
            </div>
        </div>
    );
}
