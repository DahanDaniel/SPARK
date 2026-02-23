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
        <div className="min-h-screen flex items-center justify-center bg-[#050505] relative overflow-hidden font-sans">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-900/15 rounded-full blur-[140px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-900/15 rounded-full blur-[140px]"></div>
                <div className="absolute top-[20%] right-[30%] w-[20%] h-[20%] bg-spark-gold/15 rounded-full blur-[120px]"></div>
            </div>

            {/* Main Login Card - Glassmorphism */}
            <div className="relative z-10 w-full max-w-md p-10 bg-[#161616]/70 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                
                {/* Logo / Icon Area */}
                <div className="text-center mb-10">
                    <div className="w-20 h-20 mx-auto mb-6 relative group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-spark-gold/40 to-blue-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                        <div className="relative w-full h-full bg-[#1a1a1a] border border-white/10 rounded-2xl flex items-center justify-center shadow-inner overflow-hidden">
                           <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                            <Lock className="w-8 h-8 text-spark-gold z-10 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" strokeWidth={1.5} />
                        </div>
                    </div>
                    
                    <h1 className="text-3xl font-extrabold text-white tracking-tight mb-3">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">CEO</span> Workspace
                    </h1>
                    <p className="text-gray-400 text-sm font-light">Zaloguj się, aby uzyskać dostęp do pakietu opcji.</p>
                </div>

                {/* Form Area */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Kod dostępu"
                            className="w-full bg-[#0a0a0a]/80 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-spark-gold/40 focus:border-spark-gold/50 transition-all text-center tracking-[0.3em] font-medium text-lg shadow-inner"
                        />
                        <div className="absolute inset-0 rounded-2xl pointer-events-none border border-transparent peer-focus:border-spark-gold/20 transition-colors duration-300"></div>
                    </div>
                    
                    {/* Error State */}
                    {error && (
                        <div className="text-red-400 text-sm text-center bg-red-950/40 py-3 px-4 rounded-xl border border-red-900/50 backdrop-blur-md animate-pulse-fast">
                            {error}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading || !password}
                        className="w-full relative overflow-hidden rounded-2xl group disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(251,191,36,0.15)] focus:outline-none focus:ring-2 focus:ring-white/20"
                    >
                        {/* Button Background Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white group-hover:from-[#fcfcfc] group-hover:to-[#f0f0f0] transition-colors duration-300"></div>
                        
                        {/* Content */}
                        <div className="relative flex items-center justify-center gap-3 px-6 py-4">
                            <span className="text-black font-semibold tracking-wider text-sm uppercase">
                                {loading ? 'Weryfikacja...' : 'Autoryzuj'}
                            </span>
                            {!loading && (
                                <ArrowRight className="w-5 h-5 text-black group-hover:translate-x-1 transition-transform duration-300" />
                            )}
                        </div>
                    </button>
                    
                    {/* Subtle footer text */}
                    <div className="text-center mt-6">
                        <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-medium opacity-60">Secure Connection 256-bit</p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
