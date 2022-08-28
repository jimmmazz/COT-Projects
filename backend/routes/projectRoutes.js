import { Router } from 'express'
import { getProjects, addProject } from '../controllers/projectController.js'
import { isAuth } from '../middleware/auth.js'

const router = Router()

router.get('/', getProjects)

router.post('/addProject', isAuth, addProject)

export default router
