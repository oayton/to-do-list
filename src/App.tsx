import React, { useState, useEffect } from 'react';
import { ClipboardList } from 'lucide-react';
import Sidebar from './components/Sidebar';
import TodoList from './components/TodoList';
import TodoInput from './components/TodoInput';
import { Todo } from './types';

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string, category: string) => {
    setTodos([...todos, {
      id: crypto.randomUUID(),
      text,
      completed: false,
      category: category === 'all' || category === 'today' || category === 'completed' 
        ? 'personal' 
        : category,
      createdAt: new Date()
    }]);
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const updateCategory = (id: string, newCategory: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, category: newCategory } : todo
    ));
  };

  const filteredTodos = todos.filter(todo => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'today') {
      const today = new Date().toDateString();
      return new Date(todo.createdAt).toDateString() === today;
    }
    if (activeCategory === 'completed') return todo.completed;
    return todo.category === activeCategory;
  });

  const completedCount = filteredTodos.filter(todo => todo.completed).length;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      
      <main className="flex-1 p-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <ClipboardList className="h-6 w-6 text-purple-600" />
              {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Tasks
            </h1>
            <div className="text-sm text-gray-600">
              Completed: {completedCount} of {filteredTodos.length}
            </div>
          </div>

          <TodoInput onAddTodo={addTodo} activeCategory={activeCategory} />

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <TodoList
              todos={filteredTodos}
              onToggleTodo={toggleTodo}
              onDeleteTodo={deleteTodo}
              onUpdateCategory={updateCategory}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;