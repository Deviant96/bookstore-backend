import { Request, Response } from 'express';
import * as bookService from '../services/book.service';
import { Book } from '../entities/book.entity';

export const createBook = async (req: Request, res: Response): Promise<void> => {
    try {
        const book = req.body as Book;
        const newBook = await bookService.createBook(book);
        res.status(201).json(newBook);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getBookById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const bookId = parseInt(id);
        const book = await bookService.getBookById(bookId);
        if (!book) {
            res.status(404).json({ message: 'Book not found' });
        } else {
            res.status(200).json(book);
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateBook = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const bookId = parseInt(id);
        const book = req.body as Book;
        const updatedBook = await bookService.updateBook(bookId, book);
        if (!updatedBook) {
            res.status(404).json({ message: 'Book not found' });
        } else {
            res.status(200).json(updatedBook);
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteBook = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const bookId = parseInt(id);
        await bookService.deleteBook(bookId);
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const listBooks = async (req: Request, res: Response): Promise<void> => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const books = await bookService.listBooks(page, limit);
        res.status(200).json(books);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
