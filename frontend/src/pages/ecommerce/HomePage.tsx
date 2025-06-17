import React, { useState, useEffect } from 'react';
import AdSearchInput from '@/components/ecommerce/AdSearchInput';
import AdList from '@/components/ecommerce/AdList';

export default function HomePage() {
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchAds = async (phrase?: string) => {
        setLoading(true);
        try {
            const url = phrase
                ? `http://localhost:80/api/ads/search?phrase=${encodeURIComponent(phrase)}`
                : `http://localhost:80/api/ads`;
            const response = await fetch(url);
            const results = await response.json();
            setAds(results);
        } catch (error) {
            console.error('Erreur lors de la recherche :', error);
            setAds([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAds();
    }, []);

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <AdSearchInput onSearch={fetchAds} />

            {loading ? (
                <div className="flex flex-col items-center justify-center py-10 gap-4 text-gray-500">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    <div className="text-lg">je vais trouver ça...</div>
                </div>
            ) : (
                <AdList ads={ads} />
            )}

        </div>
    );
}
