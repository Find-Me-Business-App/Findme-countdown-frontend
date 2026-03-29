import Image from "next/image";
import { THEME } from "@/config/theme";

interface ContactRowProps {
    label: string;
    sublabel: string;
    linkHref: string;
    linkText: string;
    iconSrc: string;
    iconAlt: string;
    linkClassName?: string;
}

export default function ContactRow({ 
    label, 
    sublabel, 
    linkHref, 
    linkText, 
    iconSrc, 
    iconAlt, 
    linkClassName = "" 
}: ContactRowProps) {
    return (
        <div className="flex items-center justify-between group">
            <div className="flex flex-col gap-1">
                <span 
                    className="font-bold text-base md:text-lg"
                    style={{ color: THEME.colors.text.primary }}
                >
                    {label}
                </span>
                <p 
                    className="text-[11px] md:text-[13px] leading-tight"
                    style={{ color: THEME.colors.text.muted }}
                >
                    {sublabel}
                </p>
                <a 
                    href={linkHref} 
                    className={`text-xs md:text-sm font-medium hover:underline transition-colors ${linkClassName}`}
                    style={{ color: THEME.colors.text.accent }}
                >
                    {linkText}
                </a>
            </div>
            <div className="flex-shrink-0">
                <Image src={iconSrc} alt={iconAlt} width={24} height={24} className="w-6 h-6" />
            </div>
        </div>
    );
}
