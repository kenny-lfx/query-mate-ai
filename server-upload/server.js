import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer"; // Import multer
import chat from "./chat.js";

dotenv.config();

const app = express();
app.use(cors());

// Configure multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
}); // 存在那里面
const upload = multer({ storage: storage }); // 定义multer行为

const PORT = process.env.PORT || 8080;

let filePath;

app.get("/", (req, res) => {
  res.send("healthy");
});

app.post("/upload", upload.single("file"), async (req, res) => {
  // Use multer to handle file upload
  // 中间这个叫middleware，就是在最后reqres之前需要进行的操作
  filePath = req.file.path; // The path where the file is temporarily saved
  res.send(filePath + " upload successfully.");
});

app.get("/chat", async (req, res) => {
  const resp = await chat(filePath, req.query.question); // Pass the file path to your main function
  res.send(resp.text);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
