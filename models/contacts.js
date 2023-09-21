import { Schema, model } from 'mongoose';

// -------mongoose  Contacts vadidation schema ---------last check before sendind to DB

import { handelSchemsErrorStatus } from './hooks.js';
// monggose  Schema це аналог схеми валідації joi відрізняється тим що іі не можна обійти так як вона є частиною моделі
// в схемі детально описується як повинен виглядати обєкт в базі даних
// створити обєкт де перелічити всі вимоги до поля
// -------mongoose  vadidation schema ---------last check before sendind to DB
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'], // поле є обовязковим
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please fill a valid email address',
      ],
      required: [true, 'Set email for contact'],
    },
    phone: {
      type: String,
      match:
        /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/, // значення має відповідати регуряреому виразу
      required: [true, 'Set   phone for contact'],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true }
);

// якщо валідація по mongoose schema не пройдена mongoose викидає помилку  спрацьовує catch з контролера і викликає функцію обробки помилок
//---ПОМИЛКА -- mongoose не присвою помилці статус тому всі помилки мають статус 500 і не будуть зрозумілі на фронтенді
//---РІШЕННЯ---  викликати спеціальний mongoose hook
// це функція яка буде викликана перед тим як помилка перейде в блок catch ій присвоїться статус і спрацює функція обробки помилок з app.js

contactSchema.post('save', handelSchemsErrorStatus);

// створюєм екземпляр класу йому треба передати назву колекції в однині з якою буде працювати цей екземпляр і створену схему
// експортуєм його для використання в контролерах

const Contact = model('contact', contactSchema);

export default Contact;
