import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import {
    Sun,
    Moon,
    Cloud,
    CloudRain,
    Wind,
    Smile,
    Frown,
    Meh,
    PartyPopper,
    Battery,
    Angry,
    Check,
    Target,
    Bell,
    Coffee,
    Utensils,
    Pizza,
    Wine,
    Droplet,
    Timer,
    Heart,
    DollarSign,
    FileText,
    Calendar,
    Save,
    Download,
    ArrowLeft
} from 'lucide-react';

const Planner = ({ darkMode, setDarkMode }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({
        date: format(new Date(), 'yyyy-MM-dd'),
        weather: 'sunny',
        mood: 'happy',
        todos: [{ text: '', completed: false }],
        goals: '',
        reminders: '',
        breakfast: '',
        lunch: '',
        dinner: '',
        snacks: '',
        waterIntake: 0,
        exercise: { minutes: '', steps: '' },
        gratitude: '',
        money: { income: '', expense: '', from: '', for: '' },
        notes: '',
        tomorrow: ''
    });

    useEffect(() => {
        if (location.state?.entry) {
            setFormData(location.state.entry);
        } else {
            const savedData = localStorage.getItem(`planner-${formData.date}`);
            if (savedData) {
                setFormData(JSON.parse(savedData));
            }
        }
    }, [location.state]);

    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleNestedChange = (parent, field, value) => {
        setFormData(prev => ({
            ...prev,
            [parent]: {
                ...prev[parent],
                [field]: value
            }
        }));
    };

    const handleTodoChange = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            todos: prev.todos.map((todo, i) =>
                i === index ? { ...todo, [field]: value } : todo
            )
        }));
    };

    const addTodo = () => {
        setFormData(prev => ({
            ...prev,
            todos: [...prev.todos, { text: '', completed: false }]
        }));
    };

    const removeTodo = (index) => {
        setFormData(prev => ({
            ...prev,
            todos: prev.todos.filter((_, i) => i !== index)
        }));
    };

    const handleSave = () => {
        localStorage.setItem(`planner-${formData.date}`, JSON.stringify(formData));

        // Save to entries list
        const entries = JSON.parse(localStorage.getItem('plannerEntries') || '[]');
        const entryIndex = entries.findIndex(entry => entry.date === formData.date);

        if (entryIndex >= 0) {
            entries[entryIndex] = formData;
        } else {
            entries.push(formData);
        }

        localStorage.setItem('plannerEntries', JSON.stringify(entries));
    };


    return (
        <div className="min-h-screen p-6">
            <div className="max-w-7xl mx-auto">
                <header className="flex justify-between items-center mb-8">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Home
                    </button>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                            {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
                        </button>
                        <button
                            onClick={handleSave}
                            className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition-colors"
                        >
                            <Save className="w-5 h-5" />
                            Save
                        </button>
                    </div>
                </header>

                <div id="planner-content" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Date and Weather Section */}
                    <div className="card">
                        <h2 className="section-title">Date & Weather</h2>
                        <div className="flex flex-col gap-4">
                            <input
                                type="date"
                                value={formData.date}
                                onChange={(e) => handleChange('date', e.target.value)}
                                className="input-field"
                            />
                            <div className="flex gap-4">
                                {['sunny', 'cloudy', 'rainy', 'windy'].map((weather) => (
                                    <button
                                        key={weather}
                                        onClick={() => handleChange('weather', weather)}
                                        className={`p-3 rounded-lg flex-1 ${formData.weather === weather
                                            ? 'bg-primary text-white'
                                            : 'bg-gray-100 dark:bg-gray-700'
                                            }`}
                                    >
                                        {weather === 'sunny' && <Sun className="w-6 h-6 mx-auto" />}
                                        {weather === 'cloudy' && <Cloud className="w-6 h-6 mx-auto" />}
                                        {weather === 'rainy' && <CloudRain className="w-6 h-6 mx-auto" />}
                                        {weather === 'windy' && <Wind className="w-6 h-6 mx-auto" />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Mood Tracker */}
                    <div className="card">
                        <h2 className="section-title">Mood Tracker</h2>
                        <div className="grid grid-cols-3 gap-4">
                            {['happy', 'sad', 'neutral', 'excited', 'tired', 'angry'].map((mood) => (
                                <button
                                    key={mood}
                                    onClick={() => handleChange('mood', mood)}
                                    className={`p-3 rounded-lg ${formData.mood === mood
                                        ? 'bg-primary text-white'
                                        : 'bg-gray-100 dark:bg-gray-700'
                                        }`}
                                >
                                    {mood === 'happy' && <Smile className="w-6 h-6 mx-auto" />}
                                    {mood === 'sad' && <Frown className="w-6 h-6 mx-auto" />}
                                    {mood === 'neutral' && <Meh className="w-6 h-6 mx-auto" />}
                                    {mood === 'excited' && <PartyPopper className="w-6 h-6 mx-auto" />}
                                    {mood === 'tired' && <Battery className="w-6 h-6 mx-auto" />}
                                    {mood === 'angry' && <Angry className="w-6 h-6 mx-auto" />}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* To-Do List */}
                    <div className="card">
                        <h2 className="section-title">To-Do List</h2>
                        <div className="flex flex-col gap-3">
                            {formData.todos.map((todo, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={todo.completed}
                                        onChange={(e) => handleTodoChange(index, 'completed', e.target.checked)}
                                        className="w-5 h-5 rounded text-primary"
                                    />
                                    <input
                                        type="text"
                                        value={todo.text}
                                        onChange={(e) => handleTodoChange(index, 'text', e.target.value)}
                                        className={`input-field flex-1 ${todo.completed ? 'line-through text-gray-400' : ''
                                            }`}
                                        placeholder="Add a task..."
                                    />
                                    <button
                                        onClick={() => removeTodo(index)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={addTodo}
                                className="text-primary hover:text-primary-dark text-sm mt-2"
                            >
                                + Add Task
                            </button>
                        </div>
                    </div>

                    {/* Goals */}
                    <div className="card">
                        <h2 className="section-title flex items-center gap-2">
                            <Target className="w-5 h-5" /> Goals
                        </h2>
                        <textarea
                            value={formData.goals}
                            onChange={(e) => handleChange('goals', e.target.value)}
                            className="input-field min-h-[100px]"
                            placeholder="What are your goals for today?"
                        />
                    </div>

                    {/* Reminders */}
                    <div className="card">
                        <h2 className="section-title flex items-center gap-2">
                            <Bell className="w-5 h-5" /> Reminders
                        </h2>
                        <textarea
                            value={formData.reminders}
                            onChange={(e) => handleChange('reminders', e.target.value)}
                            className="input-field min-h-[100px]"
                            placeholder="Don't forget to..."
                        />
                    </div>

                    {/* Meal Tracker */}
                    <div className="card">
                        <h2 className="section-title flex items-center gap-2">
                            <Utensils className="w-5 h-5" /> Meal Tracker
                        </h2>
                        <div className="flex flex-col gap-4">
                            <div>
                                <label className="flex items-center gap-2 mb-1">
                                    <Coffee className="w-4 h-4" /> Breakfast
                                </label>
                                <input
                                    type="text"
                                    value={formData.breakfast}
                                    onChange={(e) => handleChange('breakfast', e.target.value)}
                                    className="input-field"
                                    placeholder="What did you have for breakfast?"
                                />
                            </div>
                            <div>
                                <label className="flex items-center gap-2 mb-1">
                                    <Pizza className="w-4 h-4" /> Lunch
                                </label>
                                <input
                                    type="text"
                                    value={formData.lunch}
                                    onChange={(e) => handleChange('lunch', e.target.value)}
                                    className="input-field"
                                    placeholder="What did you have for lunch?"
                                />
                            </div>
                            <div>
                                <label className="flex items-center gap-2 mb-1">
                                    <Utensils className="w-4 h-4" /> Dinner
                                </label>
                                <input
                                    type="text"
                                    value={formData.dinner}
                                    onChange={(e) => handleChange('dinner', e.target.value)}
                                    className="input-field"
                                    placeholder="What did you have for dinner?"
                                />
                            </div>
                            <div>
                                <label className="flex items-center gap-2 mb-1">
                                    <Wine className="w-4 h-4" /> Snacks
                                </label>
                                <input
                                    type="text"
                                    value={formData.snacks}
                                    onChange={(e) => handleChange('snacks', e.target.value)}
                                    className="input-field"
                                    placeholder="Any snacks today?"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Water Intake */}
                    <div className="card">
                        <h2 className="section-title flex items-center gap-2">
                            <Droplet className="w-5 h-5" /> Water Intake
                        </h2>
                        <div className="flex gap-2">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleChange('waterIntake', index + 1)}
                                    className={`p-2 rounded-lg flex-1 ${index < formData.waterIntake
                                        ? 'bg-primary text-white'
                                        : 'bg-gray-100 dark:bg-gray-700'
                                        }`}
                                >
                                    <Droplet className="w-6 h-6 mx-auto" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Exercise */}
                    <div className="card">
                        <h2 className="section-title flex items-center gap-2">
                            <Timer className="w-5 h-5" /> Exercise
                        </h2>
                        <div className="flex flex-col gap-4">
                            <div>
                                <label className="block mb-1">Minutes of Exercise</label>
                                <input
                                    type="number"
                                    value={formData.exercise.minutes}
                                    onChange={(e) => handleNestedChange('exercise', 'minutes', e.target.value)}
                                    className="input-field"
                                    placeholder="Minutes"
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Steps Taken</label>
                                <input
                                    type="number"
                                    value={formData.exercise.steps}
                                    onChange={(e) => handleNestedChange('exercise', 'steps', e.target.value)}
                                    className="input-field"
                                    placeholder="Steps"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Gratitude */}
                    <div className="card">
                        <h2 className="section-title flex items-center gap-2">
                            <Heart className="w-5 h-5" /> Gratitude
                        </h2>
                        <textarea
                            value={formData.gratitude}
                            onChange={(e) => handleChange('gratitude', e.target.value)}
                            className="input-field min-h-[100px]"
                            placeholder="Today I am grateful for..."
                        />
                    </div>

                    {/* Money */}
                    <div className="card">
                        <h2 className="section-title flex items-center gap-2">
                            <DollarSign className="w-5 h-5" /> Money Tracker
                        </h2>
                        <div className="flex flex-col gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block mb-1">Money In</label>
                                    <input
                                        type="number"
                                        value={formData.money.income}
                                        onChange={(e) => handleNestedChange('money', 'income', e.target.value)}
                                        className="input-field"
                                        placeholder="Amount"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1">From</label>
                                    <input
                                        type="text"
                                        value={formData.money.from}
                                        onChange={(e) => handleNestedChange('money', 'from', e.target.value)}
                                        className="input-field"
                                        placeholder="Source"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block mb-1">Money Out</label>
                                    <input
                                        type="number"
                                        value={formData.money.expense}
                                        onChange={(e) => handleNestedChange('money', 'expense', e.target.value)}
                                        className="input-field"
                                        placeholder="Amount"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1">For</label>
                                    <input
                                        type="text"
                                        value={formData.money.for}
                                        onChange={(e) => handleNestedChange('money', 'for', e.target.value)}
                                        className="input-field"
                                        placeholder="Purpose"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="card">
                        <h2 className="section-title flex items-center gap-2">
                            <FileText className="w-5 h-5" /> Notes
                        </h2>
                        <textarea
                            value={formData.notes}
                            onChange={(e) => handleChange('notes', e.target.value)}
                            className="input-field min-h-[100px]"
                            placeholder="Additional notes..."
                        />
                    </div>

                    {/* For Tomorrow */}
                    <div className="card">
                        <h2 className="section-title flex items-center gap-2">
                            <Calendar className="w-5 h-5" /> For Tomorrow
                        </h2>
                        <textarea
                            value={formData.tomorrow}
                            onChange={(e) => handleChange('tomorrow', e.target.value)}
                            className="input-field min-h-[100px]"
                            placeholder="Plans for tomorrow..."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Planner;