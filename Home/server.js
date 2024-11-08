const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const port = 3019;

const app = express();
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/MessageData', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.once('open', () => {
    console.log("Mongodb connection successful");
});

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    feedback: String
});

const User = mongoose.model("User", userSchema);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Home.html'));
});

app.post('/post', async (req, res) => {
    const { name, email, feedback } = req.body;

    const user = new User({
        name,
        email,
        feedback
    });
    
    await user.save();
    console.log(user);
    res.send("Form submitted successfully!");
});

app.listen(port, () => {
    console.log(`Server started on port ${port}.`);
});
