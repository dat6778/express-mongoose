import Order from '../models/order.model';

class OrderService {
    async getAll() {
        return await Order.find().populate('customerId').populate('items.productId');
    }

    async getById(id: string) {
        return await Order.findById(id).populate('customerId').populate('items.productId');
    }

    async create(data: any) {
        const order = new Order(data);
        return await order.save();
    }

    async updateById(id: string, data: any) {
        return await Order.findByIdAndUpdate(id, data, { new: true })
            .populate('customerId')
            .populate('items.productId');
    }

    async deleteById(id: string) {
        return await Order.findByIdAndDelete(id);
    }

    // Order Items methods
    async addOrderItem(orderId: string, itemData: any) {
        return await Order.findByIdAndUpdate(
            orderId,
            { $push: { items: itemData } },
            { new: true }
        ).populate('customerId').populate('items.productId');
    }

    async removeOrderItem(orderId: string, itemId: string) {
        return await Order.findByIdAndUpdate(
            orderId,
            { $pull: { items: { _id: itemId } } },
            { new: true }
        ).populate('customerId').populate('items.productId');
    }

    async updateOrderItem(orderId: string, itemId: string, itemData: any) {
        return await Order.findOneAndUpdate(
            { _id: orderId, 'items._id': itemId },
            { $set: { 'items.$': itemData } },
            { new: true }
        ).populate('customerId').populate('items.productId');
    }
}

export default new OrderService();