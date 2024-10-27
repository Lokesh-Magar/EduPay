import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
message:String,
created:{
    type:Date,
    default:Date.now()
},
})

export default mongoose.models.NotifyModel || mongoose.model('NotifyModel',notificationSchema)