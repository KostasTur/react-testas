import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import Team from './models/teamModel.js';
import Vote from './models/voteModel.js';

dotenv.config();
const app = express();

// Midilwares
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;

// connecting to mongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) =>
    app.listen(PORT, () =>
      console.log(`((: Server is running on port ${PORT} `)
    )
  )
  .catch((err) => console.log(err));

// ROUTES
// GET: test
app.get('/', (req, res) => res.send('API is running...'));
// GET: check if id exists return all teams with votes
app.get('/teams/:id', async (req, res) => {
  let id = req.params.id;
  const found = await Team.findOne({ _id: id }).select('_id').lean();
  if (found) {
    let teams = await Team.find({});
    let votes = await Vote.find({});
    let teamsWithScore = teams.reduce((total, team) => {
      let teamVotesObj = votes.find((vote) => vote.team_id === '' + team._id);
      total.push({ ...team.toObject(), score: teamVotesObj.votes });
      return total;
    }, []);

    res.json(teamsWithScore);
  } else {
    res.status(401).json({
      loginStatus: 'failed',
      message: 'Team not found',
    });
  }
});
// // GET: all teams with votes
// app.get('/teams', async (req, res) => {
//   let teams = await Team.find({});
//   let votes = await Vote.find({});
//   let teamsWithScore = teams.reduce((total, team) => {
//     let teamVotesObj = votes.find((vote) => vote.team_id === '' + team._id);
//     total.push({ ...team.toObject(), score: teamVotesObj.votes });
//     return total;
//   }, []);

//   res.json(teamsWithScore);
// });
// POST: Login existing team
app.post('/login', async (req, res) => {
  const teams = await Team.find();
  let teamFound = teams.find(
    (team) =>
      team.email === req.body.email && team.password === req.body.password
  );

  if (teamFound) {
    let { _id, email } = teamFound;
    res.json({
      loginStatus: 'success',
      team_id: _id,
      email: email,
    });
  } else {
    res.status(401).json({
      loginStatus: 'failed',
      message: 'Given email or password is incorrect',
    });
  }
});
// POST: add team to database
app.post('/signup', async (req, res) => {
  if (!req.body) return res.status(400).json({ message: 'missing user input' });
  const teams = await Team.find();
  const teamExists = teams.some((team) => team.email === req.body.email);
  if (teamExists) {
    res.json({
      registrationStatus: 'failed',
      message: 'Team with provided email already exists!',
    });
  } else {
    try {
      const team = new Team(req.body);
      const newTeam = await team.save();
      const vote = new Vote({ team_id: newTeam._id, votes: 0 });
      await vote.save();
      res.json({
        registrationStatus: 'success',
        team_id: newTeam._id,
      });
    } catch (error) {
      console.log(error);
    }
  }
});
// POST: update vote and team.voted_by
app.post('/vote', async (req, res) => {
  if (!req.body.itemId || !req.body.votingTeam || !req.body.num)
    return res.status(400).json({ message: 'missing user input' });

  try {
    const teamFilter = { _id: req.body.itemId };
    const voteFilter = { team_id: req.body.itemId };

    let team = await Team.find(teamFilter);
    team[0].voted_by.push(req.body.votingTeam);
    const updateVoted = { voted_by: team[0].voted_by };
    await Team.findOneAndUpdate(teamFilter, updateVoted, {
      new: true,
    });

    let vote = await Vote.find(voteFilter);
    const updateVotes = { votes: vote[0].votes + req.body.num };
    await Vote.findOneAndUpdate(voteFilter, updateVotes, {
      new: true,
    });

    res.status(200).json({ message: 'success' });
  } catch (err) {
    res.send({ message: 'something went wrong :(' });
  }
});

// const updatedTeam = await Team.findOneAndUpdate(teamFilter, updateVoted, {
//   new: true,
// });

// Warning! this route clears the db
app.get('/clear', async (req, res) => {
  const teamsDeleted = await Team.deleteMany({});
  const votesDelted = await Vote.deleteMany({});

  console.log('Teams', teamsDeleted);
  console.log('Votes', votesDelted);
});
