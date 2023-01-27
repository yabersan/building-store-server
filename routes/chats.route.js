const { Router } = require("express");
const { chatsControllers } = require("../controllers/chats.controller");
const router = Router();

const authMiddleware = require("../middlewares/auth.middleware");


router.get("/", authMiddleware, chatsControllers.getChats);
router.get("/new", authMiddleware, chatsControllers.newChat);
router.post("/send", authMiddleware, chatsControllers.sendMessages);





module.exports = router;
