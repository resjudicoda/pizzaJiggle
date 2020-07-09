import React, {Component} from 'react'
import Images from './Images'
import Buttons from './Buttons'
import Spinner from './Spinner'

class Uploader extends Component {
  state = {
    uploading: false,
    images: []
  }

  onChange = e => {
    const file = e.target.files[0]
    console.log('file', file)
    this.setState({uploading: true})

    const formData = new FormData()
    formData.append('image', file)

    fetch(`/api/image-upload`, {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(images => {
        console.log('returned images', images)
        this.setState({
          uploading: false,
          images
        })
      })
  }

  render() {
    const {uploading, images} = this.state

    const content = () => {
      switch (true) {
        case uploading:
          return <Spinner />
        case images.length > 0:
          return <Images images={images} />
        default:
          return <Buttons onChange={this.onChange} />
      }
    }

    return (
      <div>
        <div className="buttons">{content()}</div>
      </div>
    )
  }
}

export default Uploader
