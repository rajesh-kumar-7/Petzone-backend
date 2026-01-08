import mongoose from 'mongoose'
const petSchema = new mongoose.Schema({
    petName:String,
    type:String,
    desc:String,
    contact:String,
    location:String,
    image:String,
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
})
const petModel = mongoose.model('pet',petSchema)
export default petModel