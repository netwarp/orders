<script>
    import Orders from './Orders'
    import Refresh from './Refresh'
</script>

<div class="container mt-5">
    <div class="row">
        <div class="col my-3">
            <Refresh />
        </div>
    </div>
    <div class="row">
        <div class="col">
            <Orders type="buy" />
        </div>
        <div class="col">
            <Orders type="sell" />
        </div>
    </div>
</div>