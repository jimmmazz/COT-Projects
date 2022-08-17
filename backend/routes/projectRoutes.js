import { Router } from 'express'
import { getProjects, addProject } from '../controllers/projectController.js'
import { isAuth } from '../middleware/auth.js'

const router = Router()

router.post('/addProject', addProject)

// router.use(isAuth)
// router.get('/', isAuth, getProjects)
router.get('/', getProjects)

export default router
