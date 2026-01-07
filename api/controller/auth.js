import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const JWT_SECRET = '7ijy6tgkd,lmfgj7y6t5g4f3d2s1a0'; 


export const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ msg: 'Email and password are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash password and create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
      name: email.split('@')[0] // auto-generate name from email
    });

    await newUser.save();
    res.status(201).json({ msg: 'Registered successfully' });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// ----------------------------
// LOGIN CONTROLLER
// ----------------------------
export const login = async (req, res) => {
  console.log("Incoming login request body:", req.body);  // ✅ Log the input

  const { email, password } = req.body;

  if (!email || !password) {
    console.log("Missing email or password");             // ✅ Log missing fields
    return res.status(400).json({ msg: 'Email and password are required' });
  }

  const user = await User.findOne({ email });
  if (!user) {
    console.log("User not found");
    return res.status(400).json({ msg: 'User not found' });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    console.log("Password mismatch");
    return res.status(400).json({ msg: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
  console.log("Login successful");

  res.status(200).json({
    msg: 'Login successful',
    token,
    email: user.email,
    name: user.name
  });
};
