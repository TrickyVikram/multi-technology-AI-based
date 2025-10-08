import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext({
    theme: 'light',
    toggleTheme: () => { }
});

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    // Initialize theme from localStorage or system preference
    useEffect(() => {
        try {
            const stored = localStorage.getItem('theme');
            if (stored === 'light' || stored === 'dark') {
                setTheme(stored);
                document.documentElement.setAttribute('data-theme', stored);
            } else {
                // Fallback to prefers-color-scheme
                const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                const initial = prefersDark ? 'dark' : 'light';
                setTheme(initial);
                document.documentElement.setAttribute('data-theme', initial);
            }
        } catch (e) {
            console.error('Error reading theme from localStorage', e);
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }, []);

    const toggleTheme = () => {
        setTheme(prev => {
            const next = prev === 'light' ? 'dark' : 'light';
            try { localStorage.setItem('theme', next); } catch (e) { console.error(e); }
            document.documentElement.setAttribute('data-theme', next);
            return next;
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
