import Constants from 'expo-constants';

const mode = 'cors';
const credentials = 'same-origin';
const headers = {
  "Content-Type": "application/json",
};


const localUrl = 'http://localhost:8080';
const baseUrl = getBaseUrl();

console.log('baseUrl: ', baseUrl);



async function post(route, data)
{
  try {
    const url = baseURL + route;
    const res = await fetch(url, {
      method: "POST", 
      mode,
      credentials,
      headers,
      body: JSON.stringify(data),
    });

    return res.text();
  } catch(e) {
    console.error(e);
    return false;
  }
}

async function get(route)
{
  try {
    const url = baseURL + route;
    const res = await fetch(url, {
      method: "GET",
      mode,
      credentials,
      headers,
    });

    return res.text();
  } catch(e) {
    console.error(e);
    return false;
  }

}


function getBaseUrl(env, url)
{
  const { nodeEnv, apiUrl } = Constants.expoConfig.extra;

  if(nodeEnv === 'production') return apiUrl;
  return localUrl
}


export default { post, get };
