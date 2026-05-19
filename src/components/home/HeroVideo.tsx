export default function HeroVideo() {
    return (
        <section className="relative w-full h-screen overflow-hidden">
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                // Replace with your actual video URL
                src="https://www.officialsinner.com/cdn/shop/videos/c/vp/d3d5163181e84677874798464b09d47a/d3d5163181e84677874798464b09d47a.HD-1080p-7.2Mbps-81227215.mp4?v=0"
                poster="https://www.officialsinner.com/cdn/shop/files/SAR03333_dad548eb-c287-48cd-86ba-0d9087461263.jpg"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/20" />
        </section>
    );
}
