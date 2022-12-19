import mongoose from "mongoose";

const connect = async ()=>{
    await mongoose.connect(process.env.MONGO_URI)
}

export default connect;