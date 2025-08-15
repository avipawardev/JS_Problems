import React from 'react'

const Spinner = ({ size = 20, color = '#2563eb' }) => {
  return (
    <div
      className="spinner"
      style={{
        width: size,
        height: size,
        borderTopColor: color
      }}
    />
  )
}

export default Spinner
