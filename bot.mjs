class Bot {
    baseUrl = 'http://127.0.0.1:8080'

    constructor() {

    }

    async refreshDatabase() {
        try {
            const url = `${this.baseUrl}/api/orders/refresh`
            await fetch(url)
            console.log('\x1b[32m', 'database refreshed successfully' ,'\x1b[0m')
        } catch (error) {
            console.log('\x1b[31m', 'error: database not refreshed' ,'\x1b[0m')
        }
    }

    async getLatestOrderFromDatabase() {
        try {
            const url = `${this.baseUrl}/api/orders/latest`
            const response = await fetch(url)
            const data = await response.json()
            return data
        } catch (error) {
            console.log('\x1b[31m', 'error: latest record not loader' ,'\x1b[0m')
        }
    }

    async getPendingOrdersFromDatabase() {
        try {
            const url = `${this.baseUrl}/api/orders/pending`
            const response = await fetch(url)
            const data = response.json()
            return data
        } catch (error) {
            console.log('\x1b[31m', 'error: pending orders not found' ,'\x1b[0m')
        }
    }

    async prefill(side) {
        try {
            const url = `${this.baseUrl}/api/orders/prefill?type=${side}`
            const response = await fetch(url)
            const data = response.json()
            return data
        } catch (error) {
            console.log('\x1b[31m', 'error: pending orders not found' ,'\x1b[0m')
        }
    }

    async runOrder(side, quantity = 0.01) {
        const priceMarket = await this.prefill(side)

        try {
            const url = `${this.baseUrl}/api/orders/post-order`
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    type: side,
                    price: priceMarket,
                    quantity
                })
            })
        } catch (error) {
            console.log('\x1b[31m', 'error: order not passed' ,'\x1b[0m')
        }
    }

    async runOnce() {

        await this.refreshDatabase()

        const pendingOrdersFromDatabase = await this.getPendingOrdersFromDatabase()
        const latestOrderFromDatabase = await this.getLatestOrderFromDatabase()

        if ( ! pendingOrdersFromDatabase.length && latestOrderFromDatabase.type === 'sell') {
            console.log('\x1b[36m', 'starting new cycle' ,'\x1b[0m')
            await this.runOrder('buy', 0.01)
            console.log('\x1b[32m', 'order buy passed successfully' ,'\x1b[0m')
            return
        }

        if ( pendingOrdersFromDatabase?.[0]?.type === 'buy' && latestOrderFromDatabase.type === 'buy') {
            console.log('\x1b[36m', 'order buy pending, nothing to do' ,'\x1b[0m')
            return
        }

        if ( ! pendingOrdersFromDatabase.length && latestOrderFromDatabase.type === 'buy') {
            console.log('\x1b[36m', 'order buy completed, run order sell soon' ,'\x1b[0m')
            await this.runOrder('sell', 0.01)
            console.log('\x1b[32m', 'order sell passed successfully' ,'\x1b[0m')
            return
        }

        if ( pendingOrdersFromDatabase?.[0]?.type === 'sell' && latestOrderFromDatabase.type === 'sell') {
            console.log('\x1b[36m', 'order sell pending, nothing to do' ,'\x1b[0m')
        }
    }


    async run(loop) {
        if (loop)
            setInterval(async () => await this.runOnce(), 1000 * 60 * 1)
        else
            await this.runOnce()
    }
}

const bot = new Bot()
await bot.run(false)