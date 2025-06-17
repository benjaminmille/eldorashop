import { useParams } from 'react-router-dom';
import AdDetail from '../../components/admin/AdminAdDetail';

export default function AdDetailPage() {
    const { id } = useParams();

    return <AdDetail adId={id!} />;
}
