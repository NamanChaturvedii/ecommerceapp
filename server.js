import express from "express"
const app = express();
import dotenv from "dotenv"
import morgan from "morgan"
dotenv.config()
import authRoutes from "./routes/auth.js";
import catagoryRoute from "./routes/categoryRoute.js"
import productRoute from "./routes/productRoutes.js"
import connectDB from "./config/db.js";
import cors from "cors"
import path from "path"
import {fileURLToPath} from 'url';
connectDB();


const PORT = process.env.PORT || 8000;
const __filename=fileURLToPath(import.meta.url);
const __dirname= path.dirname(__filename);


// rest api

// middle
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))
app.use(express.static("./client"));

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/category", catagoryRoute)
app.use("/api/v1/product", productRoute)



// app.get("/", (req, res) => {
//     res.send("<h1>Welcome to ecommerce app</h1>");
// });

app.get('*', function (req, res) {
    res.sendFile("./client/index.html"))
  });

app.listen(PORT, () => {
    console.log("running ")
})


