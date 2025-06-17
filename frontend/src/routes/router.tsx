import { createBrowserRouter } from 'react-router-dom';
import AdsPage from '../pages/admin/AdsPage';
import AdDetailPage from "../pages/admin/AdDetailPage";
import AdEditPage from "../pages/admin/AdEditPage";
import AdCreatePage from "../pages/admin/AdCreatePage";
import HomePage from "../pages/ecommerce/HomePage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/admin/ads',
        element: <AdsPage />,
    },
    {
        path: '/admin/ads/:id',
        element: <AdDetailPage />
    },
    {
        path: '/admin/ads/create',
        element: <AdCreatePage />,
    },
    {
        path: '/admin/ads/:id/edit',
        element: <AdEditPage />,
    }
]);

export default router;