import { DataTypes } from 'sequelize'
import { randomUUID } from 'crypto';
import sequelize from '../config/database.js'
import { encrypt } from '../utils/encrypt.js';

export const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  publicId: {
    type: DataTypes.STRING,
    allowNull: false,
    // defaultValue: () => randomUUID()
    defaultValue: '67a0e7e1-5324-40a4-81fa-71bb6463465a',
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [6, 100]
    }
  }
}, { timestamps: false });

const insertUserIfNotExists = async (email, password) => {
  await sequelize.sync();
  const [_, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        email: email,
        password: encrypt(password),
      },
    });
    if (created) {
      console.log(`User with email '${email}' created successfully.`);
    }
}

// Create user test data if it doesn't exist
insertUserIfNotExists("test@example.com",  "123456");