interface Props {
    label: string;
    value: string | number;
    sub?: string;
}

export default function AdminStatsCard({ label, value, sub }: Props) {
    return (
        <div className="border border-gray-200 p-6">
            <p className="text-xs tracking-widest uppercase text-gray-400 mb-2">
                {label}
            </p>
            <p className="text-2xl font-semibold">{value}</p>
            {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
        </div>
    );
}
