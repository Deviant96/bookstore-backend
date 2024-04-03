import pool from '../db/index';
import { User } from '../entities/user.entity';

export const createUser = async (username: string, password: string): Promise<User> => {
    const query = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *';
    const values = [username, password];
    const result = await pool.query(query, values);
    return result.rows[0];
};

export const findUserByUsername = async (username: string): Promise<User | null> => {
    const query = 'SELECT * FROM users WHERE username = $1';
    const result = await pool.query(query, [username]);
    return result.rows.length ? result.rows[0] : null;
};

export const findUserById = async (userId: number): Promise<User | null> => {
    const query = 'SELECT * FROM users WHERE id = $1';
    const result = await pool.query(query, [userId]);
    return result.rows.length ? result.rows[0] : null;
};

export const updateUserPoints = async (userId: number, points: number): Promise<void> => {
    const query = 'UPDATE users SET points = $1 WHERE id = $2';
    const values = [points, userId];
    await pool.query(query, values);
};