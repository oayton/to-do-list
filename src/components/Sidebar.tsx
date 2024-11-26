import React from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  CheckCircle2, 
  Briefcase, 
  User, 
  ShoppingCart,
  Plus
} from 'lucide-react';

interface SidebarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeCategory, onCategoryChange }) => {
  const filters = [
    { id: 'all', label: 'All Tasks', icon: LayoutDashboard },
    { id: 'today', label: "Today's Tasks", icon: Calendar },
    { id: 'completed', label: 'Completed', icon: CheckCircle2 },
  ];

  const categories = [
    { id: 'work', label: 'Work', icon: Briefcase },
    { id: 'personal', label: 'Personal', icon: User },
    { id: 'shopping', label: 'Shopping', icon: ShoppingCart },
  ];

  return (
    <aside className="bg-white w-64 min-h-screen border-r border-gray-200 flex flex-col">
      <div className="p-4">
        <h1 className="text-xl font-bold text-gray-800 mb-6">TaskMaster</h1>
      </div>

      <nav className="flex-1">
        <div className="px-3 mb-6">
          <h2 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Filters
          </h2>
          {filters.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onCategoryChange(id)}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg mb-1 transition-colors ${
                activeCategory === id
                  ? 'bg-purple-50 text-purple-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>

        <div className="px-3">
          <div className="flex items-center justify-between px-3 mb-2">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Categories
            </h2>
            <button className="text-gray-400 hover:text-purple-600 transition-colors">
              <Plus className="h-4 w-4" />
            </button>
          </div>
          {categories.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onCategoryChange(id)}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg mb-1 transition-colors ${
                activeCategory === id
                  ? 'bg-purple-50 text-purple-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
            <User className="h-4 w-4 text-purple-700" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-700">John Doe</p>
            <p className="text-xs text-gray-500">john@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;