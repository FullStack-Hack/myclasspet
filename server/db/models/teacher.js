const Sequelize = require('sequelize')
const db = require('../db')
const crypto = require('crypto')

const Teacher = db.define('teacher', {
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

module.exports = Teacher


/**
 * instanceMethods
 */
Teacher.prototype.correctPassword = function(candidatePwd) {
    return Teacher.encryptPassword(candidatePwd, this.salt()) === this.password()
  }
  
  /**
   * classMethods
   */
  Teacher.generateSalt = function() {
    return crypto.randomBytes(16).toString('base64')
  }
  
  Teacher.encryptPassword = function(plainText, salt) {
    return crypto
      .createHash('RSA-SHA256')
      .update(plainText)
      .update(salt)
      .digest('hex')
  }
  
  /**
   * hooks
   */
  const setSaltAndPassword = teacher => {
    if (teacher.changed('password')) {
      teacher.salt = Teacher.generateSalt()
      teacher.password = Teacher.encryptPassword(teacher.password(), teacher.salt())
    }
  }
  
  Teacher.beforeCreate(setSaltAndPassword)
  Teacher.beforeUpdate(setSaltAndPassword)
  Teacher.beforeBulkCreate(teachers => {
    teachers.forEach(setSaltAndPassword)
  })
  