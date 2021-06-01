const express = require("express");
const roomController = require("../Controllers/RoomController");
const router = express.Router();

router.post("/registerRoom", roomController.registerRoom);
router.get("/getAllRooms/:checkIn", roomController.getAllRooms);
router.get("/getSingleRoom/:id", roomController.getRoomById);
router.put("/updateRoom/:id", roomController.updateRoom);

module.exports = router;
