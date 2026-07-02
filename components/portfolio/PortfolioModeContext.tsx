"use client";

import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
    useSyncExternalStore,
    type ReactNode,
} from "react";

export type PortfolioMode = "technical" | "speaker";

const STORAGE_KEY = "rhandie-portfolio-mode";
const CHANGE_EVENT = "rhandie-portfolio-mode-change";

function subscribe(callback: () => void) {
    window.addEventListener("storage", callback);
    window.addEventListener(CHANGE_EVENT, callback);
    return () => {
        window.removeEventListener("storage", callback);
        window.removeEventListener(CHANGE_EVENT, callback);
    };
}

function getSnapshot(): PortfolioMode | null {
    try {
        const value = window.localStorage.getItem(STORAGE_KEY);
        return value === "technical" || value === "speaker" ? value : null;
    } catch {
        return null;
    }
}

const getServerSnapshot = () => null;
const getHydratedSnapshot = () => true;
const getServerHydratedSnapshot = () => false;

type PortfolioModeContextValue = {
    /** null = not yet chosen (first visit) or not yet hydrated */
    mode: PortfolioMode | null;
    /** true once the client has hydrated */
    hydrated: boolean;
    chooserOpen: boolean;
    chooseMode: (mode: PortfolioMode) => void;
    openChooser: () => void;
    closeChooser: () => void;
};

const PortfolioModeContext = createContext<PortfolioModeContextValue | null>(null);

export function PortfolioModeProvider({ children }: { children: ReactNode }) {
    // localStorage is the source of truth — no effects, no cascading renders.
    const mode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    const hydrated = useSyncExternalStore(subscribe, getHydratedSnapshot, getServerHydratedSnapshot);
    const [manualOpen, setManualOpen] = useState(false);

    // First visit (no stored mode) forces the chooser open.
    const chooserOpen = manualOpen || (hydrated && mode === null);

    const chooseMode = useCallback((next: PortfolioMode) => {
        try {
            window.localStorage.setItem(STORAGE_KEY, next);
        } catch {
            // non-fatal — choice just won't persist
        }
        window.dispatchEvent(new Event(CHANGE_EVENT));
        setManualOpen(false);
    }, []);

    const openChooser = useCallback(() => setManualOpen(true), []);

    const closeChooser = useCallback(() => {
        // Only dismissible once a mode exists (first visit forces a choice)
        if (getSnapshot() !== null) setManualOpen(false);
    }, []);

    const value = useMemo(
        () => ({ mode, hydrated, chooserOpen, chooseMode, openChooser, closeChooser }),
        [mode, hydrated, chooserOpen, chooseMode, openChooser, closeChooser]
    );

    return (
        <PortfolioModeContext.Provider value={value}>
            {children}
        </PortfolioModeContext.Provider>
    );
}

export function usePortfolioMode() {
    const ctx = useContext(PortfolioModeContext);
    if (!ctx) throw new Error("usePortfolioMode must be used within PortfolioModeProvider");
    return ctx;
}
