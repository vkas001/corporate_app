import { HistoryItem, HistoryType, UserRole } from "@/types/history";
import { useMemo, useState } from "react";

const MOCK_DATA: HistoryItem[] = [
    {
        id: "1",
        type: "production",
        title: "Morning Collection",
        description: "Daily egg collection from coop A",
        value: 120,
        unit: "eggs",
        date: "2026-01-01",
        time: "08:30",
    },
    {
        id: "2",
        type: "payment",
        title: "Payment Received",
        description: "Settlement received via bank transfer",
        value: 300,
        amount: 4500,
        date: "2026-01-01",
        time: "14:10",
    },
    {
        id: "3",
        type: "sale",
        title: "Market Sale",
        description: "Sold at local market stall #12",
        value: 200,
        unit: "eggs",
        amount: 3200,
        date: "2025-12-31",
        time: "17:00",
    },
];

export function useHistory(role: UserRole) {
    const [activeTypes, setActiveTypes] = useState<HistoryType[]>([]);

    const filteredData = useMemo(() => {
        let data = MOCK_DATA;

        // Apply role-based filtering first
        if (role === "seller") {
            data = data.filter(
                (i) => i.type !== "feed" && i.type !== "mortality"
            );
        }

        // Apply type-based filtering (on top of role filter)
        if (activeTypes.length > 0) {
            data = data.filter((i) => activeTypes.includes(i.type));
        }

        return data;
    }, [role, activeTypes]);

    return {
        history: filteredData,
        activeTypes,
        setActiveTypes,
    };
}