// import jwt from 'jsonwebtoken'
// import { isAuth } from '../middleware/auth.js'
import Projects from '../models/projectModel.js'

export const getProjects = async (req, res) => {
  const projects = await Projects.getProjects()
  console.log(projects)
  res.status(200).json(projects)
  // const token = req.header('Bearer')
  // console.log('controller', token)
  // const isTokenAuth = await isAuth(token)
  //   const decoded = jwt.verify(token, process.env.JWT_SECRET)
  // console.log('token', token)
  // res.send(isTokenAuth)
}

export const addProject = async (req, res) => {
  const { projectName } = req.body
  // console.log('project name:', projectName)
  const newProject = await Projects.addProject(projectName)
  // console.log(req.body)
  res.status(200).json(newProject)
}
