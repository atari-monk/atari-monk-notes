//npm install axios
const axios = require('axios');

async function getDataFromApi() {
  try {
    const response = await axios.get('https://api.example.com/data');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching data from API');
  }
}
