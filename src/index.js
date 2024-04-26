import dotenv from 'dotenv'
import connectDB from './database/index.js'
import express from 'express'
// const app = express();

dotenv.config({
    path: './env'
}
)
connectDB();
// const port = process.env.PORT || 5000
// app.listen(port, ()=>{
//     console.log(`server listen at ${port}`);
// })

