import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBookById, updateBook } from "../services/BookApi";
import { ArrowLeft, Save, BookOpen } from "lucide-react";

export default function EditBook() {
  const { id } = useParams();
  const nav = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getBookById(id).then(setBook);
  }, [id]);

  const save = async () => {
    setLoading(true);
    await updateBook(id, book);
    nav("/");
  };

  if (!book) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-3"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const fieldLabels = {
    title: "Book Title",
    author: "Author Name",
    email: "Author Email",
    age: "Author Age",
    price: "Price (₹)",
    category: "Category",
    publishedYear: "Published Year",
    description: "Description"
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Library
        </Link>

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-indigo-600 px-6 py-6 text-white">
            <div className="flex items-center gap-3">
              <BookOpen className="w-7 h-7" />
              <h1 className="text-2xl font-bold">Edit Book</h1>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6">
            <div className="space-y-4">
              {Object.keys(book).map(key => 
                key !== "id" && (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {fieldLabels[key] || key}
                    </label>
                    {key === "description" ? (
                      <textarea
                        value={book[key]}
                        onChange={e => setBook({ ...book, [key]: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        rows="4"
                      />
                    ) : (
                      <input
                        type={key === "age" || key === "price" || key === "publishedYear" ? "number" : key === "email" ? "email" : "text"}
                        value={book[key]}
                        onChange={e => setBook({ ...book, [key]: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      />
                    )}
                  </div>
                )
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={save}
                disabled={loading}
                className="flex-1 bg-indigo-600 text-white px-4 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-5 h-5" />
                {loading ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={() => nav("/")}
                className="flex-1 bg-gray-200 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}