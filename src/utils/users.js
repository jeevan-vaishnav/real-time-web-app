const users = [];

//addUser, removeUser,getUser,getUsersInRoom

const addUser = ({ _id, username, room }) => {
  //temp variable with trim white_space
   username = username.trim().toLowerCase();
   room = room.trim().toLowerCase();

  //User Validation
  if (!username || !room) {
    return { error: "Username and Room are required!" };
  }

  //checking existing user

  const exitingUser = users.find((user)=>{
        return user.username === username && user.room === room
  })

  //validate username
  if(exitingUser){
    return {
        error:"Username is use in"
    }
  }

  //store user 

  const user ={_id, username, room};
  users.push(user);

  return users;
};

const user = addUser({
  _id: "102",
  username: "Jeevan Vaishnav",
  room: "AuraA",
});
const user2 = addUser({ _id: "", username: "", room: "" });

console.log(user);
console.log(user2);
