import dotenv from 'dotenv'
import connectDB from './database/index.js'

import { app } from './app.js';


dotenv.config({
    path: './env'
}
)
connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(` Server listen at port : ${process.env.PORT}`);
    })
})
.catch((err)=>{
console.log("Mongo db connection failed !!! " , err);
})
// const port = process.env.PORT || 5000
// app.listen(port, ()=>{
//     console.log(`server listen at ${port}`);
// })

