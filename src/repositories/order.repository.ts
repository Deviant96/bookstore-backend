import pool from '../db/index';
import { Order } from '../entities/order.entity';

export const createOrder = async (userId: number, bookId: number, pointsSpent: number): Promise<Order> => {
    const query = 'INSERT INTO orders (user_id, book_id, points_spent) VALUES ($1, $2, $3) RETURNING *';
    const values = [userId, bookId, pointsSpent];
    const result = await pool.query(query, values);
    return result.rows[0];
};

export const cancelOrder = async (orderId: number): Promise<void> => {
    const query = 'DELETE FROM orders WHERE id = $1';
    await pool.query(query, [orderId]);
};

export const cancelUserOrder = async (userId: number, bookId: number): Promise<boolean | number> => {
    const query = 'DELETE FROM orders WHERE user_id = $1 AND book_id = $2';
    const result = await pool.query(query, [userId, bookId]);
    return result?.rowCount ?? 0 > 0;
};

export const getUserOrderByBookId = async (userId: number, bookId: number): Promise<Order | null> => {
    const query = 'SELECT * FROM orders WHERE user_id = $1 AND book_id = $2';
    const result = await pool.query(query, [userId, bookId]);
    return result.rows.length ? result.rows[0] : null;
};

export const getOrderById = async (orderId: number): Promise<Order | null> => {
    const query = 'SELECT * FROM orders WHERE id = $1';
    const result = await pool.query(query, [orderId]);
    return result.rows.length ? result.rows[0] : null;
};

export const listOrders = async (userId: number, limit: number, offset: number): Promise<Order[]> => {
    const query = 'SELECT * FROM orders WHERE user_id = $1 ORDER BY order_date DESC LIMIT $2 OFFSET $3';
    const values = [userId, limit, offset];
    const result = await pool.query(query, values);
    return result.rows;
};