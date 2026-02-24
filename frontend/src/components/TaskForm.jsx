import React, { useState, useEffect } from "react";

const TaskForm = ({ onSave, taskToEdit }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: "Pending",
    });

    useEffect(() => {
        if (taskToEdit) {
            setFormData({
                title: taskToEdit.title,
                description: taskToEdit.description,
                status: taskToEdit.status,
            });
        } else {
            setFormData({ title: "", description: "", status: "Pending" });
        }
    }, [taskToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        if (!taskToEdit) {
            setFormData({ title: "", description: "", status: "Pending" });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="glass p-8 rounded-3xl shadow-2xl border border-white/5 mb-10 max-w-2xl mx-auto relative overflow-hidden">
            {/* Subtle inner glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

            <h2 className="text-2xl font-black font-display tracking-tight text-white mb-8 flex items-center gap-3 drop-shadow-lg">
                <span className="w-2 h-8 bg-primary rounded-full"></span>
                {taskToEdit ? "Edit Task" : "Create New Task"}
            </h2>
            <div className="space-y-6">
                <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-300 mb-2 ml-1">Objective Title</label>
                    <input
                        type="text"
                        className="w-full bg-white/10 border border-white/20 px-5 py-4 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-gray-400 font-medium text-white"
                        placeholder="What needs to be done?"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-300 mb-2 ml-1">Strategic Description</label>
                    <textarea
                        className="w-full bg-white/10 border border-white/20 px-5 py-4 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-gray-400 font-medium text-white h-32 resize-none"
                        placeholder="Add some details..."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-300 mb-2 ml-1">Priority Status</label>
                    <select
                        className="w-full bg-white/10 border border-white/20 px-5 py-4 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-medium text-white appearance-none cursor-pointer"
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    >
                        <option value="Pending" className="bg-dark-lighter text-white">Pending</option>
                        <option value="In Progress" className="bg-dark-lighter text-white">In Progress</option>
                        <option value="Completed" className="bg-dark-lighter text-white">Completed</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-dark text-white font-black py-4 rounded-2xl transition-all shadow-[0_0_20px_rgba(99,102,241,0.2)] hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] transform active:scale-[0.98] mt-4 uppercase tracking-widest text-sm"
                >
                    {taskToEdit ? "Update Objective" : "Initialize Task"}
                </button>
            </div>
        </form>
    );
};

export default TaskForm;
