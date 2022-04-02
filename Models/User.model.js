const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')


const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
})

UserSchema.pre('save', async function (next) {
  try {
    if (this.isNew) {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(this.password, salt)
      this.password = hashedPassword
    }
    next()
  } catch (error) {
    next(error)
  }
})

UserSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password)
  } catch (error) {
    throw error
  }
}

const User = mongoose.model('user', UserSchema)

const studentSchema = new Schema({ 
id :{
  type : Number,
  required : true,
  unique : true
},
name : {
  type : String,
  required : true,
  unique : false
},
courses : {
  type : [],
  required : true,
  unique : false,
}
})

const Student = mongoose.model('student' , studentSchema)

studentSchema.pre('save' ,() => {
  if(this.isNew){
    const student1 = new Student({id : 2, name : 'pratik',courses : ['MBA' , 'CA']}) 
    student1.save((err,student) => {
      if(err) return console.log(err)
      console.log('registered successfully!')
    })
  }else {
    console.log('already exist!')
  }
})

module.exports = {
  User : User,
  Student : Student
}


