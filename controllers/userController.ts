import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel'
import { ObjectId } from 'mongoose'
import { Request, Response, NextFunction } from 'express'

interface IRequest extends Request {
    user?: any,
}

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) =>{
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }
    const userExists = await User.findOne({ email })

    if(userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc    Auth new user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) =>{
    const { email, password} = req.body

    const user = await User.findOne({email})

    if(user && ( await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

// @desc    Get current logged in user
// @route   GET /api/users/me
// @access  Public
// TODO: Update
const getMe = asyncHandler(async (req: IRequest, res) =>{
    // * we 'got' user.id from authMiddleware
    const result = await User.findById(req.user.id)
    // tslint:disable-next-line:no-console
    console.log(result)

    // result type is (IUser & Required<{ _id: ObjectId; }>) | null
    // so we need to check to ensure that it isn't null
    if (!result) {
        res.status(400).json({ msg: 'User not found' })
    } else {

    const { _id, name, email } = result

    res.status(200).json({
        id: _id,
        name,
        email
    })
    }
})

// generate token
const generateToken = (id: ObjectId) => {
    const secret = process.env.JWT_SECRET || '';
    if (!secret) {
      throw new Error('JWT_SECRET is not defined');
    }
    return jwt.sign({ id }, secret, { expiresIn: '30d' });
  };


const funcs = { registerUser, loginUser, getMe }
export default funcs