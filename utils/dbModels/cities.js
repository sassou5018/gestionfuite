import { Schema, model, models } from 'mongoose';

const citiesSchema = new Schema({
  "city_name": {
    type: String,
    required: true,
    unique: true
  }
});

const cities =  models.cities || model('cities', citiesSchema);

export default cities;