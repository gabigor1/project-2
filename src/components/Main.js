import React from 'react'
import axios from 'axios'

import RecipeCard from './RecipeCard'

class Main extends React.Component {
  state = { 
    userChoices: {
      dish: '',
      ingredient1: '',
      ingredient2: '',
      ingredient3: ''
    },
    recipes:[]
  }
  

handleChange = (event) => {
    this.setState({ userChoices:{...this.state.userChoices, [event.target.name]: event.target.value }})
  };


handleSubmit = async (event, {dish, ingredient1, ingredient2, ingredient3}=this.state.userChoices) => {
  event.preventDefault()

  try {

const userIngredients = []

    // Check which ingredients have been filled, take from state

if (this.state.userChoices.ingredient1) {
  userIngredients.push(this.state.userChoices.ingredient1)}

  if (this.state.userChoices.ingredient2) {
  userIngredients.push(this.state.userChoices.ingredient2)}

  if (this.state.userChoices.ingredient3) {
  userIngredients.push(this.state.userChoices.ingredient3)}


const ingredientsString = userIngredients.join(',+')



    // API request to get list of recipes
    const res = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=00457b36e4884a15923e6cd91568706c&ingredients=${ingredientsString}&number=10`)
    // Take out the id of each recipe
    const recipeIds =  res.data.map(recipe => recipe.id)
    // console.log(res.data)
    // console.log(recipeIds) // This works!
    const getSingleRecipe = async (id) => {  
      const res = await  axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=00457b36e4884a15923e6cd91568706c&includeNutrition=false`)
      return res.data
    }
    const recipeData = await Promise.all(recipeIds.map( id => getSingleRecipe(id)))
    this.setState({recipes: recipeData})
  } catch (err) {
    console.log(err)
  }
}


  render() {
    // console.log(this.state)
    return (
    <main className="main">
      <div className="top">
      <form onSubmit={this.handleSubmit}>
        <div className="text">
        <h3>I HAVE </h3>
            <input className="input"
            placeholder="Type ingredient here"
            onChange={this.handleChange}
            name="ingredient1"
            value={this.state.userChoices.ingredient1}/> 
            <h3> ,  </h3>
            <input className="input"
            placeholder="Type ingredient here"
            onChange={this.handleChange}
            name="ingredient2"
            value={this.state.userChoices.ingredient2}/>
            <h3> AND </h3>  
            <input 
            className="input"
            placeholder="Type ingredient here"
            onChange={this.handleChange}
            name="ingredient3"
            value={this.state.userChoices.ingredient3}/>
            <h3> WHAT SHOULD I COOK? </h3>
          </div>  
        <div className="button">
          <button onSubmit={this.handleSubmit} type="submit">INSPIRE ME</button> 
        </div>
      </form>
      </div>
      <div className="bottom">
      {this.state.recipes.map(recipe => (
      <RecipeCard 
        key={recipe.id} 
        title={recipe.title} 
        image={recipe.image}
        sourceUrl={recipe.sourceUrl}/>
      ))}
      </div>
    </main>
    )
  }

}

export default Main