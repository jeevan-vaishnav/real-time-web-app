const generateMessage = (text,createAt) => {
  return { text, createAt: new Date().getTime() };
};

module.exports = { generateMessage };
