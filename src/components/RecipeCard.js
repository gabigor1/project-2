import React from 'react'

const RecipeCard = ({ title, image, sourceUrl}) => (
  <div className="desktop">
    <div className="card">
      <div className="card-title">
        <h2>{title}</h2>
      </div>
      <div className="card-image">
        <a href={sourceUrl}> <img src={image} alt={title}/></a>
      </div>
    </div>
  </div>
)

export default RecipeCard


