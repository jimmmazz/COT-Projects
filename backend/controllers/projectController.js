import Projects from '../models/projectModel.js'

export const getProjects = async (req, res) => {
  const projects = await Projects.getProjects()
  res.status(200).json(projects)
}

export const getProject = async (req, res) => {
  const project = await Projects.getProject(req.params.id)
  res.status(200).json(project)
}

export const addProject = async (req, res) => {
  const newProject = await Projects.addProject(req.body)
  res.status(200).json(newProject)
}

export const deleteProject = async (req, res) => {
  console.log('controller', req.params.id)
  const deletedProject = await Projects.deleteOne({ _id: req.params.id })
  res.status(200).json(deletedProject)
}
