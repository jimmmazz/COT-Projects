import mongoose from 'mongoose'
import validator from 'validator'

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
  contactPhoneNoReq: {
    type: String,
  },
  projectDesc: {
    type: String,
    require: true,
  },
  projectWorkCompleteNoReq: {
    type: String,
  },
})

projectSchema.statics.getProjects = async function () {
  const projects = await this.find({})
  if (projects.length < 1) {
    projects.push('No projects')
    return projects
  } else {
    return projects
  }
}

projectSchema.statics.getProject = async function (id) {
  const project = await this.findById({ _id: id })
  if (!project) {
    console.log('No projects')
    return
  } else {
    // console.log(project)
    return project
  }
}

projectSchema.statics.addProject = async function (projectData, req) {
  const {
    projectName,
    date,
    location,
    contactName,
    contactPhoneNoReq,
    projectDesc,
    projectWorkCompleteNoReq,
  } = projectData

  //removes non required field from list to check
  const reqFields = {}
  for (const field in projectData) {
    if (!field.includes('NoReq')) {
      reqFields[field] = projectData[field]
    }
  }

  try {
    for (const key in reqFields) {
      if (validator.isEmpty(reqFields[key])) {
        throw Error('All fields must be filled in')
      }
    }

    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
    if (projectData.contactPhoneNoReq) {
      if (phoneRegex.test(projectData.contactPhoneNoReq)) {
        projectData.contactPhoneNoReq = projectData.contactPhoneNoReq.replace(
          phoneRegex,
          '($1) $2-$3'
        )
      } else {
        throw Error('Not a valid phone number')
      }
    }

    //finish adding validation and sanitation
    projectData.projectDesc = validator.escape(projectData.projectDesc)
    projectData.projectWorkCompleteNoReq = validator.escape(
      projectData.projectWorkCompleteNoReq
    )
    projectData.projectName = validator.escape(projectData.projectName)
    projectData.location = validator.escape(projectData.location)
    projectData.contactName = validator.escape(projectData.contactName)

    console.log(req.query)

    let newProject
    if (req.method === 'POST') {
      newProject = await this.create({ ...projectData })
    }
    if (req.method === 'PUT') {
      newProject = await this.findOneAndUpdate(
        { _id: req.query.id },
        { ...projectData }
      )
    }

    return newProject
  } catch (error) {
    // console.log(error)
    return error.message
  }
}

projectSchema.statics.deleteProject = async function (id) {
  const deletedProject = await this.deleteById({ _id: id })
  if (!project) {
    console.log('No projects')
    return
  } else {
    // console.log(project)
    return deletedProject
  }
}

export default model('Projects', projectSchema)
