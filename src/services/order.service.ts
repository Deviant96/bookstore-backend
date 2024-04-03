import * as orderRepository from '../repositories/order.repository';
import * as userRepository from '../repositories/user.repository';
import { Order } from '../entities/order.entity';

export const placeOrder = async (userId: number, bookId: number, pointsSpent: number): Promise<Order> => {
    const user = await userRepository.findUserById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    if (user.points < pointsSpent) {
        throw new Error('Insufficient points');
    }

    const remainingPoints = user.points - pointsSpent;
    await userRepository.updateUserPoints(userId, remainingPoints);

    const order = await orderRepository.createOrder(userId, bookId, pointsSpent);

    return order;
};

export const cancelOrder = async (userId: number, bookId: number): Promise<boolean | number> => {
    const userOrder = await orderRepository.getUserOrderByBookId(userId, bookId);
    if (!userOrder) {
        throw new Error('Order not found');
    }
    const order = await orderRepository.cancelUserOrder(userId, bookId);

    return order;
};

export const getOrderDetails = async (orderId: number): Promise<Order | null> => {
    const order = await orderRepository.getOrderById(orderId);
    return order;
};

export const listOrders = async (userId: number, limit: number, offset: number): Promise<Order[]> => {
    const orders = await orderRepository.listOrders(userId, limit, offset);
    return orders;
};