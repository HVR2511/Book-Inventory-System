import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBookById } from "../services/BookApi";
import { ArrowLeft, BookOpen, User, Mail, Calendar, Tag, FileText } from "lucide-react";

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    getBookById(id).then(setBook);
  }, [id]);

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
          <div className="bg-indigo-600 px-6 py-8 text-white">
            <div className="flex items-center gap-3 mb-3">
              <BookOpen className="w-8 h-8" />
              <h1 className="text-2xl font-bold">{book.title}</h1>
            </div>
            <div className="flex items-center gap-2 text-indigo-100">
              <User className="w-4 h-4" />
              <span>by {book.author}</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm font-medium">Email</span>
                </div>
                <a href={`mailto:${book.email}`} className="text-indigo-600 hover:underline">
                  {book.email}
                </a>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Author Age</p>
                <p className="text-lg font-semibold text-gray-800">{book.age} years</p>
              </div>

              {book.category && (
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Tag className="w-4 h-4" />
                    <span className="text-sm font-medium">Category</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-800">{book.category}</p>
                </div>
              )}

              {book.publishedYear && (
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">Published</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-800">{book.publishedYear}</p>
                </div>
              )}

              {book.price && (
                <div className="border border-gray-200 rounded-lg p-4 md:col-span-2">
                  <p className="text-sm text-gray-600 mb-1">Price</p>
                  <p className="text-2xl font-bold text-indigo-600">₹{book.price}</p>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-4 h-4 text-gray-600" />
                <h3 className="font-semibold text-gray-800">Description</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">{book.description}</p>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex gap-3">
              <Link
                to={`/edit/${book.id}`}
                className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-center font-medium"
              >
                Edit Book
              </Link>
              <Link
                to="/"
                className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors text-center font-medium"
              >
                Back to List
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}