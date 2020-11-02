'use strict';

const cwd = process.cwd();
const express = require('express');
const modelFinder = require(`${cwd}/middleware/model-finder.js`);
const router = new express.Router();

// Evaluate the model, dynamically
router.param('model', modelFinder.load);

// Models List
router.get('/models', async (req, res) => {
  const models = await modelFinder.list()
  res.status(200).json(models);
});

// JSON Schema for a model
router.get('/:model/schema', (req, res) => {
  res.status(200).json(req.model.jsonSchema());
});

// CRUD Routes
router.get('/:model', handleGetAll);
router.post('/:model', handlePost);
router.get('/:model/:id', handleGetOne);
router.put('/:model/:id', handlePut);
router.delete('/:model/:id', handleDelete);

function handleGetAll(req, res, next) {
  req.model.get(req.query)
    .then(data => {
      const output = {
        count: data.length,
        results: data,
      };
      res.status(200).json(output);
    })
    .catch(next);
}

function handleGetOne(req, res, next) {
  req.model.get({ _id: req.params.id })
    .then(result => res.status(200).json(result[0]))
    .catch(next);
}

function handlePost(req, res, next) {
  req.model.create(req.body)
    .then(result => res.status(200).json(result))
    .catch(next);
}

function handlePut(req, res, next) {
  req.model.update(req.params.id, req.body)
    .then(result => res.status(200).json(result))
    .catch(next);
}

function handleDelete(req, res, next) {
  req.model.destroy(req.params.id)
    .then(result => res.status(200).json(result))
    .catch(next);
}

module.exports = router;
