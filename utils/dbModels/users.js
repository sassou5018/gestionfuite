import { Schema, model, models } from 'mongoose';
import nanoid from 'nanoid';

const usersSchema = new Schema({
  "email": {String, required: true, unique: true},
  "pwd": {String, default: nanoid(10)},
  "userType": {
    type: String,
    enum: ['normalUser', 'Admin'],
    default: 'normalUser'
  },
  "reclamations": [{ type: Schema.ObjectId, ref:'reclamations' }]
});

const users = models.users || model('users', usersSchema);

export default citites;