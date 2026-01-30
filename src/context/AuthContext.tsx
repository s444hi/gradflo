"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";

interface User {
    name: string;
    email: string;
    major: string;
    year: string;
    password?: string; // Storing password for local-first simulation
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string, name: string, major: string, year: string) => Promise<void>;
    updateUser: (updates: Partial<User>) => void;
    logout: () => void;
    isLoading: boolean;
    error: string | null;
    clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    // Session Timeout Logic (5 minutes = 300,000 ms)
    const INACTIVITY_LIMIT = 5 * 60 * 1000;

    // Using Ref to track timer ID to avoid dependency cycle issues
    const timerRef = React.useRef<NodeJS.Timeout | null>(null);

    const clearError = () => setError(null);

    const logout = useCallback(() => {
        setUser(null);
        sessionStorage.removeItem("gradflo_user");

        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        router.push("/login");
    }, [router]);

    const resetTimer = useCallback(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        if (user) {
            timerRef.current = setTimeout(() => {
                console.log("User inactive for 5 minutes, logging out.");
                logout();
            }, INACTIVITY_LIMIT);
        }
    }, [user, logout, INACTIVITY_LIMIT]);

    useEffect(() => {
        // Load user from session storage on mount
        const storedUser = sessionStorage.getItem("gradflo_user");
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse user session", e);
                sessionStorage.removeItem("gradflo_user");
            }
        }
        setIsLoading(false);
    }, []);

    // Setup event listeners for activity tracking
    useEffect(() => {
        if (!user) return;

        const events = ["mousemove", "mousedown", "keypress", "scroll", "touchstart"];

        const handleActivity = () => {
            resetTimer();
        };

        events.forEach(event => window.addEventListener(event, handleActivity));

        // Initial timer start
        resetTimer();

        return () => {
            events.forEach(event => window.removeEventListener(event, handleActivity));
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [user, resetTimer]);

    // Helper to get user DB
    const getUserDB = (): Record<string, User> => {
        const db = localStorage.getItem("gradflo_users_db");
        return db ? JSON.parse(db) : {};
    };

    const login = async (email: string, password: string) => {
        setError(null);
        // Simulate async delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const db = getUserDB();
        const existingUser = db[email];

        if (!existingUser) {
            setError("Account not found. Please sign up.");
            return;
        }

        if (existingUser.password !== password) {
            setError("Incorrect password.");
            return;
        }

        // Login success
        const activeUser = { ...existingUser };
        setUser(activeUser);
        sessionStorage.setItem("gradflo_user", JSON.stringify(activeUser));
        router.push("/dashboard");
    };

    const signup = async (email: string, password: string, name: string, major: string, year: string) => {
        setError(null);
        await new Promise(resolve => setTimeout(resolve, 500));

        const db = getUserDB();

        if (db[email]) {
            setError("Account already exists. Please log in.");
            return;
        }

        const newUser: User = { email, password, name, major, year };

        // Save to DB
        db[email] = newUser;
        localStorage.setItem("gradflo_users_db", JSON.stringify(db));

        // Auto login
        setUser(newUser);
        sessionStorage.setItem("gradflo_user", JSON.stringify(newUser));
        router.push("/dashboard");
    };

    const updateUser = (updates: Partial<User>) => {
        if (!user) return;
        const updatedUser = { ...user, ...updates };

        // Update Session
        setUser(updatedUser);
        sessionStorage.setItem("gradflo_user", JSON.stringify(updatedUser));

        // Update DB
        const db = getUserDB();
        if (db[user.email]) {
            db[user.email] = { ...db[user.email], ...updates };
            localStorage.setItem("gradflo_users_db", JSON.stringify(db));
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, updateUser, logout, isLoading, error, clearError }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
