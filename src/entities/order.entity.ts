export interface Order {
    id: number;
    user_id: number;
    book_id: number;
    points_spent: number;
    order_date: Date;
}