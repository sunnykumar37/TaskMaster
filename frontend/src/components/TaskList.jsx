import React from "react";

const TaskList = ({ tasks, onEdit, onDelete }) => {
    if (tasks.length === 0) {
        return (
            <div className="text-center py-20 glass rounded-3xl border-2 border-dashed border-white/15">
                <p className="text-gray-200 font-bold text-xl uppercase tracking-widest">No objectives identified</p>
                <p className="text-gray-400 mt-2 text-sm">Initialize your first task to begin tracking</p>
            </div>
        );
    }

    return (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            {tasks.map((task) => (
                <div
                    key={task._id}
                    className="glass p-8 rounded-3xl shadow-2xl border border-white/10 hover:border-primary/40 transition-all group relative overflow-hidden"
                >
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

                    <div className="flex justify-between items-start mb-6 relative z-10">
                        <h3 className="text-xl font-black font-display tracking-tight text-white group-hover:text-primary transition-colors line-clamp-1">{task.title}</h3>
                        <span
                            className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border shadow-sm ${task.status === "Completed"
                                ? "bg-secondary/10 text-secondary border-secondary/20"
                                : task.status === "In Progress"
                                    ? "bg-primary/10 text-primary border-primary/20"
                                    : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                                }`}
                        >
                            {task.status}
                        </span>
                    </div>
                    <p className="text-gray-200 font-medium mb-8 line-clamp-3 min-h-[4.5rem] leading-relaxed text-sm relative z-10">{task.description}</p>
                    <div className="flex gap-4 pt-6 border-t border-white/5 relative z-10">
                        <button
                            onClick={() => onEdit(task)}
                            className="flex-1 text-[10px] font-black uppercase tracking-widest text-white bg-white/5 hover:bg-white/10 py-3 rounded-xl transition-all border border-white/10 active:scale-95"
                        >
                            Modify
                        </button>
                        <button
                            onClick={() => onDelete(task._id)}
                            className="flex-1 text-[10px] font-black uppercase tracking-widest text-red-500 bg-red-500/5 hover:bg-red-500 hover:text-white py-3 rounded-xl transition-all border border-red-500/10 active:scale-95"
                        >
                            Terminate
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TaskList;
