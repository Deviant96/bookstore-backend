import * as userRepository from '../repositories/user.repository';
import { User } from '../entities/user.entity';

export const registerUser = async (username: string, password: string): Promise<User> => {
    const userExists = await userRepository.findUserByUsername(username);
    if (userExists) {
        throw new Error('User already exists');
    }
    const newUser = await userRepository.createUser(username, password);
    return newUser;
};

export const loginUser = async (username: string, password: string): Promise<User> => {
    const user = await userRepository.findUserByUsername(username);
    if (!user || user.password !== password) {
        throw new Error('Invalid credentials');
    }
    return user;
};

export const getCurrentUserData = async (id: number): Promise<User | null> => {
    return await userRepository.findUserById(id);
};