import React from "react";
import "../styles/styleFooter.css"; 

export default function Footer() {
  return (
    <div className="footer">
      <p>© 2025 NewsDaily. All rights reserved.</p>
      <ul>
        {/* About */}
        <li> <a className="link-opacity-25-hover" href="#" data-bs-toggle="modal" data-bs-target="#about">About Us</a> 
        <div className="modal fade" id="about" tabIndex="-1"  aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5 fw-bold" id="exampleModalLabel">About Us</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body justified">
                  News Grid is a small yet meaningful front-end project developed using ReactJS. The primary goal of this website is to fetch and display the latest news articles dynamically through a news API. It reflects my growing skills in web development, particularly in working with APIs, building responsive layouts, and creating user-friendly interfaces. I’ve done my best to ensure the site works smoothly across all devices."
                </div>
              </div>
            </div>
          </div>
        </li>

        {/* Contact us */}
        <li> <a className="link-opacity-25-hover" href="#" data-bs-toggle="modal" data-bs-target="#contact">Contact Us</a> 
        <div className="modal fade" id="contact" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5 fw-bold" id="exampleModalLabel">Contact Us</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body justified">
                  We’d love to hear from you! Whether you have feedback, suggestions, or just want to say hello, feel free to get in touch.<br/> <br/>
                  Email: newsgrid@gmail.com<br/>
                  Phone: +91-97800-02378
                </div>
              </div>
            </div>
          </div>
        </li>

        {/* Policy */}
        <li>
          <a className="link-opacity-25-hover" href="#" data-bs-toggle="modal" data-bs-target="#policy">Policy </a>
          <div className="modal fade" id="policy" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5 fw-bold" id="exampleModalLabel">Policy</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body justified">
                  External Links<br />
                  News articles may link to external websites. We are not responsible for their content or privacy practices.<br /><br />
                  No User Accounts<br />
                  There is no login or registration on this site, so we do not store any personal credentials.<br /><br />
                  News From Third-Party API<br />
                  All news content is fetched from a public third-party news API. We do not control or store the news content.
                </div>
              </div>
            </div>
          </div>
        </li>

        {/* Overview */}
        <li>
          <a className="link-opacity-25-hover" href="#" data-bs-toggle="modal" data-bs-target="#overview">Overview </a>
          <div className="modal fade" id="overview" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5 fw-bold" id="exampleModalLabel">Overview</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body justified">
                  News Grid is a dynamic and responsive news website built using React.js, designed to fetch and display real-time news from live news APIs. The platform features intuitive navigation links to categories such as Headlines, Weather, Entertainment, Business, Sports, and Politics. It also includes a search functionality, allowing users to explore news based on custom keywords or topics of interest.<br/>As the news content is sourced from third-party APIs, occasional data or loading errors may occur depending on API response. Despite this, the project effectively demonstrates how to integrate live data into a modern frontend application and provides a clean, user-friendly experience across devices.
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}