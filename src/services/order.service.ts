import Order from '../models/order.model';
import createError from 'http-errors';

class OrderService {
    async getAll() {
        return await Order.find()
            .populate('customerId')
            .populate('items.productId');
    }

    async getById(id: string) {
        const order = await Order.findById(id)
            .populate('customerId')
            .populate('items.productId');
        if (!order) {
            throw createError(404, 'Order not found');
        }
        return order;
    }

    async create(data: any) {
        const order = new Order(data);
        return await order.save();
    }

    async updateById(id: string, data: any) {
        const order = await Order.findByIdAndUpdate(id, data, { new: true })
            .populate('customerId')
            .populate('items.productId');
        if (!order) {
            throw createError(404, 'Order not found');
        }
        return order;
    }

    async deleteById(id: string) {
        const order = await Order.findByIdAndDelete(id);
        if (!order) {
            throw createError(404, 'Order not found');
        }
        return order;
    }

    async addOrderItem(orderId: string, itemData: any) {
        const order = await Order.findByIdAndUpdate(
            orderId,
            { $push: { items: itemData } },
            { new: true }
        ).populate('customerId').populate('items.productId');
        if (!order) {
            throw createError(404, 'Order not found');
        }
        return order;
    }

    async removeOrderItem(orderId: string, itemId: string) {
        const order = await Order.findByIdAndUpdate(
            orderId,
            { $pull: { items: { _id: itemId } } },
            { new: true }
        ).populate('customerId').populate('items.productId');
        if (!order) {
            throw createError(404, 'Order not found');
        }
        return order;
    }

    async updateOrderItem(orderId: string, itemId: string, itemData: any) {
        const order = await Order.findOneAndUpdate(
            { _id: orderId, 'items._id': itemId },
            { $set: { 'items.$': itemData } },
            { new: true }
        ).populate('customerId').populate('items.productId');
        if (!order) {
            throw createError(404, 'Order or item not found');
        }
        return order;
    }
}

export default new OrderService();