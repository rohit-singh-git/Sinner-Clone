type Props = {
    title: string;
    children: React.ReactNode;
};

export default function PolicyLayout({ title, children }: Props) {
    return (
        <main className="min-h-screen bg-black text-white mt-10">
            <section className="bg-black text-white py-20 px-6 text-center">
                <h1 className="text-4xl md:text-6xl font-bold">{title}</h1>
            </section>

            <section className="max-w-4xl mx-auto px-6 py-8 prose prose-lg">
                {children}
            </section>
        </main>
    );
}
