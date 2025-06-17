import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdForm from '../../components/admin/AdminAdForm';
import { CircularProgress, Box, Alert } from '@mui/material';

type Ad = {
    id: number;
    title: string;
    description: string;
    price: number;
    location: string;
    category?: { id: string };
};

export default function AdEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [ad, setAd] = useState<Ad | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(`http://localhost:80/api/ads/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error('Erreur HTTP ' + res.status);
                return res.json();
            })
            .then(setAd)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={6}>
                <CircularProgress />
            </Box>
        );
    }

    if (error || !ad) {
        return (
            <Box mt={4}>
                <Alert severity="error">{error || 'Annonce introuvable'}</Alert>
            </Box>
        );
    }

    return (
        <AdForm
            mode="edit"
            initialValues={{
                id: ad.id,
                title: ad.title,
                description: ad.description,
                price: ad.price,
                location: ad.location,
                categoryId: ad.category?.id ?? '',
            }}
            onSuccess={() => navigate('/admin/ads')}
        />
    );
}
