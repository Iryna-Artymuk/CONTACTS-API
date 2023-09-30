// ------------create schema ------------
import { Schema, model } from 'mongoose';
import { handelSchemsErrorStatus } from '../hooks.js';

// -------mongoose  vadidation schema ---------last check before sendind to DB

const emailRegExpr = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, ' forgot to type  is  name'], // поле є обовязковим
    },
    email: {
      unique: true,
      type: String,
      match: emailRegExpr,
      required: [true, ' forgot to type  is  name  emai(('], // поле є обовязковим другий параметр кастомний меседж
    },
    password: {
      type: String,
      required: [true, ' where is   password'], // поле є обовязковим другий параметр кастомний меседж
      minlength: 6,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    avatarURL: { type: String },
    token: {
      type: String,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      default: '',
    },
  },
  { versionKey: false, timestamps: true }
);

//---ПОМИЛКА --  якщо mongoose повертає помилку він не присвою помилці статус тому всі помилки мають статус 500 і не будуть зрозумілі на фронтенді
//---РІШЕННЯ---  створити mongoose hook який буде розрізняти помилки і передавати вірний статус і повідомлення
// це функція яка буде викликана перед тим як помилка перейде в блок catch ій присвоїться статус і спрацює функція обробки помилок з app.js

userSchema.post('save', handelSchemsErrorStatus);

const User = model('user', userSchema);

export default User;
