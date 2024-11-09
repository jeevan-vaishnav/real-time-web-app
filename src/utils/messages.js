const generateMessage = ( username,text,createAt) => {
  return { text,username, createAt: new Date().getTime() };
};

const generateLocationMessage = (url,username) => {
  return {
    url,
    username,
    createAt: new Date().getTime(),
    
  };
};

module.exports = { generateMessage, generateLocationMessage };
