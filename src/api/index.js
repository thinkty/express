/**
 * This module defines the basic routes for the server's APIs
 * [GET]
 * - / : send 200 status
 * - /error : test error handling
 * - /flow : updates the state transition table manually
 *
 * [POST]
 * - /flow : handles updating Dialogflow and the state transition table
 */

const express = require('express');
const { handleGraph } = require('./flowManager/index');
const { StateTable } = require('./stateTable');

const router = express.Router();

router.get('/', (req, res, next) => {
  try {
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

router.get('/error', (req, res, next) => {
  try {
    throw 'Testing error handling on server';
  } catch (error) {
    next(error);
  }
});

router.post('/flow', async (req, res, next) => {
  try {
    await handleGraph(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/flow', async (req, res, next) => {
  try {
    await StateTable.update();
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
