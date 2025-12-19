import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { tasksAPI } from '../services/api';
import { useAuth } from '../hooks/useAuth';

const Dashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState(null);
    const [recentTasks, setRecentTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsRes, tasksRes] = await Promise.all([
                    tasksAPI.getStats(),
                    tasksAPI.getMyTasks(),
                ]);
                setStats(statsRes.data);
                setRecentTasks(tasksRes.data.slice(0, 5));
            } catch (error) {
                console.error('Failed to fetch dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    const statCards = [
        { label: 'Total Tasks', value: stats?.total || 0, color: 'bg-blue-500' },
        { label: 'To Do', value: stats?.todo || 0, color: 'bg-gray-500' },
        { label: 'In Progress', value: stats?.in_progress || 0, color: 'bg-yellow-500' },
        { label: 'Done', value: stats?.done || 0, color: 'bg-green-500' },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">
                    Welcome back, {user?.name}! 👋
                </h1>
                <p className="text-gray-600 mt-1">Here's what's happening with your tasks</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statCards.map((stat) => (
                    <div key={stat.label} className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center">
                            <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                                <span className="text-white text-xl font-bold">{stat.value}</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-600">{stat.label}</p>
                                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Tasks */}
            <div className="bg-white rounded-lg shadow-sm border">
                <div className="px-6 py-4 border-b flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-900">Recent Tasks</h2>
                    <Link
                        to="/tasks"
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                        View all →
                    </Link>
                </div>
                <div className="divide-y">
                    {recentTasks.length > 0 ? (
                        recentTasks.map((task) => (
                            <div key={task.id} className="px-6 py-4 flex justify-between items-center">
                                <div>
                                    <p className="font-medium text-gray-900">{task.title}</p>
                                    <p className="text-sm text-gray-500 capitalize">{task.status.replace('_', ' ')}</p>
                                </div>
                                <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${task.priority === 'urgent'
                                        ? 'bg-red-100 text-red-800'
                                        : task.priority === 'high'
                                            ? 'bg-orange-100 text-orange-800'
                                            : task.priority === 'medium'
                                                ? 'bg-blue-100 text-blue-800'
                                                : 'bg-gray-100 text-gray-800'
                                        }`}
                                >
                                    {task.priority}
                                </span>
                            </div>
                        ))
                    ) : (
                        <div className="px-6 py-8 text-center text-gray-500">
                            <p>No tasks yet.</p>
                            <Link
                                to="/tasks"
                                className="text-blue-600 hover:text-blue-700 font-medium mt-2 inline-block"
                            >
                                Create your first task →
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;