const { Book, Category } = require("../models");

const createBook = async (req, res) => {
  try {
    const {
      title,
      author,
      isbn,
      description,
      publisher,
      publishedYear,
      price,
      totalCopies,
      availableCopies,
      categoryId,
    } = req.body;

    // Check duplicate ISBN
    const existingBook = await Book.findOne({
      where: { isbn: isbn },
    });

    if (existingBook) {
      return res.status(409).json({
        message: "This ISBN is already registered!",
      });
    }

    const copies = totalCopies === undefined ? 1 : totalCopies;

    const available = availableCopies === undefined ? copies : availableCopies;

    if (available > copies) {
      return res.status(400).json({
        message: "Available copies cannot exceed total copies!",
      });
    }

    const category = await Category.findOne({ where: { id: categoryId } });

    if (!category) {
      return res.status(404).json({
        message: "Category not found!",
      });
    }

    const book = await Book.create({
      title,
      author,
      isbn,
      description,
      publisher,
      publishedYear,
      price,
      totalCopies: copies,
      availableCopies: available,
      categoryId: categoryId,
    });

    return res.status(201).json({
      message: "Book created successfully!",
      book: book,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll({
      include: [
        {
          model: Category,
        },
      ],
    });

    return res.status(200).json({
      message: "Books fetched successfully!",
      totalBooks: books.length,
      books: books,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const getSingleBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findOne({
      where: { id: id },
      include: [
        {
          model: Category,
        },
      ],
    });

    if (!book) {
      return res.status(404).json({
        message: "Book not found!",
      });
    }

    return res.status(200).json({
      message: "Book fetched successfully!",
      book: book,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      author,
      isbn,
      description,
      publisher,
      publishedYear,
      price,
      totalCopies,
      availableCopies,
      categoryId,
    } = req.body;

    const book = await Book.findOne({
      where: { id: id },
    });

    if (!book) {
      return res.status(404).json({
        message: "Book not found!",
      });
    }

    if (isbn !== undefined) {
      const existingBook = await Book.findOne({
        where: { isbn: isbn },
      });

      if (existingBook && existingBook.id !== book.id) {
        return res.status(409).json({
          message: "This ISBN is already registered!",
        });
      }
    }

    if (categoryId !== undefined) {
      const category = await Category.findOne({
        where: { id: categoryId },
      });

      if (!category) {
        return res.status(404).json({
          message: "Category not found!",
        });
      }
    }

    const updatedTotal =
      totalCopies === undefined ? book.totalCopies : totalCopies;

    const updatedAvailable =
      availableCopies === undefined ? book.availableCopies : availableCopies;

    if (updatedAvailable > updatedTotal) {
      return res.status(400).json({
        message: "Available copies cannot exceed total copies!",
      });
    }

    await book.update({
      title: title === undefined ? book.title : title,
      author: author === undefined ? book.author : author,
      isbn: isbn === undefined ? book.isbn : isbn,
      description: description === undefined ? book.description : description,
      publisher: publisher === undefined ? book.publisher : publisher,
      publishedYear:
        publishedYear === undefined ? book.publishedYear : publishedYear,
      price: price === undefined ? book.price : price,
      totalCopies: updatedTotal,
      availableCopies: updatedAvailable,
      categoryId: categoryId === undefined ? book.categoryId : categoryId,
    });

    return res.status(200).json({
      message: "Book updated successfully!",
      book: book,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findOne({
      where: { id: id },
    });

    if (!book) {
      return res.status(404).json({
        message: "Book not found!",
      });
    }

    await book.destroy();

    return res.status(200).json({
      message: "Book deleted successfully!",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

module.exports = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
