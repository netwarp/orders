import Order from '../../models/Order.mjs'
import tradeOgre from "../../services/tradeogre.mjs";
import tradeogre from "../../services/tradeogre.mjs";

export async function orders(request, response) {

    const type = request.query.type

    const orders = await Order.find({
        type
    })

    response.json(orders)
}

export async function postOrder(request, response) {
    const type = request.body.type
    const price = request.body.price
    const quantity = request.body.quantity

    const order = {
        type,
        price,
        quantity,
        success: false,
        uuid: null,
        status: 'pending'
    }

    const marketParams = {
        market: 'BTC-XMR',
        quantity,
        price
    }

    if (type === 'buy') {

    }

    response.json({
        price,
        quantity
    })
}