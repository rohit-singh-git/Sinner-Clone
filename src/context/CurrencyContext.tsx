"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CurrencyContext = createContext<any>(null);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
    const [currency, setCurrency] = useState("INR");
    const [rates, setRates] = useState<any>({ INR: 1 });

    useEffect(() => {
        fetch("/api/exchange-rate")
            .then((r) => r.json())
            .then(setRates);
    }, []);

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency, rates }}>
            {children}
        </CurrencyContext.Provider>
    );
}

export const useCurrency = () => useContext(CurrencyContext);
