import { useState } from 'react';
import { Lock, ArrowRight } from 'lucide-react';
import api from '../api';

const Login = ({ onLoginSuccess }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await api.post('/api/auth/login', { password });
            if (response.data.success) {
                onLoginSuccess();
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Wystąpił błąd podczas logowania');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-bento-bg relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent-blue opacity-10 rounded-full blur-3xl"></div>
                <div className="absolute top-40 -left-20 w-72 h-72 bg-accent-purple opacity-10 rounded-full blur-3xl"></div>
            </div>

            <div className="z-10 w-full max-w-md p-8 bento-card border-none bg-black/60 backdrop-blur-md">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <Lock className="w-8 h-8 text-spark-gold" />
                    </div>
                    <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">CEO Workspace</h1>
                    <p className="text-text-secondary text-sm">Zaloguj się, aby uzyskać dostęp do kokpitu.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Wprowadź kod dostępu"
                            className="w-full bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-4 text-[var(--color-text-primary)] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-spark-gold focus:border-transparent transition-all text-center tracking-widest text-lg"
                        />
                    </div>
                    
                    {error && (
                        <div className="text-red-400 text-sm text-center bg-red-900/20 py-2 rounded-lg border border-red-900/50">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading || !password}
                        className="w-full bg-white text-black font-semibold rounded-xl px-4 py-4 flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                        {loading ? 'Weryfikacja...' : 'Autoryzuj'}
                        {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
