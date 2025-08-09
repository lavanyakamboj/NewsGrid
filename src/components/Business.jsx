import React, { useEffect, useState } from "react";
import "../styles/categories.css";
import { fetchNewsByCategory } from "./NewsFetcher"; 
import { ClockLoader } from "react-spinners";

export default function Business() {
  document.title = "Business - NewsGrid";

  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchNewsByCategory("Business");
        setArticles(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load Business news.");
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  return (
    <div className="body-container">
      <div className="news-container">
        <h1 className="news-header">🎬 Business</h1>
        <main id="news-container">
          {loading && (
            <div className="loader-container">
              <ClockLoader color="#ffffff" />
            </div>
          )}

          {error && <p className="error-msg">{error}</p>}

          {!loading && !error && articles.length === 0 && (
            <p className="no-news-msg">No news found.</p>
          )}

          {!loading &&
            !error &&
            articles.map((article, index) => (
              <div className="news-card" key={index} style={{ animationDelay: `${index * 0.05}s` }}>
                <img src={article.image_url} alt="news" />
                <div className="news-content">
                  <h3>{article.title}</h3>
                  <p>
                    {article.description.length > 150 ? article.description.slice(0, 150) + "..." : article.description}
                  </p>
                  <a href={article.link} target="_blank" rel="noopener noreferrer" >
                    Read more →
                  </a>
                </div>
              </div>
            ))}
        </main>
      </div>
    </div>
  );
}
