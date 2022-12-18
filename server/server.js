import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import TransactionsApi from './routes/TransactionsApi.js'
import connect from './database/mongodb.js'
import AuthApi from "./routes/AuthApi.js"

const PORT = 4000;
const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/transaction",TransactionsApi)
app.use("/auth",AuthApi)

await connect();
console.log("MongoDB connected successfully")

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})
