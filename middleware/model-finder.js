'use strict';

const fs = require('fs');
const util = require('util');
const readdir = util.promisify(fs.readdir);

const modelsFolder = `${__dirname}/../models`;

const load = (req, res, next) => {
  const modelName = req.params.model.replace(/[^a-z0-9-_]/gi, '');
  const fileName = `${modelsFolder}/${modelName}/${modelName}-model.js`;
  const Model = require(fileName);
  req.model = new Model();
  next();
};


const list = () => {
  return readdir(modelsFolder)
    .then(contents =>
      contents.filter((entry) =>
        fs.lstatSync(`${modelsFolder}/${entry}`).isDirectory() && fs.statSync(`${modelsFolder}/${entry}/${entry}-model.js`)
      )
    )
    .catch(console.error);
};

module.exports = { load, list };
