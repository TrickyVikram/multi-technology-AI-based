import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';

// Set initial theme synchronously to avoid FOUC
try {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') {
        document.documentElement.setAttribute('data-theme', stored);
    } else {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    }
} catch (e) {
    document.documentElement.setAttribute('data-theme', 'light');
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ThemeProvider>
            <BrowserRouter>
                <App />
                <Toaster
                    position="top-right"
                    toastOptions={{
                        duration: 4000,
                        style: {
                            background: '#363636',
                            color: '#fff',
                        },
                        success: {
                            duration: 3000,
                            theme: {
                                primary: 'green',
                                secondary: 'black',
                            },
                        },
                    }}
                />
            </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>
);