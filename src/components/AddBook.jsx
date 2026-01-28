import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { addBook } from "../services/BookApi";
import { ArrowLeft, BookOpen, User, Mail, Hash, FileText, Tag, Calendar, Plus, IndianRupeeIcon } from "lucide-react";

export default function AddBook() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    author: "",
    email: "",
    age: "",
    price: "",
    category: "",
    publishedYear: "",
    description: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const err = {};

    if (!form.title.trim()) err.title = "Title is required";
    if (!/^[A-Za-z ]+$/.test(form.author))
      err.author = "Author must contain only letters";
    if (!/^\S+@\S+\.\S+$/.test(form.email))
      err.email = "Invalid email address";
    if (!Number.isInteger(Number(form.age)) || form.age <= 0)
      err.age = "Age must be a valid number";
    if (form.price && isNaN(Number(form.price)))
      err.price = "Price must be a valid number";
    if (form.publishedYear && !Number.isInteger(Number(form.publishedYear)))
      err.publishedYear = "Year must be a valid number";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setLoading(true);
    try {
      await addBook(form);
      navigate("/");
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Failed to add book. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: "title", label: "Book Title", icon: BookOpen, type: "text", required: true },
    { name: "author", label: "Author Name", icon: User, type: "text", required: true },
    { name: "email", label: "Author Email", icon: Mail, type: "email", required: true },
    { name: "age", label: "Author Age", icon: Hash, type: "number", required: true },
    { name: "price", label: "Price (₹)", icon: IndianRupeeIcon, type: "number", required: false },
    { name: "category", label: "Category", icon: Tag, type: "text", required: false },
    { name: "publishedYear", label: "Published Year", icon: Calendar, type: "number", required: false },
    { name: "description", label: "Description", icon: FileText, type: "textarea", required: false }
  ];

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
              <Plus className="w-7 h-7" />
              <h1 className="text-2xl font-bold">Add New Book</h1>
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={submit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fields.map((field) => (
                <div 
                  key={field.name} 
                  className={field.type === "textarea" ? "md:col-span-2" : ""}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <field.icon className="w-4 h-4" />
                    </div>
                    {field.type === "textarea" ? (
                      <textarea
                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
                          errors[field.name] ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                        value={form[field.name]}
                        onChange={(e) =>
                          setForm({ ...form, [field.name]: e.target.value })
                        }
                        rows="4"
                      />
                    ) : (
                      <input
                        type={field.type}
                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
                          errors[field.name] ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                        value={form[field.name]}
                        onChange={(e) =>
                          setForm({ ...form, [field.name]: e.target.value })
                        }
                      />
                    )}
                  </div>
                  {errors[field.name] && (
                    <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-indigo-600 text-white px-4 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-5 h-5" />
                {loading ? "Adding..." : "Add Book"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/")}
                disabled={loading}
                className="flex-1 bg-gray-200 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}