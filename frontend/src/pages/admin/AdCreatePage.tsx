import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdForm from '../../components/admin/AdminAdForm';

export default function AdCreatePage() {
    const navigate = useNavigate();

    return (
        <AdForm
            mode="create"
            onSuccess={() => {
                navigate('/admin/ads');
            }}
        />
    );
}
