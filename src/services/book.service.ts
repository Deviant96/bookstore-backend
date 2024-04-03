import * as bookRepository from '../repositories/book.repository';
import { Book } from '../entities/book.entity';

export const createBook = async (book: Book): Promise<Book> => {
    return await bookRepository.createBook(book);
};

export const getBookById = async (bookId: number): Promise<Book | null> => {
    return await bookRepository.getBookById(bookId);
};

export const updateBook = async (bookId: number, book: Book): Promise<Book | null> => {
    return await bookRepository.updateBook(bookId, book);
};

export const deleteBook = async (bookId: number): Promise<void> => {
    return await bookRepository.deleteBook(bookId);
};

export const listBooks = async (page: number, limit: number): Promise<Book[]> => {
    return await bookRepository.listBooks(page, limit);
};