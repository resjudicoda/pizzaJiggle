import React from 'react'

const Button = props => (
  <div className="buttons fadein">
    <div className="button">
      <label htmlFor="single" />
      <input type="file" id="single" onChange={props.onChange} />
    </div>
  </div>
)

export default Button
