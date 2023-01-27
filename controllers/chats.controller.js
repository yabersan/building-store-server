const Chat = require("../models/Chat.model")
const User = require("../models/User.model")


module.exports.chatsControllers = {
    getChats: async (req, res) => {
        const {id} = req.user
        try {
            const user = await User.findById(id)
            if(user.login === "admin"){
                const chats = await Chat.find()
                return res.json(chats)
            }else{
                const chat = await Chat.find({client: id})
                return res.json(chat)

            }
            return res.json("Нет чатов")
        } catch (error) {
            return res.json(error)
        }
    },
    sendMessages: async (req, res) => {
        const { id } = req.user
        const { text, getterId } = req.body
        try {
            const user = await User.findById(id)
            console.log(user.login)
            if(user.login === "admin"){
                
                const chat = await Chat.findOneAndUpdate({client: getterId}, {
                    $push: { messages: {text, sender: id} },
                  });
                
                console.log(user.login)
                return res.json("Сообщение отправлено")
            }else{
                const chat = await Chat.find({client: id})
                chat.messages = []
                await chat.save()
                console.log(user.login)
                return res.json("Сообщение отправлено")

            }
            
            
        } catch (error) {
            return res.json(error)
        }
    },
    newChat: async (req, res) => {
        const {id} = req.user
        console.log(id)
        try {
            const chat = await Chat.find({client: id})
            if(chat.length > 0){
                return res.json("Такой чат есть.")
            }else{
                await Chat.create({client: id})
                return res.json("Чат создан.")
            }
            
        } catch (error) {
            return res.json(error)
        }
    },
}