const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Temporary data storage
// Later this could be replaced with a database.
let users = [];
let blogs = [];

// ================================
// HOME
// ================================
app.get("/", (req, res) => {
    res.send("BlogSpace Backend Server is Running!");
});


// ================================
// REGISTER API
// ================================
app.post("/api/register", (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Please complete all fields."
        });
    }

    const existingUser = users.find(
        user => user.email === email
    );

    if (existingUser) {
        return res.status(400).json({
            message: "User already exists."
        });
    }

    const newUser = {
        id: Date.now(),
        name,
        email,
        password
    };

    users.push(newUser);

    res.status(201).json({
        message: "Registration successful!",
        user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
        }
    });
});


// ================================
// LOGIN API
// ================================
app.post("/api/login", (req, res) => {

    const { email, password } = req.body;

    const user = users.find(
        user =>
            user.email === email &&
            user.password === password
    );

    if (!user) {
        return res.status(401).json({
            message: "Incorrect email or password."
        });
    }

    res.json({
        message: "Login successful!",
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    });
});


// ================================
// CREATE BLOG API
// ================================
app.post("/api/blogs", (req, res) => {

    const {
        title,
        category,
        description,
        content,
        tags
    } = req.body;

    if (!title || !category || !content) {
        return res.status(400).json({
            message: "Title, category and content are required."
        });
    }

    const newBlog = {
        id: Date.now(),
        title,
        category,
        description,
        content,
        tags,
        date: new Date().toLocaleDateString(),
        views: 0,
        likes: 0
    };

    blogs.unshift(newBlog);

    res.status(201).json({
        message: "Blog created successfully!",
        blog: newBlog
    });
});
// ================================
// GET ALL USERS
// ================================

app.get("/api/users", (req, res) => {
    res.json(users);
});


// ================================
// GET ALL BLOGS
// ================================

app.get("/api/blogs", (req, res) => {
    res.json(blogs);
});
// ================================
// DELETE BLOG
// ================================
app.delete("/api/blogs/:id", (req, res) => {

    const id = Number(req.params.id);

    blogs = blogs.filter(
        blog => blog.id !== id
    );

    res.json({
        message: "Blog deleted successfully!"
    });
});


// ================================
// START SERVER
// ================================
app.listen(PORT, () => {
    console.log(
        `BlogSpace server running on http://localhost:${PORT}`
    );
});