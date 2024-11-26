import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

interface TodoInputProps {
  onAddTodo: (text: string, category: string) => void;
  activeCategory: string;
}

const TodoInput: React.FC<TodoInputProps> = ({ onAddTodo, activeCategory }) => {
  const [newTodo, setNewTodo] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    
    onAddTodo(newTodo.trim(), activeCategory);
    setNewTodo('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 rounded-lg border-2 border-purple-100 px-4 py-3 text-gray-700 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all"
        />
        <button
          type="submit"
          className="bg-purple-600 text-white px-6 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all flex items-center gap-2"
        >
          <PlusCircle className="h-5 w-5" />
          Add
        </button>
      </div>
    </form>
  );
};

export default TodoInput;