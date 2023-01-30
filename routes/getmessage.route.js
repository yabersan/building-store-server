const { Router } = require("express");
const { chatsControllers } = require("../controllers/chats.controller");
const router = Router();

const authMiddleware = require("../middlewares/auth.middleware");


router.get("/getMessage", authMiddleware, chatsControllers.getNewMessage);






module.exports = router;
