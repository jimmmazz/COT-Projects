import Projects from '../models/projectModel.js'

export const getProjects = async (req, res) => {
  const projects = await Projects.getProjects()
  res.status(200).json(projects)
}

export const addProject = async (req, res) => {
  const newProject = await Projects.addProject(req.body)
  res.status(200).json(newProject)
}
