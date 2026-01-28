import { Link } from "react-router-dom";
import { BookOpen, Home, Plus } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">Book Inventory</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-3">
            <Link 
              to="/" 
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors font-medium"
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
            <Link 
              to="/addbook" 
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg transition-colors font-medium"
            >
              <Plus className="w-4 h-4" />
              Add Book
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}