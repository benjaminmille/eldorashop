import React from 'react';

export function Button({ children, onClick, className = '' }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            onClick={onClick}
            className={`bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition ${className}`}
        >
            {children}
        </button>
    );
}