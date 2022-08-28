import mongoose from 'mongoose'

const { Schema, model } = mongoose

const projectSchema = new Schema({
  projectName: {
    type: String,
    require: true,
  },
  date: {
    type: String,
    require: true,
  },
  location: {
    type: String,
    require: true,
  },
  contactName: {
    type: String,
    require: true,
  },
  contactPhone: {
    type: String,
  },
  projectDesc: {
    type: String,
    require: true,
  },
  projectWorkComplete: {
    type: String,
  },
})

projectSchema.statics.getProjects = async function () {
  const projects = await this.find({})
  if (!projects) {
    return 'No projects'
  }
  return projects
}

projectSchema.statics.addProject = async function (projectData) {
  try {
    // console.log(projectData)
    const newProject = await this.create({ ...projectData })
    return newProject
  } catch (error) {
    console.log(error)
  }
}

export default model('Projects', projectSchema)
