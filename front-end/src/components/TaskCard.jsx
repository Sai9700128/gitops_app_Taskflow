const priorityColors = {
    low: 'bg-gray-100 text-gray-800',
    medium: 'bg-blue-100 text-blue-800',
    high: 'bg-orange-100 text-orange-800',
    urgent: 'bg-red-100 text-red-800',
};

const statusColors = {
    todo: 'bg-gray-100 text-gray-800',
    in_progress: 'bg-yellow-100 text-yellow-800',
    review: 'bg-purple-100 text-purple-800',
    done: 'bg-green-100 text-green-800',
};

const statusLabels = {
    todo: 'To Do',
    in_progress: 'In Progress',
    review: 'Review',
    done: 'Done',
};

const TaskCard = ({ task, onEdit, onDelete }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition">
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900">{task.title}</h3>
                <div className="flex space-x-2">
                    <button
                        onClick={() => onEdit(task)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(task.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                    >
                        Delete
                    </button>
                </div>
            </div>

            {task.description && (
                <p className="text-gray-600 text-sm mb-3">{task.description}</p>
            )}

            <div className="flex flex-wrap gap-2 mb-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[task.status]}`}>
                    {statusLabels[task.status]}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
                    {task.priority}
                </span>
            </div>

            {task.due_date && (
                <p className="text-xs text-gray-500">
                    Due: {new Date(task.due_date).toLocaleDateString()}
                </p>
            )}
        </div>
    );
};

export default TaskCard;