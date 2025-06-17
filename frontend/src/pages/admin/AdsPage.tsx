import React from 'react';
import AdminAdList from '../../components/admin/AdminAdList';
import { Container, Typography } from '@mui/material';

export default function AdsPage() {
    return (
        <Container maxWidth="lg">
            <AdminAdList />
        </Container>
    );
}