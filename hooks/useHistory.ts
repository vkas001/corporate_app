import { HISTORY_SEED_DATA } from "@/data/historyData";
import { HistoryItem, HistoryType, UserRole } from "@/types/history";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useMemo, useState } from "react";

const STORAGE_PREFIX = "egg_corporate:history:";

function formatTimeHHMM(d: Date) {
    return d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

export function useHistory(role: UserRole) {
    const [activeTypes, setActiveTypes] = useState<HistoryType[]>([]);
    const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
    const storageKey = `${STORAGE_PREFIX}${role}`;

    useEffect(() => {
        let isCancelled = false;

        (async () => {
            try {
                const raw = await AsyncStorage.getItem(storageKey);
                const stored = raw ? (JSON.parse(raw) as HistoryItem[]) : [];

                const next = stored.length > 0 ? stored : HISTORY_SEED_DATA;
                if (!isCancelled) setHistoryItems(next);
            } catch {
                if (!isCancelled) setHistoryItems(HISTORY_SEED_DATA);
            }
        })();

        return () => {
            isCancelled = true;
        };
    }, [storageKey]);

    const addHistoryItem = useCallback(
        (item: Omit<HistoryItem, "id" | "time"> & { id?: string; time?: string }) => {
            const now = new Date();
            const fullItem: HistoryItem = {
                id: item.id ?? `${now.getTime()}_${Math.random().toString(16).slice(2)}`,
                time: item.time ?? formatTimeHHMM(now),
                ...item,
            };

            setHistoryItems((prev) => {
                const next = [fullItem, ...prev];
                AsyncStorage.setItem(storageKey, JSON.stringify(next)).catch(() => {});
                return next;
            });
        },
        [storageKey]
    );

    const filteredData = useMemo(() => {
        let data = historyItems;

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
    }, [role, activeTypes, historyItems]);

    return {
        history: filteredData,
        activeTypes,
        setActiveTypes,
        addHistoryItem,
    };
}