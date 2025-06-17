import React, { useEffect, useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Typography,
    CircularProgress, Box, Alert, Chip, Button
} from '@mui/material';
import { CheckCircle, Cancel, Edit } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

type Ad = {
    id: number;
    title: string;
    price: number;
    isAvailable: boolean;
    category?: { name: string };
    owner?: { username: string };
};

export default function AdminAdList() {
    const [ads, setAds] = useState<Ad[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:80/api/ads')
            .then(res => {
                if (!res.ok) throw new Error('Erreur HTTP ' + res.status);
                return res.json();
            })
            .then(data => {
                setAds(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={6}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box mt={4}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    return (
        <>
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={2} mb={2}>
                <Typography variant="h4" fontWeight={600}>
                    🎛️ Gestion des annonces
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/admin/ads/create')}
                >
                    ➕ Nouvelle annonce
                </Button>
            </Box>

            <TableContainer component={Paper} elevation={4} sx={{ borderRadius: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableCell><strong>ID</strong></TableCell>
                            <TableCell><strong>Titre</strong></TableCell>
                            <TableCell><strong>Prix</strong></TableCell>
                            <TableCell><strong>Catégorie</strong></TableCell>
                            <TableCell><strong>Propriétaire</strong></TableCell>
                            <TableCell><strong>Statut</strong></TableCell>
                            <TableCell><strong>Actions</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ads.map((ad) => (
                            <TableRow
                                key={ad.id}
                                hover
                                sx={{
                                    transition: 'background 0.2s',
                                    '&:hover': {
                                        backgroundColor: '#f0f0f0',
                                    }
                                }}
                            >
                                <TableCell>{ad.id}</TableCell>
                                <TableCell>
                                    <Link
                                        to={`/admin/ads/${ad.id}`}
                                        style={{
                                            textDecoration: 'none',
                                            color: '#1976d2',
                                            fontWeight: 500
                                        }}
                                    >
                                        {ad.title}
                                    </Link>
                                </TableCell>
                                <TableCell>{ad.price.toFixed(2)} €</TableCell>
                                <TableCell>{ad.category?.name ?? '-'}</TableCell>
                                <TableCell>{ad.owner?.username ?? '-'}</TableCell>
                                <TableCell>
                                    {ad.isAvailable ? (
                                        <Chip
                                            label="Disponible"
                                            color="success"
                                            icon={<CheckCircle />}
                                            size="small"
                                        />
                                    ) : (
                                        <Chip
                                            label="Indisponible"
                                            color="default"
                                            icon={<Cancel />}
                                            size="small"
                                        />
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        startIcon={<Edit />}
                                        onClick={() => navigate(`/admin/ads/${ad.id}/edit`)}
                                    >
                                        Modifier
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
