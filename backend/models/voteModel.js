import mongoose from 'mongoose';
const { Schema } = mongoose;

const voteSchema = new Schema({
  team_id: {
    type: String,
    required: true,
  },
  votes: {
    type: Number,
    required: true,
    default: 0,
  },
});
const Vote = mongoose.model('vote', voteSchema);
export default Vote;
