const bcrypt = require('bcryptjs');
const db = require('../config/database');
const { BCRYPT_ROUNDS } = require('../config/config');

class User {
  static async create({ username, email, password, role = 'member' }) {
    const hashedPassword = await bcrypt.hash(password, BCRYPT_ROUNDS);
    return db.createUser({
      username,
      email,
      password: hashedPassword,
      role,
      createdAt: new Date()
    });
  }

  static findByEmail(email) {
    return db.findUserByEmail(email);
  }

  static findById(id) {
    return db.findUserById(id);
  }

  static getAll() {
    return db.getAllUsers().map(({ password, ...user }) => user);
  }

  static async validatePassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = User;