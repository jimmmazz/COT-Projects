import express from 'express'
import {
  getUser,
  createUser,
  loginUser,
} from '../controllers/usersController.js'
const router = express.Router()

router.post('/signup', createUser)
router.post('/login', loginUser)
router.get('/', getUser)

export default router
