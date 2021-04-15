import React,{useEffect, useState} from 'react'
import Recipe from './Recipe';

import './App.css';

const App = () => {

  const APP_ID = '010f6733';
  const APP_KEY = '21dc0610ae877f8fbaab4aad91d34c31';

  const [recipes, setRecipes] = useState([]); // recipe will come from api
  const [search, setSearch] = useState(''); // search result will be stored
  const [query, setQuery] = useState('chicken'); // will change when user clicks on search button
  // to avoid re rendering of useeffect for every letter typed in search bars



  useEffect( () => {
    getRecipes();
  },[query]);
  
  const getRecipes = async ()  => {
    const response = await fetch( `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);

  };

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');

  }
  return(
    <div className = "App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button className="search-button" type="submit" >
            search
        </button>
      </form>

      <div className="recipes">
      {recipes.map(recipe => (
        <Recipe key={recipe.recipe.label} title={recipe.recipe.label} calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
      ))}
      </div>
    </div>
  )
}

export default App;
