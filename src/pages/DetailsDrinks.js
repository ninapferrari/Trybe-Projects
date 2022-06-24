import React, { useEffect, useState, useContext } from 'react';
import PropType from 'prop-types';
import CarouselRecommend from '../components/CarouselRecommend';
import doneRecipesContext from '../context/doneRecipesContext';
import MainContext from '../context/MainContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function DetailsDrinks(props) {
  const { clipboard } = useContext(doneRecipesContext);
  const { data, arrayRecomendation, setId, isLoading,
    arrayIngredients, arrayMeasures } = useContext(MainContext);

  const [isDisabled, setDisabled] = useState(false);
  const [continueRecipe, setContinue] = useState(false);
  const [isFavorite, setFavorite] = useState(false);

  const { history: { location, push } } = props;
  const id = location.pathname.split('/')[2];
  setId(id);

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const listInProgress = Object.keys(inProgressRecipes.cocktails);

    doneRecipes.forEach(({ id: idStorage }) => {
      if (idStorage === id) setDisabled(true);
    });

    listInProgress.forEach((idStorage) => {
      if (idStorage === id) setContinue(true);
    });
  }, [id]);

  const redirectToInProgress = () => {
    push(`/foods/${id}/in-progress`);
  };

  const { strDrinkThumb, strDrink, strAlcoholic, strInstructions } = data;
  return isLoading ? <p>Loading ...</p> : (
    <section>
      <img
        alt="img-recipe"
        data-testid="recipe-photo"
        src={ strDrinkThumb }
        width="100%"
      />
      <h2
        data-testid="recipe-title"
      >
        {strDrink}
      </h2>
      <input
        type="image"
        data-testid="share-btn"
        src={ shareIcon }
        onClick={ clipboard }
        value={ `http://localhost:3000/drinks/${id}` }
        alt="share button"
      />
      {!isFavorite ? (
        <input
          data-testid="favorite-btn"
          type="image"
          alt="favorite-icon-button"
          src={ whiteHeartIcon }
          onClick={ () => setFavorite(true) }
        />
      ) : (
        <input
          data-testid="favorite-btn"
          type="image"
          alt="favorite-icon-button"
          src={ blackHeartIcon }
          onClick={ () => setFavorite(false) }
        />
      )}
      <p data-testid="recipe-category">{strAlcoholic}</p>
      <h3>Ingredients</h3>
      <ul>
        {arrayIngredients.map((ingredient, index) => (
          <li
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ index }
          >
            {`${data[ingredient]} - ${data[arrayMeasures[index]]}`}
          </li>
        ))}
      </ul>
      <h3>Instructions</h3>
      <p data-testid="instructions">{strInstructions}</p>
      <CarouselRecommend arrayRecomendation={ arrayRecomendation.meals } />
      <p data-testid="{index}-recomendation-card">Recomendado</p>
      {!isDisabled && continueRecipe ? (
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="fixed-bottom"
          onClick={ redirectToInProgress }
        >
          Continue Recipe
        </button>
      ) : (
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="fixed-bottom"
          onClick={ redirectToInProgress }
        >
          Start Recipe
        </button>
      )}
    </section>
  );
}

DetailsDrinks.propTypes = {
  history: PropType.shape({
    location: PropType.objectOf(PropType.string).isRequired,
    push: PropType.func.isRequired,
  }).isRequired,
};

export default DetailsDrinks;
