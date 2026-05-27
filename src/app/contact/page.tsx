export default function ContactPage() {
    return (
        <main className="min-h-scree bg-gray-400/10">
            {/* Hero */}
            <section className="bg-black text-white px-6 text-center mt-20 py-10">
                <h1 className="text-2xl md:text-4xl font-bold tracking-wider">
                    Contact Us
                </h1>
                <p className="mt-4 text-gray-300 max-w-xl mx-auto text-lg">
                    We'd love to hear from you. Questions, collaborations, or
                    support — reach out anytime.
                </p>
            </section>

            {/* Main */}
            <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16">
                {/* Form */}
                <div>
                    <h2 className="text-3xl font-semibold mb-8">
                        Send a Message
                    </h2>

                    <form className="space-y-6">
                        <div>
                            <label className="block text-sm mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                placeholder="Your name"
                                className="w-full border border-gray-300 px-4 py-4 rounded-none focus:outline-none focus:border-gray-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm mb-2">Email</label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                className="w-full border border-gray-300 px-4 py-4 rounded-none focus:outline-none focus:border-gray-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm mb-2">
                                Message
                            </label>
                            <textarea
                                rows={6}
                                placeholder="Your message..."
                                className="w-full border border-gray-300 px-4 py-4 rounded-none focus:outline-none focus:border-gray-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn-press border bg-gray-800 text-white px-10 py-4 hover:bg-gray-600 transition"
                        >
                            Send Message
                        </button>
                    </form>
                </div>

                {/* Info */}
                <div className="space-y-10">
                    <div>
                        <h2 className="text-3xl font-semibold mb-8">
                            Get in Touch
                        </h2>

                        <div className="space-y-6 text-lg">
                            <div>
                                <p className="text-gray-400">Email</p>
                                <p>support@officialsinner.com</p>
                            </div>

                            <div>
                                <p className="text-gray-400">Phone</p>
                                <p>+91 98765 43210</p>
                            </div>

                            <div>
                                <p className="text-gray-400">Address</p>
                                <p>New Delhi, India</p>
                            </div>
                        </div>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">
                            Follow Us
                        </h3>
                        <div className="flex gap-6 text-lg">
                            <a
                                href="https://instagram.com/hardystunts"
                                target="_blank"
                                className="hover:underline"
                            >
                                Instagram
                            </a>
                            <a
                                href="#"
                                target="_blank"
                                className="hover:underline"
                            >
                                Facebook
                            </a>
                            <a
                                href="#"
                                target="_blank"
                                className="hover:underline"
                            >
                                X
                            </a>
                        </div>
                    </div>

                    {/* Map */}
                    {/* <div>
                        <div className="h-80 bg-gray-200 flex items-center justify-center text-gray-500">
                            Google Map Here
                        </div>
                    </div> */}
                </div>
            </section>
        </main>
    );
}
