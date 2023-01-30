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

        } catch (error) {
            return res.json(error)
        }
    },
    sendMessages: async (req, res) => {
        const { id, name } = req.user
        const { text, clientId, date} = req.body
        try {
            const user = await User.findById(id)
            console.log(user.login)
            if(user.login === "admin"){
                
                const chat = await Chat.findOneAndUpdate({client: clientId}, {
                    $push: { messages: {text, sender: id, name, date} },
                  });
                
                const  chat1 = await Chat.find({client: clientId})
                return res.json(chat1)
            }else{
                const chat = await Chat.findOneAndUpdate({client: id}, {
                    $push: { messages: {text, sender: id, name, date} },
                  });
                const  chat1 = await Chat.find({client: id})
                
                return res.json(chat1)

            }
            
            
        } catch (error) {
            return res.json(error)
        }
    },
    newChat: async (req, res) => {
        const {id} = req.user

        try {
            const chat = await Chat.find({client: id})
            const chat1 = await Chat.find({admin: id})

            if(chat.length > 0 || chat1.length > 0){
                
            }else{
                const chat = await Chat.create({client: id})

                return res.json(chat)
            }
            
        } catch (error) {
            return res.json(error + "Ошибка на ") 
        }
    },
    getNewMessage: async (req, res) => {
        const {id} = req.user
        console.log(id)
        try {
            const user = await User.findById(id)
            let bol = false
            if(user.login === "admin"){
                const chats = await Chat.find()
                while(bol === false){
                    const newChats = await Chat.find()

                    if(JSON.stringify(chats) !== JSON.stringify(newChats)){
                        bol = true
                    } 

                }
                const newChats = await Chat.find()
                return res.json(newChats)
            }else{
                const chat = await Chat.find({client: id})

                while(bol === false){
                    const newChat = await Chat.find({client: id})

                    if(JSON.stringify(chat) !== JSON.stringify(newChat)){
                        bol = true
                    } 
                }
                const newChat = await Chat.find({client: id})
                return res.json(newChat)
            }

        } catch (error) {
            return res.json(error)
        }
    }
}