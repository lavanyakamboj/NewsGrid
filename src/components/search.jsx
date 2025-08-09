import React, { useEffect, useState } from "react";
import "../styles/search.css";
import { API_KEY_One } from "./index";
import { useLocation } from "react-router-dom";
import { ClockLoader } from "react-spinners";
import axios from "axios";

export default function SearchResults() {
  const [articles, setArticles] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  function isValidArticle(article) {
    return (
      article.title &&
      article.image_url &&
      article.title.trim() !== "" &&
      article.image_url.trim() !== ""
    );
  }

  async function fetchNews(query) {
    setLoading(true);
    setError(null);
    let nextPage = null;
    let results = [];
    let pagesFetched = 0;

    try {
      do {
        const url = `https://newsdata.io/api/1/news?apikey=${API_KEY_One}&country=in&language=en&q=${query}${
          nextPage ? `&page=${nextPage}` : ""
        }`;

        const response = await axios.get(url);
        const data = response.data;

        if (!Array.isArray(data.results)) break;

        const valid = data.results.filter(isValidArticle);
        results.push(...valid);

        nextPage = data.nextPage;
        pagesFetched++;
      } while (nextPage && pagesFetched < 3);

      if (results.length === 0) {
        setError("No results found.");
        setArticles([]);
      } else {
        setArticles(results);
        setSearchText(query);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch news.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const storedQuery = sessionStorage.getItem("searchQuery");
    if (!storedQuery) {
      setError("Invalid search. Please try again.");
      setLoading(false);
      return;
    }
    setSearchText(storedQuery);
    fetchNews(storedQuery);
  }, [location]);

  function truncateDescription(text, link) {
    const words = text.split(" ");
    if (words.length > 40) {
      const shortText = words.slice(0, 40).join(" ");
      return (
        <>
          {shortText}...{" "}
          <a href={link} target="_blank" rel="noreferrer">
            Read more
          </a>
        </>
      );
    }
    return text;
  }

  return (
    <div className="container">
      <h1>Search Results</h1>
      <div className="searchText">--- {searchText} ---</div>
      {/* ✅ Loader shown only when loading */}
      {loading ? (
        <div className="loader-container">
          <ClockLoader />
        </div>
      ) : error ? (
        <div style={{ color: "red" }}>{error}</div>
      ) : (
        <div className="news-grid">
          {articles.map((article, index) => (
            <div key={index} className="news-item">
              <img
                src={article.image_url}
                alt="News"
                loading="lazy"
                onError={(e) => (e.target.src = "fallback.jpg")}
              />
              <h2>{article.title}</h2>
              <p>
                {truncateDescription(article.description || "", article.link)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
