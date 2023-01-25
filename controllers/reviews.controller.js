const Review = require("../models/Review.model");

module.exports.reviewControllers = {
    addReview: async (req, res) => {
        const {text} = req.body;
        const userId = req.user
        try {
            await Review.create({text, userId})
            return res.json("Отзыв добавлен.")
        } catch (error) {
            return res.json(error + "Ошибка при добавлении отзыва.")
        }
    },
    deleteReview: async (req, res) => {
        const {id} = req.body
        try{
            await Review.findByIdAndRemove(id)
            return res.json("Отзыв удален.")
        }catch(error){
            return res.json(error + "Ошибка при удалении отзыва.")
        }
    },
    getReviews: async (req, res) => {
        try{
            const reviews = await Review.find()
            return res.json()
        }catch(error){

        }
    }

}