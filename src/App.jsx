import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BookDetails from "./pages/BookDetails";
import EditBook from "./pages/EditBook";
import Navbar from "./components/Navbar";
import AddBook from "./components/AddBook";

function App() {

  return (
   <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addbook" element={<AddBook />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/edit/:id" element={<EditBook />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
