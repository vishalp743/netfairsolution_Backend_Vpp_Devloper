const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  website: {
    type: String,
  },
  mobilenumverification: {
    type: Boolean,
    default: false,
  },
  kycverification: {
    type: Boolean,
    default: false,
  },
  kycsubmission: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Specify the collection name 'Users'
const User1 = mongoose.model('Users', UserSchema);

module.exports = User1;
