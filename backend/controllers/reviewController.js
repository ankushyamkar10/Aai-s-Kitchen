const asyncHandler = require("express-async-handler");
const Reviews = require('../models/reviewModel')
const User = require('../models/userModel')

const getReviews = asyncHandler(async (req, res) => {

    const reviews = await Reviews.find({})
    res.status(201).json(reviews)

})

const postReview = asyncHandler(async (req, res) => {
    const userId = req.user.id
    const {name} = await User.findOne({ _id: userId })
    const { rating, review } = req.body

    if (!rating || !review) {
        res.status(400).json({ message: 'Please fill all the fields!' })
    }

    const newReview = await Reviews.create({ userId, name, rating, review })

    if (!newReview) {
        res.status(501).json({ message: `Couldn't post the Review right now!` })
    }
    res.status(200).json(newReview)
})

module.exports = {
    getReviews,
    postReview
}