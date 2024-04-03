import pool from '../db/index';
import { Book } from '../entities/book.entity';

export const createBook = async (book: Book): Promise<any> => {
    const query = 'INSERT INTO books (title, writer, cover_image, point, tags) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [book.title, book.writer, book.coverImage, book.point, book.tags];
    const result = await pool.query(query);
    return result.rows[0];
};

export const getBookById = async (bookId: number): Promise<Book | null> => {
    const query = 'SELECT * FROM books WHERE id = $1';
    const result = await pool.query(query, [bookId]);
    return result.rows.length ? result.rows[0] : null;
};

export const updateBook = async (bookId: number, book: Book): Promise<any | null> => {
    const query = 'UPDATE books SET title = $1, writer = $2, cover_image = $3, point = $4, tags = $5 WHERE id = $6 RETURNING *';
    const values = [book.title, book.writer, book.coverImage, book.point, book.tags, bookId];
    const result = await pool.query(query);
    return result.rows.length ? result.rows[0] : null;
};

export const deleteBook = async (bookId: number): Promise<void> => {
    const query = 'DELETE FROM books WHERE id = $1';
    await pool.query(query, [bookId]);
};

export const listBooks = async (page: number, limit: number): Promise<Book[]> => {
    const offset = (page - 1) * limit;
    const query = 'SELECT * FROM books ORDER BY id OFFSET $1 LIMIT $2';
    const result = await pool.query(query, [offset, limit]);
    return result.rows;
};
