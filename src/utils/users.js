const users = [];

//addUser, removeUser,getUser,getUsersInRoom

const addUser = ({id, username, room }) => {
  //temp variable with trim white_space
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  //User Validation
  if (!username || !room) {
    return { error: "Username and Room are required!" };
  }

  //checking existing user
  const exitingUser = users.find((user) => {
    return user.username === username && user.room === room;
  });
  //validate username
  if (exitingUser) {
    return {
      error: "Username is use in",
    };
  }

  //store user
  const user = { id, username, room };
  users.push(user);

  return { user };
};

//Remove User
const removeUser = (id) => {
  const index = users.findIndex((user) => {
    return user.id === id;
  });

  console.log(index)

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};


addUser({
  id: "102",
  username: "Jeevan Vaishnav",
  room: "AuraA",
});

console.log(users);

const removeUserByID = removeUser("102");
console.log(removeUserByID)
console.log(users)
