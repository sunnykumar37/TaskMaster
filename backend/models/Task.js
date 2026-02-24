const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        title: {
            type: String,
            required: [true, "Please add a title"],
        },
        description: {
            type: String,
            required: [true, "Please add a description"],
        },
        status: {
            type: String,
            required: true,
            enum: ["Pending", "In Progress", "Completed"],
            default: "Pending",
        },
    },
    {
        timestamps: true,
    }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
