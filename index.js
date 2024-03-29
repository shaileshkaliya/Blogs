const express = require('express')
require('dotenv').config()
const app = express();
const connectDB = require('./Connect.js')
const userRouter = require('./Routes/user-routes.js')
const blogsRouter = require('./Routes/blog-routes.js')

const PORT = process.env.PORT;
const mongo_uri = process.env.Mongo_URI;

app.use(express.json());

app.get('/', (req,res,next) => {
    res.send("Hii, I'm live...")
})

app.use('/api/users/', userRouter);
app.use('/api/blogs/', blogsRouter);

async function start() {
    try {
        await connectDB(mongo_uri);
        console.log("Successfully connected to Database");
        app.listen(PORT, ()=>{
            console.log(`Connected to backend on PORT ${PORT}`);
        })  
    } catch (error) {
        return console.log("Internal error occured, ",error);
    }
}

start();