import React from 'react'

const Button = props => (
  <div className="buttons fadein">
    <div className="button">
      <label htmlFor="single" className="buttonLabel">
        Upload an Image
        <input
          type="file"
          id="single"
          onChange={props.onChange}
          accept="image/*"
          title=" "
        />
      </label>
    </div>
  </div>
)

export default Button
