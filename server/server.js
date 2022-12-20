import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connect from './database/mongodb.js'
import passport from 'passport';
import passportConfig from './config/passport.js';
import * as dotenv from 'dotenv';
import routes from "./routes/index.js"

dotenv.config();
const PORT = 4000;
const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/",routes)

app.use(passport.initialize())
passportConfig(passport);

await connect();
console.log("MongoDB connected successfully")

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})
