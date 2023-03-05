// const asyncHandler = require('express-async-handler')
import asyncHandler from 'express-async-handler'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import Post from '../models/postModel'
import User from '../models/userModel'


interface IRequest extends Request {
    user?: {
        id: any
    },
}

// * to be used when multiple bloggers are writing
// const getID = async ( req: IRequest ): Promise<any> => {
//     let token: string | undefined;
//     if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//         try {
//             token = req.headers.authorization.split(' ')[1]
//             const decoded = jwt.verify(token, process.env.JWT_SECRET || '')
//             if (typeof decoded === 'object') {
//                 const user = await User.findById(decoded.id).select('-password')
//                 return user
//             }
//         } catch {
//             throw new Error('Cannot find user in GetID')
//         }
//     }
// }



const getPosts = asyncHandler(async(req: any, res:any) => {
    try {
        const posts = await Post.find({ })
        res.status(200).json(posts)
    } catch {
        res.status(400)
        throw new Error('Could not get posts')
    }
})

const setPost = asyncHandler(async (req:any, res:any) => {

    if(!req.body.title || !req.body.author || !req.body.content) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const post = Post.create({
        title: req.body.title,
        author: req.body.author,
        content: req.body.content
    })

    res.status(200).json(post)
})

// @desc    Update post
// @route   PUT /api/:id
// @access  Private
const updatePost = asyncHandler(async (req:any, res:any) => {
    const post = await Post.findById(req.params.id)

    // * Works with no user connected or required

    if (!post) {
        res.status(400)
        throw new Error('Post not found')
    }

    // // get currently logged in user's ID
    // const userID = await getID(req)
    // // get rest of logged in user's data based off their ID
    // const user = await User.findById(userID)

    // if (!user) {
    //     res.status(401)
    //     throw new Error('User not found')
    // }

    // ensure logged in user matches contact user
    // TODO pls fix & redo migration
    // if (post.user.toString() !== user.id) {
    //     res.status(401)
    //     throw new Error('User not authorized')
    // }

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedPost)
})

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = asyncHandler(async (req:any, res:any) => {
    const post = await Post.findById(req.params.id)

    if (!post) {
        res.status(400)
        throw new Error('post not found')
    }

    await post.remove()

    res.status(200).json({ id: req.params.id })
})

const postController = {
    getPosts,
    setPost,
    updatePost,
    deletePost
}

export default postController;