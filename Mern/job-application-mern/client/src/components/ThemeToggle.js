import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Button } from 'react-bootstrap';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggle = ({ size = 'sm' }) => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <Button
            variant={theme === 'dark' ? 'outline-light' : 'outline-dark'}
            size={size}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            className="d-flex align-items-center"
        >
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
        </Button>
    );
};

export default ThemeToggle;
