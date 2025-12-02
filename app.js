import express from "express"
import path from "node:path";
import { fileURLToPath } from "node:url";

const PORT = 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

let app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname,"views/index.html"));  //change the location later after using ejs
})

app.get("/login", (req,res) => {
    res.sendFile(path.join(__dirname,"views/login.html"));
})

app.get("/register", (req,res) => {
    res.sendFile(path.join(__dirname,"views/register.html"));
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})