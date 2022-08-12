import { Schema, model, models } from 'mongoose';

const reclamationSchema = new Schema({
  "city":{
    type: Schema.ObjectId,
    ref: "cities"
  },
  "district":{
    type: Schema.ObjectId,
    ref: "districts"
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