import { Schema, model, models } from 'mongoose';
import mongoose from 'mongoose';

const districtSchema = new Schema({
  "nom_district": String,
  "code_district": Number,
  "city":{
    type: mongoose.Schema.ObjectId,
    ref: "cities"
  }
});

const districts = models.districts || model('districts', districtSchema);

export default districts;