const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/rentalDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected')).catch(err => console.log(err));

const carSchema = new mongoose.Schema({
    car: String,
    image: String,
    owner: String,
    prize: String,
    contact: String,
    ownerEmail: String
});

const userSchema = new mongoose.Schema({
    gmail: String,
    profile: String,
    password: String,
    username: String
});

const Car = mongoose.model('Car', carSchema);
const User = mongoose.model('User', userSchema);

app.post('/addCar', async (req, res) => {
    const newCar = new Car(req.body);
    await newCar.save();
    res.send('Car added successfully');
});

app.post('/addUser', async (req, res) => {
    const newUser = new User(req.body);
    await newUser.save();
    res.send('User added successfully');
});

app.get('/cars', async (req, res) => {
    const cars = await Car.find();
    res.json(cars);
});

app.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
