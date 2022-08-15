import { Schema, model, models } from 'mongoose';
import mongoose from 'mongoose';

const districtSchema = new Schema({
  "nom_district": {
    type: String,
    required: true,
    unique: true
  },
  "code_district": {
    type: Number,
    required: true,
    unique: true
  },
  "city":{
    type: mongoose.Schema.ObjectId,
    ref: "cities"
  }
});

const districts = models.districts || model('districts', districtSchema);

export default districts;