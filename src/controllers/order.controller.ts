import { Request, Response } from 'express';
import * as orderService from '../services/order.service';

export const placeOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, bookId, pointsSpent } = req.body;
        if(!bookId) { throw new Error("Book ID cannot be empty."); }
        
        const order = await orderService.placeOrder(parseInt(userId), parseInt(bookId), parseInt(pointsSpent));
        res.status(201).json(order);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const cancelOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, bookId } = req.body;
        const order = await orderService.cancelOrder(parseInt(userId), parseInt(bookId));
        res.status(200).json(order);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getOrderDetails = async (req: Request, res: Response): Promise<void> => {
    try {
        const { orderId } = req.params;
        const order = await orderService.getOrderDetails(parseInt(orderId));
        res.status(200).json(order);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const listOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.body;
        const { limit, offset } = req.query;
        if(!userId) { throw new Error("userId cannot be empty."); }
        if(!limit) { throw new Error("limit cannot be empty."); }
        if(!offset) { throw new Error("offset cannot be empty."); }
        
        const orders = await orderService.listOrders(parseInt(userId), parseInt(limit as string), parseInt(offset as string));
        res.status(200).json(orders);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};