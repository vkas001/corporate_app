import { useMemo, useState } from "react";
import { HistoryItem, HistoryType, UserRole } from "@/types/history";

const MOCK_DATA: HistoryItem[] = [
    {
        id: "1",
        type: "production",
        title: "Morning Collection",
        value: 120,
        unit: "eggs",
        date: "2026-01-01",
        time: "08:30",
    },
    {
        id: "2",
        type: "payment",
        title: "Payment Received",
        value: 300,
        amount: 4500,
        date: "2026-01-01",
        time: "14:10",
    },
    {
        id: "3",
        type: "sale",
        title: "Market Sale",
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

        if (role === "seller") {
            data = data.filter(
                (i) => i.type !== "feed" && i.type !== "mortality"
            );
        }

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
