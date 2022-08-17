import mongoose from 'mongoose'

const { Schema, model } = mongoose

const projectSchema = new Schema({
  projectName: {
    type: String,
    require: true,
  },
})

projectSchema.statics.getProjects = async function () {
  const projects = await this.find({})
  if (!projects) {
    return 'No projects'
  }
  return projects
}

projectSchema.statics.addProject = async function (projectName) {
  try {
    const newProject = await this.create({ projectName })
    return newProject
  } catch (error) {
    console.log(error)
  }
}

export default model('Projects', projectSchema)
