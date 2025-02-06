import { model, Schema } from 'mongoose';
import { ROLES } from '../../constants/index.js';

const User = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, email: true, unique: true, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ROLES.USER,
      default: ROLES.USER,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

User.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UserCollection = model('users', User);
