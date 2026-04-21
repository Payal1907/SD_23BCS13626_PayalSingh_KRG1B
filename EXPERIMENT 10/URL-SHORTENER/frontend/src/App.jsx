import './index.css'
import { useState, useEffect } from "react"
import axios from 'axios';


function App() {
    const [url, setUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [darkMode, setDarkMode] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const root = window.document.documentElement;
        if (darkMode) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [darkMode]);

    const handleShorten = async () => {
        if (!url) {
            window.alert("Feed me a URL first!");
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:8080/api/v1/shorten", url, {
                headers: { 'Content-Type': 'text/plain' }
            });
            setShortUrl(response.data);
        } catch (error) {
            console.error(error);
            window.alert("Backend APIs are not set up well.");
        } finally {
            setLoading(false);
        }
    }

    const copyToClipboard = () => {
        if (!shortUrl) return;
        window.navigator.clipboard.writeText(shortUrl);
        window.alert("Copied!");
    };

    return (
        // The main outer container must be 'relative' for the Minion positioning to work
        <div className="min-h-screen transition-all duration-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-sans relative overflow-hidden justify-center" >

            {/* --- WAVING MINION (BACKGROUND LAYER) --- */}
            {/* We place this before the navbar and main content so it stays in the "back" */}
            <div className="fixed right-10 bottom-6 z-0 pointer-events-none overflow-visible">
                <img
                    src="/minion_waving.png"
                    alt="Waving Minion"
                    /* -right-4 ensures it truly tucks against the edge.
                       translate-x-10 hides a bit of his body so he looks like he's "peeking"
                    */
                    className="w-[400px] h-auto opacity-95 dark:opacity-70 translate-x-20 translate-y-10 animate-minion-wave"
                />
            </div>

            {/* Navbar */}
            <nav className="max-w-6xl mx-auto flex justify-between items-center p-6 border-b border-slate-200 dark:border-slate-800 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 bg-yellow-400 rounded-2xl shadow-lg border-2 border-slate-900 dark:border-slate-700 transform -rotate-12">
                        <svg
                            viewBox="0 0 24 24"
                            className="w-7 h-7 text-slate-900"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                        </svg>
                    </div>
                    <span className="text-2xl font-black tracking-tighter">
                        MINI1 <span className="text-yellow-500 font-light">| YOUR URL SHORTENING TOOL</span>
                    </span>
                </div>

                {/* --- TOGGLE GROUP (NOW FLANKING) --- */}
                <div className="flex items-center gap-4">
                    {/* Sun SVG (Left of Toggle) */}
                    <svg
                        className={`w-6 h-6 transition-all duration-500 ${!darkMode ? 'text-yellow-500 drop-shadow-[0_0_10px_rgba(234,179,8,1)]' : 'text-slate-400 opacity-40'}`}
                        fill="currentColor" viewBox="0 0 20 20"
                    >
                        <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                    </svg>

                    {/* Simple Toggle Button */}
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="relative w-14 h-7 flex items-center bg-slate-300 dark:bg-slate-700 rounded-full p-1 transition-all duration-500 shadow-inner"
                    >
                        {/* Sliding white pill */}
                        <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-500 ${darkMode ? 'translate-x-7' : 'translate-x-0'}`} />
                    </button>

                    {/* Moon SVG (Right of Toggle) */}
                    <svg
                        className={`w-6 h-6 transition-all duration-500 ${darkMode ? 'text-blue-400 drop-shadow-[0_0_12px_rgba(147,197,253,1)]' : 'text-slate-400 opacity-40'}`}
                        fill="currentColor" viewBox="0 0 20 20"
                    >
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                </div>
            </nav>

            {/* Hero Section (MUST BE relative z-10) */}
            {/* Added relative z-10 so it stays *above* the Minion */}
            <main className="flex flex-col items-center justify-center mt-20 px-4 relative z-10">
                {/* Reduced max-width from 2xl to xl, and rounded corners from 2.5rem to 2rem */}
                <div className="w-full max-w-xl bg-white dark:bg-slate-900 shadow-xl rounded-[2rem] p-6 md:p-10 border border-slate-100 dark:border-slate-800 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-400/10 rounded-full -mr-12 -mt-12 blur-2xl"></div>

                    {/* Font reduced from 4xl to 3xl */}
                    <h2 className="text-3xl font-black mb-1 text-slate-900 dark:text-white tracking-tight italic">Shorten your links.</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 font-medium">Fast, secure, and easy-to-manage URLs.</p>

                    <div className="space-y-3">
                        <input
                            type="text"
                            value={url}
                            onChange={(/** @any */ e) => setUrl(e.target.value)}
                            placeholder="Paste your long URL here..."
                            /* Reduced padding from p-6 to p-4 and font from text-lg to text-base */
                            className="w-full p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/50 border-2 border-transparent focus:border-yellow-400 focus:bg-white dark:focus:bg-slate-800 outline-none transition-all text-base font-medium dark:text-white"
                        />

                        <button
                            onClick={handleShorten}
                            disabled={loading}
                            /* Reduced padding from py-6 to py-4 and text from text-xl to text-lg */
                            className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-black py-4 rounded-2xl shadow-lg shadow-yellow-400/20 transition-all active:scale-[0.98] disabled:opacity-70 flex justify-center items-center text-lg tracking-wider"
                        >
                            {loading ? "SCANNING..." : "GET MINI LINK"}
                        </button>
                    </div>

                    {shortUrl && (
                        /* Reduced padding from p-8 to p-6 */
                        <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-400/5 rounded-2xl border border-yellow-200 dark:border-yellow-400/20">
                            <span className="text-[10px] font-bold text-yellow-600 dark:text-yellow-400 uppercase tracking-[0.2em]">Generated Link</span>
                            <div className="flex items-center justify-between mt-2 overflow-hidden">
                                {/* Font reduced from 2xl to xl */}
                                <a href={shortUrl} target="_blank" rel="noreferrer" className="text-xl font-mono font-bold text-slate-800 dark:text-white truncate hover:text-yellow-500">
                                    {shortUrl}
                                </a>
                                <button
                                    onClick={copyToClipboard}
                                    className="ml-4 bg-white dark:bg-slate-800 px-4 py-2 rounded-lg text-xs font-black shadow-sm border border-slate-200 dark:border-slate-700 active:scale-95 transition-all"
                                >
                                    COPY
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}

export default App
