import mongoose from "mongoose";
import mongoURI from "../mongoURI.js"; // This is the mongoDB atlas connection url with username and password

async function connect (){
    await mongoose.connect(mongoURI)
}

export default connect;