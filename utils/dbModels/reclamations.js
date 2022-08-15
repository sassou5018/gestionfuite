import { Schema, model, models } from 'mongoose';

const reclamationSchema = new Schema({
  "description": {
    type: String,
    required: true
  },
  "city":{
    type: Schema.ObjectId,
    ref: "cities",
    required: true
  },
  "district":{
    type: Schema.ObjectId,
    ref: "districts",
    required: true
  },
  "time":{
    type: Date,
    default: Date.now
  },
  "progress":{
    type: Number,
    default: 0
  }
});

const reclamations = models.districts || model('reclamations', reclamationSchema);

export default reclamations;