import React, { useEffect, useState } from "react";
import "../styles/styleHeadlines.css";
import { fetchNewsByCategory } from "./NewsFetcher";
import { ClockLoader } from "react-spinners";

export default function NewsSection() {
  document.title = "News headlines - NewsGrid";

  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const category = "top";

  useEffect(() => {
    const getNews = async () => {
      try {
        setLoading(true);
        const news = await fetchNewsByCategory(category);
        setArticles(news.slice(0, 50));
      } catch (err) {
        console.error("Error fetching news:", err.message || err);
        setError("Failed to load news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getNews();
  }, [category]);

  return (
    <>
      {loading ? (
          <div className="loader-container">
              <ClockLoader />
          </div>
      ) : error ? (
        <p className="error-msg">{error}</p>
      ) : (
        <div className="news-section">
          <h1 className="news-heading">News headlines</h1>
          {articles.map((article, index) => (
            <div className="article-box" key={index} style={{ animationDelay: `${index * 0.03}s` }}>
              <img className="article-img" src={article.image_url} alt="News"/>
              <div className="article-info">
                <h2>
                  <a href={article.link} target="_blank" rel="noopener noreferrer">
                    {article.title}
                  </a>
                </h2>
                <p>{article.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
