import React from 'react'

const RecipeCard = ({ title, image, sourceUrl}) => (
  <div className="desktop">
    <div className="container">
      <div className="title">
        <h2>{title}</h2>
      </div>
      <div className="image">
        <a href={sourceUrl}> <img src={image} alt={title}/></a>
      </div>
    </div>
  </div>
)

export default RecipeCard


