export default function FormField({ 
    label, 
    children 
}: { 
    label: string; 
    children: React.ReactNode 
}) {
    return (
        <div className="flex flex-col gap-1.5 md:gap-2">
            <label className="text-[12px] font-normal text-[#B5B5B5] ml-1">
                {label}
            </label>
            {children}
        </div>
    );
}
