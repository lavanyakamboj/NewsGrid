import React, { useEffect, useState } from "react";
import "../styles/styleHome.css";
import {fetchNewsByCategory} from "./NewsFetcher";
import {useParams} from "react-router-dom";
import { ClockLoader } from "react-spinners";


export default function Home(props) {
  document.title = "NewsGrid";
  const Parameters = useParams(); // Get URL parameters
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  let category = "top";

  if (props.category) {
    category = props.category;
  } else if (Parameters.category) {
    category = Parameters.category;
  }

  useEffect(() => {
    const loadNews = async () => {
      try {
        const news = await fetchNewsByCategory(category);    //call the news fetcher component to fetch news
        setArticles(news);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // ✅ Always stop loading regardless of success or failure
      }
    };
    loadNews();
  }, [category]);

  return (
    <>
      {articles.length === 0 && !error && (
        <div className="loader-container">
          <ClockLoader />
        </div>
      )}

      {articles.length > 0 && (
        <>
          {/* Breaking News */}
          <div className="breaking-news">
            <div className="breaking-news-box">
              <div className="breaking-news-content">
                {articles[0] && (
                  <a href={articles[0].link} target="_blank" rel="noreferrer">
                    {/* Does the title contain the character | (a vertical bar), If yes, it splits the title and shows only the part after the |.If no, it shows the whole title. */}
                    
                    {articles[0].title.includes("|") ? articles[0].title.split("|")[1] : articles[0].title}
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="container">
            <div className="section1">
              {/* Carousel */}
              <div className="carousel-wrapper">
                <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel" data-bs-interval="2000">
                  <div className="carousel-inner">
                    {articles
                      .filter((a) => a.title.trim().split(" ").filter(word => word !== "").length <= 10)  // trim the + filter the words with empty spaxes " " + select that having words less than 10
                      .slice(0, 3)
                      .map((a, i) => (
                        <div className={`carousel-item${i === 0 ? " active" : ""}`} key={i}content >
                          <a href={a.link} target="_blank" rel="noreferrer">
                            <img className="d-block w-100" src={a.image_url} alt={a.title} onError={(e) => (e.target.src = "fallback.jpg")} />
                          </a>
                          <div className="carousel-caption d-md-block">
                            <h5>{a.title}</h5>
                            <p>
                              {a.description .split(" ") .slice(0, 20) .join(" ")}
                              {/* split function converts string words into array like -- "i am good" --> through split - ["i", "am" , "good "]   and slice function take only the number of words if slice(0,1) then it will take i , am */}
                              ...  
                              <a href={a.link} target="_blank" rel="noopener noreferrer" style={{ color: "lightblue", cursor: "pointer", marginLeft: "5px", textDecoration: "none" }}>
                                Read more
                              </a>
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>

                  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev" >
                    <span className="carousel-control-prev-icon" />
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next" >
                    <span className="carousel-control-next-icon" />
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>

              {/* Latest News */}
              <div className="latest">
                <a href="#" className="latest-news">
                  Latest News
                </a>
                <div className="newsLinks">
                  {articles.slice(3, 30).map((a, i) => (
                    <div key={i}>
                      <a href={a.link} target="_blank" className="latest-news-link" rel="noreferrer">
                        {a.title}
                      </a>
                      <br />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top News */}
            <div className="topNews-box">
              <div className="topNewsTitle">Top News</div>
              <div className="news-grid">
                {articles.slice(30, 34).map((a, i) => (
                  <a href={a.link} target="_blank" className="Top-news-card" key={i} rel="noreferrer" >
                    <img src={a.image_url} alt="" className="Top-news-img" onError={(e) => (e.target.src = "fallback.jpg")}/>
                    <div className="Top-news-text">
                      {a.description.split(" ").slice(0, 30).join(" ")}...
                      <a href={a.link} target="_blank" rel="noopener noreferrer" style={{ color: "lightblue", cursor: "pointer", marginLeft: "5px", textDecoration: "none" }}>
                        Read more
                      </a>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Error Message */}
      {error && (
        <div style={{ color: "red", fontSize: "18px", textAlign: "center", marginTop: "20px"}}>
          ⚠️ {error}
        </div>
      )}
    </>
  );
}
