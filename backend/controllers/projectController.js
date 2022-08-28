import Projects from '../models/projectModel.js'

export const getProjects = async (req, res) => {
  const projects = await Projects.getProjects()
  // console.log('retured projects from backend', projects)
  res.status(200).json(projects)
}

export const addProject = async (req, res) => {
  // const { projectName } = req.body
  // console.log('project name:', req.body)
  const newProject = await Projects.addProject(req.body)
  // console.log('new project', newProject)
  res.status(200).json(newProject)
}
