import React from 'react';
import { Card } from '@/components/ui/card';

export default function AdList({ ads }: { ads: any[] }) {
    return (
        <div className="grid gap-4">
            {ads.map((ad) => (
                <Card key={ad.id} className="flex gap-4 p-4 rounded-xl shadow-md hover:shadow-lg transition-all">
                    <img
                        src={ad.images?.[0] || 'https://via.placeholder.com/100'}
                        alt={ad.title}
                        className="w-32 h-32 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                        <h3 className="text-xl font-semibold">{ad.title}</h3>
                        <p className="text-gray-600 mt-1">{ad.description}</p>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                        <div className="text-2xl font-bold text-green-600">{ad.price} €</div>
                        <div className="text-sm text-gray-500">
                            {ad.location}<br />
                            {new Date(ad.createdAt).toLocaleDateString('fr-FR')}
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
}
