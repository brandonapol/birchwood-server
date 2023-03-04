// const asyncHandler = require('express-async-handler')
import asyncHandler from 'express-async-handler'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

// const Contact = require('../models/contactModel')
import Contact from '../models/contactModel'
// const User = require('../models/contactModel')
import User  from '../models/userModel'

interface IRequest extends Request {
    user: {
        id: any
    },
}

const getID = async ( req: IRequest ): Promise<any> => {
    let token: string | undefined;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET || '')
            if (typeof decoded === 'object') {
                const user = await User.findById(decoded.id).select('-password')
                return user
            }
        } catch {
            throw new Error('Cannot find user in GetID')
        }
    }
}



const getContacts = asyncHandler(async(req: IRequest, res:any) => {

    const user = await getID(req)
    try {
        if (user.id !== undefined) {
            const contacts = await Contact.find({ user })
            res.status(200).json(contacts)
        }
    } catch {
        res.status(400)
        throw new Error('No user submitted')
    }
})

const setContact = asyncHandler(async (req:any, res:any) => {
    const user = await getID(req)
    if(!req.body.name || !req.body.email || !req.body.address || !req.body.phone_number) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const contact = Contact.create({
        user: user.id,
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        phone_number: req.body.phone_number,
    })

    res.status(200).json(contact)
})

// @desc    Update contacts
// @route   PUT /api/:id
// @access  Private
const updateContact = asyncHandler(async (req:IRequest, res:any) => {
    const contact = await Contact.findById(req.params.id)

    if (!contact) {
        res.status(400)
        throw new Error('Contact not found')
    }

    // get currently logged in user's ID
    const userID = await getID(req)
    // get rest of logged in user's data based off their ID
    const user = await User.findById(userID)

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    // ensure logged in user matches contact user
    if (contact.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedContact)
})

// @desc    Delete contacts
// @route   DELETE /api/goals/:id
// @access  Private
const deleteContact = asyncHandler(async (req:any, res:any) => {
    const contact = await Contact.findById(req.params.id)

    if (!contact) {
        res.status(400)
        throw new Error('contact not found')
    }

    await contact.remove()

    res.status(200).json({ id: req.params.id })
})

const contactController = {
    getContacts,
    setContact,
    updateContact,
    deleteContact
}

export default contactController;