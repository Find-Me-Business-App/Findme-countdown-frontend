export default function Countdown() {
    return (
        <div className="mt-12 text-center z-10">
            <p className="text-white/40 uppercase tracking-[0.4em] text-[10px] font-bold mb-6">
                Launching
            </p>
            <div className="flex gap-4 justify-center">
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className="w-20 h-20 md:w-24 md:h-24 border border-white/20 rounded-2xl flex items-center justify-center bg-black/10 backdrop-blur-sm"
                    >
                        <span className="text-white text-2xl font-bold">--</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
