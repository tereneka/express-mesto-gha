const urlReg =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
const JWT_SECRET =
  'eb28135ebcfc17578f96d4d65b6c7871f2c803be4180c165061d5c2db621c51b';

module.exports = { urlReg, JWT_SECRET };
