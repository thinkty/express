/**
 * This module defines the basic routes for the server's APIs
 * [GET]
 * - / : send 200 status
 *
 * [POST]
 * -
 */
const { Router } = require('express');

const router = Router();

router.get('/', (req, res, next) => {
  try {
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
