import { MousePointer2 } from "lucide-react";

interface WaitlistProps {
    variant?: "dark" | "light";
    onJoin?: () => void;
}

export default function Waitlist({ variant = "dark", onJoin }: WaitlistProps) {
    const isLight = variant === "light";

    return (
        <div
            onClick={onJoin}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 cursor-pointer group"
        >
            <div className="relative w-32 h-32 flex items-center justify-center">
                {/* Circular text SVG placeholder */}
                <svg viewBox="0 0 100 100" className="absolute w-full h-full animate-spin-slow">
                    <path
                        id="circlePath"
                        d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                        fill="none"
                    />
                    <text className={`text-[8px] uppercase font-bold tracking-[0.2em] ${isLight ? "fill-black" : "fill-white/60"}`}>
                        <textPath xlinkHref="#circlePath">
                            Join Our Waitlist • Join Our Waitlist •
                        </textPath>
                    </text>
                </svg>

                {/* Centered Icon */}
                <div className={`w-10 h-16 border-2 ${isLight ? "border-black" : "border-white/40"} rounded-full flex items-start justify-center pt-2`}>
                    <div className={`w-1 h-3 ${isLight ? "bg-black" : "bg-white/60"} rounded-full animate-bounce`} />
                </div>
            </div>
        </div>
    );
}
