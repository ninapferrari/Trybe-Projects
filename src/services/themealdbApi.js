export const requireApiFood = async (site, id, key) => {
  const URL = `https://www.${site}.com/api/json/v1/1/lookup.php?i=${id}`;

  try {
    const data = await fetch(URL).then((response) => response.json());
    const result = data[key][0];
    return result;
  } catch (error) {
    console.log(error);
  }
};

// Ajuda do Henrique para refatorar o codigo, pois estava muito redundante
async function api(site, modulo, type, attribute) {
  // modulo (filter or search)
  // type(i = ingredient, f = first letter, s = name)
  const URL = `https://www.${site}.com/api/json/v1/1/${modulo}.php?${type}=${attribute}`;
  try {
    const data = await fetch(URL).then((response) => response.json());
    return data;
  } catch (e) {
    return e;
  }
}

// Req 14 e 15
export const apiAttributes = async (typeSearch, attributes, pathName) => {
  // Bloco comidas
  if (pathName === '/foods') {
    if (typeSearch === 'f' || typeSearch === 's') {
      return api('themealdb', 'search', typeSearch, attributes);
    } return api('themealdb', 'filter', typeSearch, attributes);
  }
  // Bloco Bebidas
  if (typeSearch === 'f' || typeSearch === 's') {
    return api('thecocktaildb', 'search', typeSearch, attributes);
  } return api('thecocktaildb', 'filter', typeSearch, attributes);
};

// Req 74 - Função recebe o site que será utilizado,
// e assim montamos a URL completa da API
export const randomApi = async (site) => {
  const URL = `https://www.${site}.com/api/json/v1/1/random.php`;
  try {
    const data = await fetch(URL).then((response) => response.json());
    return data;
  } catch (e) {
    return e;
  }
};

// Req 76 - Retorna os ingredientes, dependento da receita(food ou drink)
export const getIngredientOrNationality = async (site, modulo, type, filter) => {
  const URL = `https://www.${site}.com/api/json/v1/1/${modulo}.php?${type}=${filter}`;
  console.log(URL);
  try {
    const data = await fetch(URL).then((response) => response.json());
    return data;
  } catch (e) {
    return e;
  }
};

// Req 77 - Retorna as receitas do ingrediente clicado na tela explore
// Pretendo remove-lo, mas preciso avalidar as demais Api's pois acredito que de
// para utilizar alguma outra
export const getIdRecipes = async (site, attribute) => {
  const URL = `https://www.${site}.com/api/json/v1/1/filter.php?i=${attribute}`;
  try {
    const data = await fetch(URL).then((response) => response.json());
    return data;
  } catch (e) {
    return e;
  }
};
