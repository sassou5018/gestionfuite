import { Schema, model, models } from 'mongoose';
import mongoose from 'mongoose';

const reclamationSchema = new Schema({
  "description": {
    type: String,
    required: true
  },
  "city":{
    type: Schema.Types.ObjectId,
    ref: "cities"
  },
  "district":{
    type: Schema.Types.ObjectId,
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

const reclamations = mongoose.models.reclamations || mongoose.model('reclamations', reclamationSchema);

export default reclamations;