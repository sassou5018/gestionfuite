import { Schema, model, models } from 'mongoose';

const usersSchema = new Schema({
  "email": String,
  "pwd": String,
  "userType": {
    type: String,
    enum: ['normalUser', 'Admin'],
    default: 'normalUser'
  },
  "reclamations": [{ type: Schema.ObjectId, ref:'reclamations' }]
});

const users = models.users || model('users', usersSchema);

export default citites;