import * as axios from 'axios';

const ACCESS_TOKEN = '2084178101712975';
const API_SUPERHERO = 'https://www.superheroapi.com/api.php/';
const converterFeetAndCentimeters = 30.48;
const converterInchesAndCentimeters = 2.54;
const inchesInFeet = 12;
const converterKilogramsAndPounds = 0.45359237;
const converterKilogramsAndOunces = 0.02834952;
const ouncesInPounds = 16;

const getSuperHeroes = async function(name) {
    try {
      const response = await axios.get(`${API_SUPERHERO}/${ACCESS_TOKEN}/search/${name}`);
      if (response.data && response.data.response === 'success') {
        return response.data.results.map(result => mapResultToSuperHeroCardData(result));
      } else {
        console.log('error: ', response);
        return [];
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  };

const getSuperHero = async function(id) {
    try {
      const response = await axios.get(`${API_SUPERHERO}/${ACCESS_TOKEN}/${id}`);
      if (response.data && response.data.response === 'success') {
        delete response.data.response;
        return response.data;
      } else {
        console.log('error: ', response);
        return null;
      }
    }catch (error) {
      console.error(error);
      return null;
    }
  }

const addOwnHero = async function(ownSuperHero) {
  try {
    const response = await axios.post('api/heroes', mapDataToPayLoad(ownSuperHero));
    console.log(response.data)
    return response.data;
  }catch (error) {
    console.error(error);
    return null;
  }
}

const mapResultToSuperHeroCardData = function(result) {
  return {
    name: result.name,
    image: result.image.url,
    id: result.id
  }
}

const mapDataToPayLoad = function(dataToMap) {
  const data = JSON.parse(JSON.stringify(dataToMap));

  data.biography.aliases = data.biography.aliases.toString().split(',');
  clearUnnecessaryZeros(
    [
      data.powerstats.intelligence,
      data.powerstats.strength,
      data.powerstats.speed,
      data.powerstats.durability,
      data.powerstats.power,
      data.powerstats.combat,
    ]
  )
  data.appearance.height = data.appearance.height ? data.appearance.height.replace(',', '.') : 0;
  data.appearance.weight = data.appearance.weight ? data.appearance.weight.replace(',', '.') : 0;

  if (data.appearance['height-unit'] === 'cm') {
    data.appearance.height = [convertCentimetersToFeet(data.appearance.height) , `${data.appearance.height} cm`];
  } else {
    data.appearance.height = [data.appearance.height , `${convertFeetToCentimeters(data.appearance.height)} cm`];
  }

  if (data.appearance['weight-unit'] === 'kg') {
    data.appearance.weight = [`${convertKilogramsToPounds(data.appearance.weight)} lb` , `${data.appearance.weight} kg`];
  } else {
    data.appearance.weight = [`${data.appearance.weight} lb`, `${convertPoundsToKliograms(data.appearance.weight)} kg`]
  }

  removeProperties(data.appearance, ['height-unit', 'weight-unit']);

  return data;
}

const removeProperties = function(object = {}, properties = []) {
  properties.forEach(property => {
    for (const [key] of Object.entries(object)) {
      if (key === property) {
        delete object[key];
      }
    }
  })
}

const clearUnnecessaryZeros = function(properties = []) {
  properties.forEach(property => {
    parseFloat(property);
    parseInt(property, 10);
  })
}

const convertFeetToCentimeters = function(number = 0) {
  return Math.round((parseFloat(number) * converterFeetAndCentimeters).toFixed(2));
}

const convertCentimetersToFeet = function(number = 0) {
  const length = parseFloat(number) / converterInchesAndCentimeters;
  const feet = Math.floor(length / inchesInFeet);
  const inches = length - inchesInFeet * feet;
  return `${feet}'${inches.toFixed(0)}`;
}

const convertPoundsToKliograms = function(number = 0) {
  return Math.round(parseFloat(number) * converterKilogramsAndPounds).toFixed(0);
}

const convertKilogramsToPounds = function (number = 0) {
  const length = parseFloat(number) / converterKilogramsAndOunces;
  const pounds = Math.floor(length / ouncesInPounds);
  const ounces = length - ouncesInPounds * pounds;
  return Math.round(pounds + Math.round(ounces).toFixed(0) / 10);
}


export const superheroesService = {
    getSuperHeroes,
    getSuperHero,
    addOwnHero
};