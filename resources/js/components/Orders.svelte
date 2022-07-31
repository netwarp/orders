<script>
    export let type

    import {onMount} from 'svelte'
    import axios from 'axios'

    let orders = []
    let quantity = ''
    let price = ''

    onMount(async () => {
        const response = await axios.get(`/api/orders`, {
            params: {
                type
            }
        })

        const data = await response.data

        orders = data
    })

    async function handleForm() {

        const response = await axios.post('/api/post-order', {
            type,
            quantity,
            price,
        })

        const data = response.data

        console.log(data)

        quantity = ''
        price = ''
    }
</script>


<div class="my-4 bg-white p-4 rounded">
    <h3>{type}</h3>
    <form on:submit|preventDefault={handleForm}>
        <div class="row">
            <div class="col">
                <input type="text" class="form-control" placeholder="quantity" bind:value={quantity}>
            </div>
            <div class="col">
                <input type="text" class="form-control" placeholder="price" bind:value={price}>
            </div>
            <div class="col">
                <button type="submit" class="btn btn-primary">Ok</button>
            </div>
        </div>
    </form>
</div>

<table class="table table-bordered table-striped bg-white">
    <thead>
        <tr>
            <th>Quantity</th>
            <th>Price</th>
            <th>Status</th>
        </tr>
    </thead>
    <tbody>
        {#each orders as order}
            <tr>
                <td>{order.quantity}</td>
                <td>{order.price}</td>
                <td>{order.status}</td>
            </tr>
        {/each}
    </tbody>
</table>