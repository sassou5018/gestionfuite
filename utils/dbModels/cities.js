import { Schema, model, models } from 'mongoose';

const citiesSchema = new Schema({
  "city_name": String
});

const cities = models.cities || model('cities', citiesSchema);

export default citites;