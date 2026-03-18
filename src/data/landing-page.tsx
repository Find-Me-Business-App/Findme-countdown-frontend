import { ReactNode } from "react";

export interface BusinessStep {
    title: string;
    titleStyled: ReactNode;
    description: string;
}

export const BUSINESS_STEPS: BusinessStep[] = [
    {
        title: "Give Your Business Publicity",
        titleStyled: (
            <>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#1d4ed8]">Give Your </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] via-[#ec4899] to-[#f43f5e]">Business Publicity</span>
            </>
        ),
        description: "Sell more with your sales as FindMe rewards your business by increased free promotion of your business, products and services to buying customers near you and expands your reach . When you keep record of your physical sales on FindMe it also increases your visibility for intermediate (multiverse) sales on a customer seeking something else."
    },
    {
        title: "Reduce Business Cost by 90%",
        titleStyled: (
            <>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#ec4899]">Reduce Business Cost by </span>
                <span className="text-[#22c55e]">90%</span>
            </>
        ),
        description: "Manage all your assets effectively from a central point and share information with your team in real time. Monitor your real estate property, delivery van, machinery etc and also remotely manage your assets activities operations and CCTV cameras."
    },
    {
        title: "Empower Your Business with Ai",
        titleStyled: (
            <>
                <span className="text-[#3b82f6]">Empower Your </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] via-[#ec4899] to-[#f43f5e]">Business </span>
                <span className="text-[#3b82f6]">with </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] via-[#ec4899] to-[#f43f5e]">Ai</span>
            </>
        ),
        description: "Create, manage and automate all aspects of your business operations seamlessly with limitless integrations from Sales, inventory, payroll, portfolio, logistics and tracking."
    }
];

export const SMOOTH_EASE = [0.22, 1, 0.36, 1] as const;
