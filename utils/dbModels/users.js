import { Schema, model, models } from 'mongoose';
import {nanoid} from 'nanoid';


const usersSchema = new Schema({
  "email": {type: String, required: true, unique: true},
  "pwd": {type: String, default: nanoid()},
  "userType": {
    type: String,
    enum: ['normalUser', 'Admin'],
    default: 'normalUser'
  },
  "reclamations": [{ type: Schema.ObjectId, ref:'reclamations' }]
});

const users = models.users || model('users', usersSchema);

export default users;