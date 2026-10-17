const { Book } = require("../models");

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

module.exports = { createBook };
