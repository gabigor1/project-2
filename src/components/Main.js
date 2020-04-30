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
    recipes:[
  //     {title: "recipe 1",
  //   thumbnail: 'https://pbs.twimg.com/media/DufJofKX4AAFwIP.jpg', 
  //   link: 'https://pbs.twimg.com/media/DufJofKX4AAFwIP.jpg'},
  //   {title: "recipe 2",
  //   thumbnail: 'https://4.bp.blogspot.com/-maCZQpou0Ec/Tfyf_mRm8FI/AAAAAAAAAQM/tkIa4b6K6_8/s1600/POLFD18.jpg',
  // link: 'https://4.bp.blogspot.com/-maCZQpou0Ec/Tfyf_mRm8FI/AAAAAAAAAQM/tkIa4b6K6_8/s1600/POLFD18.jpg'},
  //   {title: "recipe 3",
  //   thumbnail: 'https://31csme3pssfltgd81lo7eu19-wpengine.netdna-ssl.com/wp-content/uploads/2017/02/04_Polaroid-transfer.jpg',
  // link: 'https://31csme3pssfltgd81lo7eu19-wpengine.netdna-ssl.com/wp-content/uploads/2017/02/04_Polaroid-transfer.jpg'}
]
  }
  

  // async componentDidMount() {
  //   try {
  //     const res = await axios.get('https://api.spoonacular.com/recipes/findByIngredients?apiKey=00457b36e4884a15923e6cd91568706c&ingredients=apples,+flour,+sugar&number=2')
  //     // this.setState({ results: res.data })
  //     console.log(res.data)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }



  handleChange = (event) => {
    this.setState({ userChoices:{...this.state.userChoices, [event.target.name]: event.target.value }})
  };


handleSubmit = async (event, {dish, ingredient1, ingredient2, ingredient3}=this.state.userChoices) => {
  event.preventDefault()

  try {
    // API request to get list of recipes
    const res = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=00457b36e4884a15923e6cd91568706c&ingredients=${ingredient1}&number=2`)
    // Take out the id of each recipe
    const recipeIds =  res.data.map(recipe => recipe.id)
    console.log(res.data)
    console.log(recipeIds) // This works!
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
    console.log(this.state)
    return (
    <main>
      <h2>Main page</h2>
      <form onSubmit={this.handleSubmit}>
        <h3> I WANT TO COOK
        <select>
          <option>Roast</option>
          <option>Pasta</option>
          <option>Salad</option>
        </select>
        </h3>
        <h3> AND I HAVE
            <input className="input"
            placeholder="Ingredient1"
            onChange={this.handleChange}
            name="ingredient1"
            value={this.state.userChoices.ingredient1}/> 
            <input className="input"
            placeholder="Ingredient2"
            onChange={this.handleChange}
            name="ingredient2"
            value={this.state.userChoices.ingredient2}/> 
            <input 
            className="input"
            placeholder="Ingredient3"
            onChange={this.handleChange}
            name="ingredient3"
            value={this.state.userChoices.ingredient3}/> 
        </h3>
        <div>
          <button onSubmit={this.handleSubmit} type="submit">INSPIRE ME</button>
      </div>
      </form>
      <div>
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