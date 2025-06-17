import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function AdSearchInput({ onSearch }: { onSearch: (phrase: string) => void }) {
    const [query, setQuery] = useState('');
    const [animatedPlaceholder, setAnimatedPlaceholder] = useState('');

    const examples = [
        "Un vélo pour la montagne",
        "Un canapé d’angle à Paris",
        "Une Xbox pas chère",
    ];

    useEffect(() => {
        const example = examples[Math.floor(Math.random() * examples.length)];
        let i = 0;
        const interval = setInterval(() => {
            setAnimatedPlaceholder(example.slice(0, i));
            i++;
            if (i > example.length) clearInterval(interval);
        }, 60);
        return () => clearInterval(interval);
    }, []);

    const handleSearch = () => {
        onSearch(query);
    };

    return (
        <div className="flex flex-col items-center mb-10">
            <Input
                className="text-xl p-4 rounded-2xl w-full max-w-3xl shadow-xl"
                placeholder={animatedPlaceholder || "Décris ce que tu recherches..."}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button className="mt-4 px-6 py-3 text-lg rounded-xl" onClick={handleSearch}>
                Rechercher
            </Button>
        </div>
    );
}