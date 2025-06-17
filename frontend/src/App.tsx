import HomePage from "./pages/ecommerce/HomePage";

export default function App() {
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
                Bienvenue sur EldoraShop 🛒
            </h1>

            <HomePage />
        </div>
    );
}