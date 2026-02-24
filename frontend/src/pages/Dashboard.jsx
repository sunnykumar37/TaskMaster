import React, { useState, useEffect, useCallback } from "react";
import api from "../services/api";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");

    const fetchTasks = useCallback(async () => {
        try {
            const { data } = await api.get("/tasks");
            setTasks(data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const handleSaveTask = async (taskData) => {
        try {
            if (taskToEdit) {
                await api.put(`/tasks/${taskToEdit._id}`, taskData);
                setTaskToEdit(null);
            } else {
                await api.post("/tasks", taskData);
            }
            fetchTasks();
        } catch (error) {
            console.error("Error saving task:", error);
        }
    };

    const handleDeleteTask = async (id) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            try {
                await api.delete(`/tasks/${id}`);
                fetchTasks();
            } catch (error) {
                console.error("Error deleting task:", error);
            }
        }
    };

    const filteredTasks = tasks.filter((task) => {
        const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === "All" || task.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Background Decorative Blobs */}
            <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
            <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none animate-pulse" style={{ animationDelay: "2s" }}></div>

            <div className="container mx-auto px-6 py-12 max-w-7xl relative z-10">
                {/* Header Section */}
                <div className="glass p-8 rounded-[2.5rem] mb-12 flex flex-col lg:flex-row justify-between items-center gap-8 border border-white/5 shadow-2xl transition-all">
                    <div>
                        <h1 className="text-4xl font-black font-display tracking-tight text-white mb-2 drop-shadow-lg">Command Center</h1>
                        <p className="text-gray-200 font-medium">Manage and optimize your operational objectives</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                        <div className="relative group flex-1 sm:w-80">
                            <input
                                type="text"
                                placeholder="Search objectives..."
                                className="w-full bg-white/10 border border-white/20 px-6 py-4 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-gray-400 font-semibold text-sm text-white"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <div className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-primary transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 font-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>

                        <div className="relative">
                            <select
                                className="w-full sm:w-48 bg-white/10 border border-white/20 px-6 py-4 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-semibold text-sm text-gray-100 appearance-none cursor-pointer"
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="All" className="bg-dark-lighter text-white">All Status</option>
                                <option value="Pending" className="bg-dark-lighter text-white">Pending</option>
                                <option value="In Progress" className="bg-dark-lighter text-white">In Progress</option>
                                <option value="Completed" className="bg-dark-lighter text-white">Completed</option>
                            </select>
                            <div className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-[1fr_1.8fr] gap-12 items-start">
                    <aside className="sticky top-28">
                        <TaskForm onSave={handleSaveTask} taskToEdit={taskToEdit} />
                        {taskToEdit && (
                            <button
                                onClick={() => setTaskToEdit(null)}
                                className="w-full text-gray-500 hover:text-white font-black uppercase tracking-widest text-[10px] py-4 rounded-2xl glass border border-white/5 transition-all -mt-6 hover:bg-white/5 active:scale-95"
                            >
                                Cancel Modification
                            </button>
                        )}
                    </aside>

                    <main className="min-h-[500px]">
                        {loading ? (
                            <div className="flex flex-col justify-center items-center h-[400px] glass rounded-[2.5rem] border border-white/5">
                                <div className="relative">
                                    <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                                    <div className="absolute inset-0 bg-primary/40 rounded-full blur-xl opacity-20"></div>
                                </div>
                                <p className="text-gray-500 font-black uppercase tracking-[0.2em] text-xs mt-8 animate-pulse">Synchronizing Data</p>
                            </div>
                        ) : (
                            <TaskList tasks={filteredTasks} onEdit={setTaskToEdit} onDelete={handleDeleteTask} />
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
