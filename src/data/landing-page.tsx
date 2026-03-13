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
        description: "Create, manage and automate all aspects of your business operations seamlessly with limitless integrations from Sales, inventory, payroll, portfolio, logistics and tracking."
    },
    {
        title: "Reduce Business Cost by 90%",
        titleStyled: (
            <>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#ec4899]">Reduce Business Cost by </span>
                <span className="text-[#22c55e]">90%</span>
            </>
        ),
        description: "Create, manage and automate all aspects of your business operations seamlessly with limitless integrations from Sales, inventory, payroll, portfolio, logistics and tracking."
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
