const { Router } = require('express');
const express = require('express');
const router = express.Router();
const {
  dataController,
  apiController
} = require('../../controllers/api/invoices');

router.get('/', dataController.index, apiController.index);
router.get('/:id', dataController.show, apiController.show);
router.post('/:userId', dataController.create, apiController.show);
router.delete('/:id', dataController.destroy, apiController.show);
router.put('/:id', dataController.update, apiController.show);

module.exports = router;
