import axios from "axios";

let createAxiosConfig = (accessToken) => {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    }
  }
}

export const searchClientById = (accessToken, IDType, IDNumber) => {
  const requestBody = {
    data: {
      IDType,
      IDNumber
    }
  };

  return axios.post(`${process.env.REACT_APP_API_CLIENT}/search`, requestBody, createAxiosConfig(accessToken));
};

export const authTokenRequest = () => {
  let inputString = `${process.env.REACT_APP_USER_POOL_APP_CLIENT_ID}:${process.env.REACT_APP_USER_POOL_APP_CLIENT_SECRET}`;
  let buffer = new Buffer(inputString);
  let base64Auth = buffer.toString("base64");

  const axiosAuthConfig = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${base64Auth}`,
    },
  };

  const requestBody = 'grant_type=client_credentials';

  return axios.post(`${process.env.REACT_APP_API_AUTH}`, requestBody, axiosAuthConfig);
};
