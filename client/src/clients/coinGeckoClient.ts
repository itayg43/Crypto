import axios from 'axios';

const coinGeckoClient = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
});

export default coinGeckoClient;
