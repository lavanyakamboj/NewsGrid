import axios from "axios";
import { API_KEY } from "./index";
// This function fetches news articles by category (e.g., business, entertainment, etc.)
export const fetchNewsByCategory = async (category) => {
  // Make sure a category is provided
  if (!category) {
    throw new Error("Category is required.");
  }

 
  const cacheKey = "newsCache_" + category; //This line creates a string used as a key to store and find data in the browser's localStorage.
  const cachedNews = localStorage.getItem(cacheKey);  //This line checks the browser’s localStorage to see if we already have news saved for that specific category.


  // If we already have news saved for this category, return it immediately
  if (cachedNews) {
    return JSON.parse(cachedNews);
  }

  let allArticles = []; // To store all the news articles
  let nextPage = null;  // Used for pagination
  let pagesFetched = 0; // Count of how many pages we have fetched
  let seenTitles = [];  // To avoid duplicate news by title

  // Base URL to call the API
  const BASE_URL = `https://newsdata.io/api/1/news?apikey=${API_KEY}&country=in&language=en&category=${category}`;

  // Loop to fetch up to 5 pages of news
  while (pagesFetched < 5) {
    let url;

    // If nextPage exists, add it to the URL
    if (nextPage) {
      url = BASE_URL + `&page=${nextPage}`;
    } else {
      url = BASE_URL;
    }

    try {
      const response = await axios.get(url);
      const data = response.data;

      // If no results found, stop fetching
      if (!data.results || data.results.length === 0) {
        break;
      }

      // Filter out news articles without images, titles, or descriptions
      const validArticles = [];

      for (let i = 0; i < data.results.length; i++) {
        const article = data.results[i];
        const hasAllFields = article.image_url && article.title && article.description && !seenTitles.includes(article.title);
        if (hasAllFields) {
          validArticles.push(article);
          seenTitles.push(article.title); // Mark this title as seen
        }
      }
      // Add these valid articles to the full list
      allArticles = allArticles.concat(validArticles);

      // Move to the next page if available
      nextPage = data.nextPage;
      if (!nextPage) {
        break; // No more pages to fetch
      }
      pagesFetched++;
      
      // Wait for 1 second before next API call to avoid rate-limiting
      await new Promise((resolve) => setTimeout(resolve, 1000));

    } catch (error) {
      console.error("Error fetching news:", error);
      break;
    }
  }

  // If no articles were found, throw an error
  if (allArticles.length === 0) {
    throw new Error("No valid news found.");
  }

  // Save the articles in localStorage for future use
  localStorage.setItem(cacheKey, JSON.stringify(allArticles));

  // Return the news articles
  return allArticles;
};
