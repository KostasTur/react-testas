import mongoose from 'mongoose';
const { Schema } = mongoose;

const teamSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  voted_by: { type: Array },
});

const Team = mongoose.model('team', teamSchema);
export default Team;
