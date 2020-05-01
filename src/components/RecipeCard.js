import React from 'react'

const RecipeCard = ({ title, image, sourceUrl}) => (
    <div className="card">
      <div className="card-image">
        <a href={sourceUrl}> <img src={image} alt={title}/></a>
      </div>
      <div className="card-title">
        <h2>{title}</h2>
      </div>
    </div>
)

export default RecipeCard


