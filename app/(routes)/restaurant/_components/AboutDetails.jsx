import React from 'react'

const AboutDetails = ({restaurant}) => {
  return (
    <div className='px-5 py-4 shadow-sm border rounded-lg'>
<h2>{restaurant?.aboutUs}</h2>
    </div>
  )
}

export default AboutDetails