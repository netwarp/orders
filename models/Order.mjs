import mongoose from 'mongoose'

const {Schema} = mongoose
const schema = new Schema({

}, {
    strict: false
})

export default mongoose.model('Order', schema)