import { Router } from 'express'
const router = Router()

import contactController from '../controllers/contactController'
// const contactController = require('../controllers/contactController')

router.route('/').get(contactController.getContacts).post(contactController.setContact)
router.route('/:id').delete(contactController.deleteContact).put(contactController.updateContact)

export default router

