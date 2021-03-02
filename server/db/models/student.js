const Sequelize = require('sequelize')
const db = require('../db')
const crypto = require('crypto')

const Student = db.define('student', {
    email: {
      type: Sequelize.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: Sequelize.STRING,
      get() {
        return () => this.getDataValue('password')
      }
    },
    salt: {
      type: Sequelize.STRING,
      get() {
        return () => this.getDataValue('salt')
      }
    },
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
  })

module.exports = Student


/**
 * instanceMethods
 */
Student.prototype.correctPassword = function(candidatePwd) {
    return Student.encryptPassword(candidatePwd, this.salt()) === this.password()
  }
  
  /**
   * classMethods
   */
  Student.generateSalt = function() {
    return crypto.randomBytes(16).toString('base64')
  }
  
  Student.encryptPassword = function(plainText, salt) {
    return crypto
      .createHash('RSA-SHA256')
      .update(plainText)
      .update(salt)
      .digest('hex')
  }
  
  /**
   * hooks
   */
  const setSaltAndPassword = student => {
    if (student.changed('password')) {
      student.salt = Student.generateSalt()
      student.password = Student.encryptPassword(student.password(), student.salt())
    }
  }
  
  Student.beforeCreate(setSaltAndPassword)
  Student.beforeUpdate(setSaltAndPassword)
  Student.beforeBulkCreate(students => {
    students.forEach(setSaltAndPassword)
  })
  