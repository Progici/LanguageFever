import dotenv from 'dotenv';
dotenv.config();

export const ApiConfig = {
  // Use the environment variable for the API URL
  API_URL: process.env.BACKEND_URL,
};
