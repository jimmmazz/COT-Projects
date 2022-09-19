import { Router } from 'express'
import {
  getProjects,
  getProject,
  addProject,
} from '../controllers/projectController.js'
import { isAuth } from '../middleware/auth.js'

const router = Router()

router.get('/', getProjects)
router.get('/:id', getProject)

router.post('/addProject', isAuth, addProject)

export default router
