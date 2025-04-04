import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import campaignRoutes from "./routes/campaignRoutes";
import messageRoutes from "./routes/messageRoutes";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({
  origin: "*",  
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.get("/", (req, res) => {
  res.send("Server is running...");
});


app.use("/campaigns", campaignRoutes)
app.use("/messages", messageRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});