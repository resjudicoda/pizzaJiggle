import React from 'react'
import Three from './Three'

const Images = props =>
  props.images.map((image, i) => (
    <div key={i} className="fadein">
      <Three image={image} />
    </div>
  ))

export default Images
