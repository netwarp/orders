<script>
    import axios from 'axios'

    async function refresh() {
        const response = await axios.get('/api/orders/refresh')
    }
</script>

<button type="button" class="btn btn-primary" on:click={refresh}>Refresh</button>