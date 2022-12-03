import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import Transaction from './models/Transaction.js';
import mongoURI from './mongoURI.js';

const PORT = 4000;
const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

await mongoose.connect(mongoURI)
console.log("MongoDB connected successfully")

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.get('/transaction', async (req, res) => {
    const transaction = await Transaction.find({}).sort({createdAt: -1})
    res.json({data:transaction})
})

app.post('/transaction', async (req, res) => {
    const {amount,description,date} = req.body;
    const transaction = new Transaction({
        amount: amount,
        description: description,
        date: date,
    })
    await transaction.save();
    res.json({message:'Success'});
})

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})
