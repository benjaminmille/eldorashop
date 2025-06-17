import React, { useEffect, useState } from 'react';
import {
    TextField, Button, Grid, Paper, Typography,
    MenuItem, CircularProgress, Box, Alert
} from '@mui/material';

type AdFormProps = {
    mode: 'create' | 'edit';
    initialValues?: {
        id?: number;
        title: string;
        description: string;
        price: number;
        location: string;
        categoryId: string;
    };
    onSuccess?: () => void;
};

type Category = { id: string; name: string };

export default function AdForm({ mode, initialValues, onSuccess }: AdFormProps) {
    const [title, setTitle] = useState(initialValues?.title || '');
    const [description, setDescription] = useState(initialValues?.description || '');
    const [price, setPrice] = useState(initialValues?.price || 0);
    const [location, setLocation] = useState(initialValues?.location || '');
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Remplit le formulaire si on est en mode edit et que les données arrivent
    useEffect(() => {
        if (initialValues) {
            setTitle(initialValues.title);
            setDescription(initialValues.description);
            setPrice(initialValues.price);
            setLocation(initialValues.location);
            setCategoryId(initialValues.categoryId);
        }
    }, [initialValues]);

    useEffect(() => {
        fetch('http://localhost:80/api/categories')
            .then(res => res.json())
            .then(setCategories)
            .catch(() => setCategories([]));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const payload = {
            title,
            description,
            price,
            location,
            categoryId,
            userId: 1, // à adapter selon auth
        };

        const url =
            mode === 'edit'
                ? `http://localhost:80/api/ads/${initialValues?.id}`
                : 'http://localhost:80/api/ads';

        const method = mode === 'edit' ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error('Erreur HTTP ' + res.status);

            if (onSuccess) onSuccess();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper sx={{ p: 4, maxWidth: 800, mx: 'auto', mt: 4 }} elevation={3}>
            <Typography variant="h5" gutterBottom mb={6}>
                {mode === 'edit' ? '✏️ Modifier une annonce' : '📢 Créer une annonce'}
            </Typography>

            <form onSubmit={handleSubmit}>
                <Grid container direction="column" spacing={2}>
                    <Grid item>
                        <TextField
                            label="Titre"
                            fullWidth
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Grid>

                    <Grid item>
                        <TextField
                            label="Description"
                            fullWidth
                            multiline
                            required
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Grid>

                    <Grid item>
                        <TextField
                            label="Prix (€)"
                            type="number"
                            fullWidth
                            required
                            inputProps={{ min: 0 }}
                            value={price}
                            onChange={(e) => setPrice(parseFloat(e.target.value))}
                        />
                    </Grid>

                    <Grid item>
                        <TextField
                            label="Localisation"
                            fullWidth
                            required
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </Grid>

                    <Grid item>
                        <TextField
                            label="Catégorie"
                            select
                            fullWidth
                            required
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                        >
                            {categories.map(cat => (
                                <MenuItem key={cat.id} value={cat.id}>
                                    {cat.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    {error && (
                        <Grid item>
                            <Alert severity="error">{error}</Alert>
                        </Grid>
                    )}

                    <Grid item>
                        <Box display="flex" justifyContent="flex-end">
                            <Button type="submit" variant="contained" color="primary" disabled={loading}>
                                {loading ? <CircularProgress size={24} /> : mode === 'edit' ? 'Enregistrer' : 'Créer'}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
}
