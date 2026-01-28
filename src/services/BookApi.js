const BASE_URL = "http://localhost:3001/books";

// GET all books
export const getBooks = async () => {
  const res = await fetch(BASE_URL);

  if (!res.ok) {
    throw new Error("Failed to fetch books");
  }

  return res.json();
};

// GET book by ID
export const getBookById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);

  if (!res.ok) {
    throw new Error("Book not found");
  }

  return res.json();
};

// UPDATE book
export const updateBook = async (id, book) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });

  if (!res.ok) {
    throw new Error("Failed to update book");
  }

  return res.json();
};

// DELETE book
export const deleteBook = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete book");
  }

  return true;
};

export const addBook = async (book) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });

  if (!res.ok) {
    throw new Error("Failed to add book");
  }

  return res.json();
};
