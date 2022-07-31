import Order from '../../models/Order.mjs'
import tradeOgre from "../../services/tradeogre.mjs"

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

    console.log(request.body)

    const orderDB = {
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

    const orderMarket =  await tradeOgre[type](marketParams.market, marketParams.quantity, marketParams.price)

    if (orderMarket.success) {
        orderDB.success = true
        orderDB.uuid = orderMarket.uuid
    }

    await Order.create(orderDB)

    response.json(orderDB)
}

export async function refresh(request, response) {
    const orders = await Order.find({
        status: 'pending'
    })

    const ordersUpdated = []

    for await (const order of orders) {
        let stillPending = await tradeOgre.order(order.uuid)
        stillPending = stillPending.success


        if ( ! stillPending) {
            await Order.findOneAndUpdate(
                {
                    uuid: order.uuid
                },
                {
                    status: 'completed'
                }
            )

            ordersUpdated.push(order)
        }
    }

    response.json(ordersUpdated)
}