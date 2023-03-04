import { Router } from 'express'
const router = Router()

import postController from '../controllers/postController'

router.route('/').get(postController.getPosts).post(postController.setPost)
router.route('/:id').delete(postController.deletePost).put(postController.updatePost)

export default router
