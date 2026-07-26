const express = require("express");
const router = express.Router();
const {
  createOrder,
  getUserOrders,
  getOrder,
  updateOrderStatus,
} = require("../controllers/orderController");
const auth = require("../middleware/auth");

router.post("/", auth, createOrder);
router.get("/", auth, getUserOrders);
router.get("/:id", auth, getOrder);
router.put("/:id", auth, updateOrderStatus);

module.exports = router;