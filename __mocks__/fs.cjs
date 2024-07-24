// Vite will use this file to mock the Node.js built-in module `fs` when running in Node.js

const { fs } = require("memfs");
module.exports = fs;
