import Image from "next/image";
import { THEME } from "@/config/theme";
import { MODAL_CONFIGS } from "@/config/modal-configs";
import ContactRow from "./ContactRow";

interface ContactInfoCardProps {
    config: typeof MODAL_CONFIGS[keyof typeof MODAL_CONFIGS];
    section: string;
}

export default function ContactInfoCard({ config, section }: ContactInfoCardProps) {
    return (
        <div 
            className={`w-[309px] md:w-[300px] h-[402px] md:h-full flex-shrink-0 p-5 md:p-7 rounded-[32px] md:rounded-[36px] border border-white/10 relative overflow-hidden shadow-xl flex flex-col bg-center bg-no-repeat md:bg-[length:115%_115%] ${
                section === "home" 
                    ? "bg-[linear-gradient(135deg,#1f2a44_0%,#121417_50%,#000000_100%)] md:bg-[url('/icons/hero-info.svg')]"
                    : section === "business"
                    ? "bg-[linear-gradient(45deg,rgba(0,0,0,0.81)_0%,#2B365A_49%,#EB00D3_100%)] md:bg-[url('/icons/bussines-info.svg')]"
                    : "bg-[linear-gradient(135deg,rgba(0,0,0,0.78)_0%,#2B365A_31%,#FF3D00_100%)] md:bg-[url('/icons/festival-info.svg')]"
            }`}
        >
            {/* Inner Glow */}
            <div className="absolute inset-0 bg-black/40 pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full">
                <h2 
                    className="text-xl md:text-2xl font-bold mb-1 md:mb-2 w-fit"
                    style={{ color: THEME.colors.text.primary }}
                >
                    {config.title}
                </h2>
                <p 
                    className="text-xs md:text-sm mb-4 md:mb-5 leading-relaxed max-w-[240px]"
                    style={{ color: THEME.colors.text.secondary }}
                >
                    {config.description}
                </p>

                {/* Subtle Separator Line matching the UI mockup */}
                <hr className="w-[85%] border-t border-white/10 mb-4 md:mb-6" />

                <div className="space-y-4 md:space-y-3 flex-1 flex flex-col justify-center mb-1 pb-2">
                    {/* Call */}
                    <ContactRow
                        label="Call"
                        sublabel="Click on the call icon or copy"
                        linkHref={`tel:${config.callNumber}`}
                        linkText={config.callNumber}
                        iconSrc={THEME.assets.icons.contact.phone}
                        iconAlt="Phone"
                    />

                    {/* WhatsApp */}
                    <a
                        href={`https://wa.me/${config.whatsappNumber.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between group/wa"
                    >
                        <div className="flex flex-col gap-1">
                            <span 
                                className="font-bold text-base md:text-lg transition-colors group-hover:text-green-400"
                                style={{ color: THEME.colors.text.primary }}
                            >
                                WhatsApp
                            </span>
                            <p 
                                className="text-[11px] md:text-[13px] leading-tight max-w-[190px]"
                                style={{ color: THEME.colors.text.muted }}
                            >
                                Clicking on the WhatsApp icon leads you to chat.
                            </p>
                        </div>
                        <div className="flex-shrink-0">
                            <div className="group-hover/wa:scale-110 transition-transform flex items-center justify-center">
                                <Image 
                                    src={THEME.assets.icons.contact.whatsapp} 
                                    alt="WhatsApp" 
                                    width={24} 
                                    height={24} 
                                    className="w-6 h-6" 
                                />
                            </div>
                        </div>
                    </a>

                    {/* Mail */}
                    <ContactRow
                        label="Mail"
                        sublabel="Reach us through mail"
                        linkHref={`mailto:${config.email}`}
                        linkText={config.email}
                        iconSrc={THEME.assets.icons.contact.gmail}
                        iconAlt="Mail"
                        linkClassName="break-all"
                    />
                </div>
            </div>
        </div>
    );
}
