import React, { useState } from 'react';
import { CheckCircle2, Circle, Trash2, ChevronDown } from 'lucide-react';
import { Todo } from '../types';

interface TodoListProps {
  todos: Todo[];
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
  onUpdateCategory: (id: string, category: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ 
  todos, 
  onToggleTodo, 
  onDeleteTodo,
  onUpdateCategory 
}) => {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const categories = [
    { id: 'work', label: 'Work' },
    { id: 'personal', label: 'Personal' },
    { id: 'shopping', label: 'Shopping' },
  ];

  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No tasks found in this category.</p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-100">
      {todos.map(todo => (
        <li
          key={todo.id}
          className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors group"
        >
          <button
            onClick={() => onToggleTodo(todo.id)}
            className="text-gray-400 hover:text-purple-600 transition-colors"
          >
            {todo.completed ? (
              <CheckCircle2 className="h-6 w-6 text-green-500" />
            ) : (
              <Circle className="h-6 w-6" />
            )}
          </button>
          <span
            className={`flex-1 ${
              todo.completed
                ? 'text-gray-400 line-through'
                : 'text-gray-700'
            }`}
          >
            {todo.text}
          </span>
          
          <div className="relative">
            <button
              onClick={() => setOpenDropdownId(openDropdownId === todo.id ? null : todo.id)}
              className="flex items-center gap-1 px-2 py-1 text-sm text-gray-500 hover:text-gray-700 rounded transition-colors"
            >
              {todo.category}
              <ChevronDown className="h-4 w-4" />
            </button>
            
            {openDropdownId === todo.id && (
              <div className="absolute right-0 mt-1 w-36 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => {
                      onUpdateCategory(todo.id, category.id);
                      setOpenDropdownId(null);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-purple-50 transition-colors ${
                      category.id === todo.category
                        ? 'text-purple-600 font-medium'
                        : 'text-gray-700'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => onDeleteTodo(todo.id)}
            className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;