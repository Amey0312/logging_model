const express = require('express');
const {
  getItems,
  createItem,
  updateItem,
  deleteItem,
} = require('../controller/itemController');
const { protect } = require('../controller/authController');

const router = express.Router();

router.get('/', protect, getItems);
router.post('/', protect, createItem);
router.put('/:id', protect, updateItem);
router.delete('/:id', protect, deleteItem);

module.exports = router;