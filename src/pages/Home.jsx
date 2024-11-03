import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sun, Moon, Plus, Search } from 'lucide-react';

const Home = ({ darkMode, setDarkMode }) => {
    const navigate = useNavigate();
    const [greeting, setGreeting] = useState('');
    const [entries, setEntries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) setGreeting('Good Morning');
        else if (hour >= 12 && hour < 18) setGreeting('Good Afternoon');
        else setGreeting('Good Evening');

        // Load entries from localStorage
        const savedEntries = JSON.parse(localStorage.getItem('plannerEntries') || '[]');
        setEntries(savedEntries.sort((a, b) => new Date(b.date) - new Date(a.date)));
    }, []);

    const filteredEntries = entries.filter(entry =>
        entry.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.mood.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getMoodEmoji = (mood) => {
        const moods = {
            'happy': '😊',
            'sad': '😢',
            'neutral': '😐',
            'excited': '🎉',
            'tired': '😴',
            'angry': '😠'
        };
        return moods[mood] || '😊';
    };

    return (
        <div className="min-h-screen p-6">
            <header className="flex justify-between items-center mb-8">
                <div className="text-2xl font-bold text-gray-800 dark:text-white">
                    {greeting}, HeaLer
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                        {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
                    </button>
                    <button
                        onClick={() => navigate('/planner')}
                        className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        New Entry
                    </button>
                </div>
            </header>

            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search entries..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEntries.map((entry, index) => (
                    <div
                        key={index}
                        onClick={() => navigate('/planner', { state: { entry } })}
                        className="card cursor-pointer"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-lg font-semibold mb-2">{entry.date}</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {entry.goals?.slice(0, 100)}...
                                </p>
                            </div>
                            <span className="text-2xl">{getMoodEmoji(entry.mood)}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;