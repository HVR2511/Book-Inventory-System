import { useEffect, useState } from "react";
import { getBooks, deleteBook } from "../services/BookApi";
import { Link } from "react-router-dom";
import { Search, Eye, Edit2, Trash2, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 5;

  useEffect(() => {
    getBooks().then(setBooks);
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      await deleteBook(id);
      setBooks(books.filter(b => b.id !== id));
    }
  };

  const filtered = books.filter(b =>
    b.title.toLowerCase().includes(search.toLowerCase())
  );

  const paginated = filtered.slice((page-1)*perPage, page*perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-8 h-8 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-800">Book Library</h1>
          </div>
          <p className="text-gray-600">Manage your collection of books</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm"
            placeholder="Search books by title..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Stats */}
        <div className="mb-6 flex gap-4">
          <div className="bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-100">
            <span className="text-sm text-gray-600">Total Books: </span>
            <span className="font-semibold text-indigo-600">{books.length}</span>
          </div>
          <div className="bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-100">
            <span className="text-sm text-gray-600">Showing: </span>
            <span className="font-semibold text-indigo-600">{filtered.length}</span>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                  <th className="px-6 py-4 text-left font-semibold">Title</th>
                  <th className="px-6 py-4 text-left font-semibold">Author</th>
                  <th className="px-6 py-4 text-center font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginated.length > 0 ? (
                  paginated.map(b => (
                    <tr key={b.id} className="hover:bg-indigo-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-medium text-gray-800">{b.title}</span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{b.author}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <Link 
                            to={`/book/${b.id}`} 
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium text-sm"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </Link>
                          <Link 
                            to={`/edit/${b.id}`} 
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-medium text-sm"
                          >
                            <Edit2 className="w-4 h-4" />
                            Edit
                          </Link>
                          <button 
                            onClick={() => handleDelete(b.id)} 
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium text-sm"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-6 py-12 text-center text-gray-500">
                      <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p className="text-lg">No books found</p>
                      <p className="text-sm">Try adjusting your search</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {paginated.length > 0 && (
            <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-100">
              <div className="text-sm text-gray-600">
                Page <span className="font-semibold">{page}</span> of <span className="font-semibold">{totalPages}</span>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setPage(p => Math.max(p-1,1))}
                  disabled={page === 1}
                  className="inline-flex items-center gap-1 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium text-sm shadow-sm"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
                <button 
                  onClick={() => setPage(p => p+1)}
                  disabled={page >= totalPages}
                  className="inline-flex items-center gap-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium text-sm shadow-sm"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}