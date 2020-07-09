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

  // Jimp.read(image.path)
  //   .then((image) => image.posterize(4))
  //   .then((image) => console.log('jimped', image))
  // const jimped = Jimp.read(image.path)
  //   .then((image) => {
  //     return image
  //       .resize(256, 256) // resize
  //       .quality(60) // set JPEG quality
  //       .posterize(4) // posterize
  //       .getBase64Async(Jimp.MIME_PNG, (base64) => {
  //         console.log('base64', base64)
  //         cloudinary.v2.uploader.upload(base64, function (error, result) {
  //           console.log(result, error)
  //         })
  //       })
  //     //.write('../../uploads/upload-posterize.jpg') // save
  //   })
  //   //.then((image) => console.log('jimped', image))
  //   const
  //   .then((result) => res.json(result))
  //   .catch((err) => {
  //     console.error(err)
  //   })

  // const buffer = await Jimp.read(image.path).then((image) => {
  //   return (
  //     image
  //       //.resize(256, 256) // resize
  //       .quality(60) // set JPEG quality
  //       .posterize(4)
  //   ) // posterize
  //   //.getBufferAsync(Jimp.MIME_PNG)
  // })

  const promise = [
    cloudinary.v2.uploader.upload(image.path, {
      width: 256,
      height: 256,
      crop: 'limit',
      effect: 'cartoonify:50:100'
    })
  ]

  // Promise.all(promise).then((result) => {
  //   console.log('cloudinary result', result)
  //   Jimp.read(result[0].secure_url)
  //     .then((image) => image.posterize(4))
  //     .then((result) => res.json(result))
  // })
  Promise.all(promise)
    .then(result => res.json(result))
    .catch(err => {
      console.error(err)
    })
})
