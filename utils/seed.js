const connection = require('../config/connection');
const { Reaction, Thought, User } = require('../models');
const { getRandomName, getRandomThoughts, getRandomReactions, getRandomReaction, getRandomThought } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

const getRandomUser = async function() {
  let skip = Math.floor(Math.random() * usersToInsert);
  const user = await User.findOne().skip(skip);
  return user;
}

  
  // await Reaction.deleteMany({});
  await Reaction.deleteMany({});

  await Thought.deleteMany({});

  await User.deleteMany({});

  // Create empty array to hold the students
  const users = [];
  const usersToInsert = 20;

  // Get some random assignment objects using a helper function that we imported from ./data
  const thoughts = getRandomThoughts(20);

  const reactions = getRandomReactions(20);

  // Loop 20 times -- add students to the students array
  for (let i = 0; i < usersToInsert; i++) {
    const username = getRandomName();
    const email = `${username}@gmail.com`;


    users.push({
      username,
      email,
    });
  }

  // Add students to the collection and await the results
  await User.collection.insertMany(users);

  // Add courses to the collection and await the results
for (let i = 0; i < 10; i++) {
  const thoughtUser = await getRandomUser();
  const reactionUser = await getRandomUser();
  console.log("reactionUser", reactionUser)
  const reaction = await Reaction.collection.insertOne({
    reactionBody: getRandomReaction() ,
    user_id: reactionUser._id
  });
  const thought = await Thought.collection.insertOne({
    thoughtText: getRandomThought() ,
    reactions: [reaction.insertedId],
    user_id: thoughtUser._id
  });
  thoughtUser.friends.push(reactionUser._id)
  reactionUser.friends.push(thoughtUser._id)
  thoughtUser.thoughts.push(thought.insertedId)
  thoughtUser.save()
  // reactionUser.save()
  console.log("thought", thought);
  



};

  await Reaction.collection.insertOne({
    reactionBody: 'Same here'
  });
  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.table(thoughts);
  console.table(reactions);

  console.info('Seeding complete! 🌱');
  process.exit(0);
});
