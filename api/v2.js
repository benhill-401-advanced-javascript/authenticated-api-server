'use strict';

const cwd = process.cwd();
const express = require('express');
const modelFinder = require(`${cwd}/middleware/model-finder.js`);
const router = express.Router();
const bearer = require('../auth/middleware/bearer.js');
const permissions = require('../auth/middleware/acl.js');

// Evaluate the model, dynamically
router.param('model', modelFinder.load);

// Models List
router.get('/models', (req, res) => {
  console.log('hi there');
  modelFinder.list()
    .then(models => res.status(200).json(models));
});

// JSON Schema
router.get('/:model/schema', (req, res) => {
  res.status(200).json(req.model.jsonSchema());
});

router.get('/:model', handleGetAll);
router.post('/:model', bearer, permissions('create'), handlePost);
router.get('/:model', bearer, permissions('read'), handleGetAll);
router.get('/:model/:id', bearer, permissions('read'), handleGetOne);
router.put('/:model/:id', bearer, permissions('update'), handlePut);
router.delete('/:model/:id', bearer, permissions('delete'), handleDelete);


async function handleGetAll(req, res, next) {
  try {
    let list = await req.model.get(req.query);
    const output = {
      count: list.length,
      results: list,
    };
    res.status(200).json(output);
  } catch (e) {
    next(e);
  }
}

async function handleGetOne(req, res, next) {
  try {
    let result = await req.model.get({ _id: req.params.id });
    res.status(200).json(result[0]);
  } catch (e) {
    next(e);
  }
}

async function handlePost(req, res, next) {
  try {
    let result = await req.model.create(req.body);
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
}

async function handlePut(req, res, next) {
  try {
    let result = await req.model.update(req.params.id, req.body);
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
}

async function handleDelete(req, res, next) {
  try {
    let result = await req.model.delete(req.params.id);
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
}

module.exports = router;