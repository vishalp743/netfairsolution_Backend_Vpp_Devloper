const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcrypt')
const app = express();
const PORT = process.env.PORT || 5000;

const User = require('./models/User');
const User1 = require('./models/User1');
const KYC = require('./models/Verification');
const Grievance = require('./models/Feedback');
const router = require('./routes/transectionRoutes');
// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
const dbURI = 'mongodb+srv://mandloishyam143:UcjvMom0ietmRYEX@cluster0.in4zhiw.mongodb.net/netfairsolution?retryWrites=true&w=majority';

mongoose.connect(dbURI, {})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));


app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  try {
    // Find user by email
    const user = await User.findOne({ email });
    console.log(user);


    if (!user) {
      // User not found
      return res.status(404).json({ message: 'User not found' });
    }

    console.log(password);
    console.log(user.password);

    // Compare passwords
    const isPasswordMatch = password === user.password;

    if (isPasswordMatch == false) {
      // Incorrect password
      console.log("OKOK");
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Passwords match
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error logging in:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});
app.get('/getUserEmails', async (req, res) => {
  try {
    console.log("isnide");
    // Find users where kycverification is false
    const users = await User1.find({ kycverification: false }, 'email');
    const emails = users.map((user) => user.email);
    res.status(200).json({ emails });
  } catch (error) {
    console.error('Error fetching user emails:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
app.get('/getKYCDetailsByEmail', async (req, res) => {
  const { email } = req.query;
  console.log(email);
  try {
    const kycDetails = await KYC.findOne({ email });

    if (!kycDetails) {
      return res.status(404).json({ message: 'KYC details not found for the provided email' });
    }
    res.status(200).json({ kycDetails });
  } catch (error) {
    console.error('Error fetching KYC details:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
app.post('/verifyKYC', async (req, res) => {
  const { email } = req.body;
  try {
    await User1.updateOne({ email }, { kycverification: true });
    const updatedKYCDetails = await User1.findOneAndUpdate({ email }, { kycverification: true });
    res.status(200).json({ kycDetails: updatedKYCDetails });
  } catch (error) {
    console.error('Error verifying KYC:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/grievances', async (req, res) => {
  try {
    const grievances = await Grievance.find();
    console.log(grievances);
    res.json(grievances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Resolve a grievance
app.put('/grievances/:id/resolve', async (req, res) => {
  try {
    const grievance = await Grievance.findById(req.params.id);
    if (!grievance) {
      return res.status(404).json({ message: 'Grievance not found' });
    }
    grievance.isRead = true;
    await grievance.save();
    res.json(grievance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.use(router)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
