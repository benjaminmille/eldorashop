import React, { useEffect, useState } from 'react';
import {
    Box, Typography, Paper, Chip, Stack, Divider,
    Grid, Card, CardMedia, CircularProgress, Alert
} from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';

type Ad = {
    id: number;
    title: string;
    description: string;
    price: number;
    location: string;
    isAvailable: boolean;
    latitude?: number;
    longitude?: number;
    category?: { name: string };
    owner?: { username: string };
    images?: string[];
    createdAt: string;
};

type Props = {
    adId: string;
};

export default function AdDetail({ adId }: Props) {
    const [ad, setAd] = useState<Ad | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(`http://localhost:80/api/ads/${adId}`)
            .then(res => {
                if (!res.ok) throw new Error('Erreur HTTP ' + res.status);
                return res.json();
            })
            .then(setAd)
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [adId]);

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
        <Paper elevation={4} sx={{ padding: 4, borderRadius: 3, maxWidth: 1000, margin: 'auto', mt: 4 }}>
            <Typography variant="h4" fontWeight={700} gutterBottom>
                {ad.title}
            </Typography>

            <Typography variant="subtitle1" gutterBottom color="text.secondary">
                Annonce #{ad.id} • {new Date(ad.createdAt).toLocaleString()}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                <Chip
                    icon={ad.isAvailable ? <CheckCircle /> : <Cancel />}
                    label={ad.isAvailable ? 'Disponible' : 'Indisponible'}
                    color={ad.isAvailable ? 'success' : 'default'}
                />
                <Chip label={ad.category?.name || 'Sans catégorie'} variant="outlined" />
                <Chip label={`Publié par ${ad.owner?.username ?? '---'}`} variant="outlined" />
            </Stack>

            <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', mb: 2 }}>
                {ad.description}
            </Typography>

            <Grid container spacing={3} mb={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" fontWeight={600}>Prix :</Typography>
                    <Typography variant="body1">{ad.price.toFixed(2)} €</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" fontWeight={600}>Lieu :</Typography>
                    <Typography variant="body1">{ad.location}</Typography>
                </Grid>
                {ad.latitude && ad.longitude && (
                    <Grid item xs={12}>
                        <Typography variant="subtitle2" fontWeight={600}>Coordonnées GPS :</Typography>
                        <Typography variant="body2">
                            {ad.latitude.toFixed(4)} / {ad.longitude.toFixed(4)}
                        </Typography>
                    </Grid>
                )}
            </Grid>

            {ad.images && ad.images.length > 0 && (
                <>
                    <Divider sx={{ my: 3 }} />
                    <Typography variant="h6" gutterBottom>Images :</Typography>
                    <Grid container spacing={2}>
                        {ad.images.map((url, idx) => (
                            <Grid item xs={12} sm={6} md={4} key={idx}>
                                <Card>
                                    <CardMedia
                                        component="img"
                                        height="180"
                                        image={url}
                                        alt={`image-${idx}`}
                                        sx={{ objectFit: 'cover' }}
                                    />
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}
        </Paper>
    );
}
