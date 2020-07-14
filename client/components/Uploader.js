import React, {Component, useState} from 'react'
import Images from './Images'
import Button from './Button'
import Spinner from './Spinner'
import UseWindowDimensions from '../util/UseWindowDimensions'

const Uploader = props => {
  const [uploading, setUploading] = useState(false)
  const [images, setImages] = useState([])
  const {height, width} = UseWindowDimensions()

  const onChange = e => {
    const file = e.target.files[0]
    console.log('file', file)
    setUploading(true)

    const formData = new FormData()
    formData.append('image', file)

    fetch(`/api/image-upload`, {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(images => {
        setImages(images)
        setUploading(false)
      })
  }

  const content = () => {
    switch (true) {
      case uploading:
        return <Spinner />
      case images && images.length > 0:
        return <Images images={images} />
      default:
        return <Button onChange={onChange} />
    }
  }

  return (
    <>
      <div className="crust" style={{width: width, height: height * 0.1}} />
      <div className="display" style={{width: width, height: height * 0.9}}>
        {content()}
      </div>
    </>
  )
}

export default Uploader
