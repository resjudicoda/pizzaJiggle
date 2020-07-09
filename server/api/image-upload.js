require('dotenv').config()
const router = require('express').Router()
const cloudinary = require('cloudinary')
const formData = require('express-form-data')
const Jimp = require('jimp')
module.exports = router

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

router.use(formData.parse())

router.get('/', async (req, res, next) => {
  try {
    res.json('images')
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  const image = req.files.image

  const promise = [
    cloudinary.v2.uploader.upload(image.path, {
      width: 256,
      height: 256,
      crop: 'limit',
      effect: 'cartoonify:50:100'
    })
  ]

  Promise.all(promise)
    .then(result => res.json(result))
    .catch(err => {
      console.error(err)
    })
})
