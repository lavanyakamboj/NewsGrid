import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/styleheader.css";

export default function Header() {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [searchText, setSearchText] = useState("");
	const [currentTime, setCurrentTime] = useState("");
	const navigate = useNavigate();
	const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
	const closeSidebar = () => setSidebarOpen(false);

	const handleSearch = () => {
		if (searchText.trim()) {
			sessionStorage.setItem("searchQuery", searchText.trim()); //stores the searchquary to the browser's sessionStorage.
			navigate("/search");
		} else {
			alert("Please enter something to search.");
		}
	};

	const handleKeyPress = (event) => {
		if (event.key === "Enter") {
			handleSearch();
		}
	};

	const clearSearch = () => {
		setSearchText("");
	};

	useEffect(() => {
		const updateTime = () => {
			const now = new Date();   // creates a new Date object with the current date and time from the user's system
			const timeString = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit"});
			const dateString = now.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric"});
			setCurrentTime(`${timeString} | ${dateString}`);
		};
		updateTime(); // initial set
			const interval = setInterval(updateTime, 1000); // update every second
			return () => clearInterval(interval); // cleanup
		}, []);

	return (
		<>
			<div className="header">
				<div className="logo">
					<i className="fa-solid fa-newspaper"></i>
					<span>News</span> <span>Grid</span>
				</div>

				{/* Sidebar */}
				<ul className={`sidebar${sidebarOpen ? " open" : ""}`}>
					<button onClick={closeSidebar}>
						{" "}
						<i className="fa-solid fa-xmark"></i>{" "}
					</button>
					<br className="clear-all" />
					<li style={{ marginTop: "80px" }}>
						<Link to="/" onClick={closeSidebar}>
							Home
						</Link>
					</li>
					<li>
						<Link to="/headlines" onClick={closeSidebar}>
							Headlines
						</Link>
					</li>
					<li>
						<Link to="/weather" onClick={closeSidebar}>
							Weather
						</Link>
					</li>
					<li>
						<Link to="/entertainment" onClick={closeSidebar}>
							Entertainment
						</Link>
					</li>
					<li className="dropdown" style={{ paddingLeft: 20 }}>
						<span
							className="dropdown-toggle"
							data-bs-toggle="dropdown"
							role="button"
						>
							Other
						</span>
						<ul className="dropdown-menu">
							<li>
								<Link
									className="dropdown-item"
									to="/business"
									onClick={closeSidebar}
								>
									Business
								</Link>
							</li>
							<li>
								<Link
									className="dropdown-item"
									to="/sports"
									onClick={closeSidebar}
								>
									Sports
								</Link>
							</li>
							<li>
								<Link
									className="dropdown-item"
									to="/politics"
									onClick={closeSidebar}
								>
									Politics
								</Link>
							</li>
						</ul>
					</li>
				</ul>

				{/*navbar */}
				<nav className="navbar navbar-expand-lg">
					<div className="container-fluid">
						<button
							className="navbar-toggler"
							type="button"
							onClick={toggleSidebar}
							style={{ border: "none" }}
						>
							<span>
								<i className="fa-solid fa-bars"></i>
							</span>
						</button>
						<div className="collapse navbar-collapse">
							<ul className="navbar-nav">
								<li className="nav-item">
									<Link className="nav-link" to="/">
										Home
									</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" to="/headlines">
										Headlines
									</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" to="/weather">
										Weather
									</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" to="/entertainment">
										Entertainment
									</Link>
								</li>
								<li className="nav-item dropdown">
									<span
										className="nav-link dropdown-toggle"
										role="button"
										data-bs-toggle="dropdown"
										aria-expanded="false"
									>
										Other
									</span>
									<ul className="dropdown-menu">
										<li>
											<Link className="dropdown-item" to="/business">
												Business
											</Link>
										</li>
										<li>
											<Link className="dropdown-item" to="/sports">
												Sports
											</Link>
										</li>
										<li>
											<Link className="dropdown-item" to="/politics">
												Politics
											</Link>
										</li>
									</ul>
								</li>
							</ul>
						</div>
					</div>
				</nav>
			</div>

			{/* Search and Subscribe */}
			<div className="head-bottom">
				<div className="search">
					<input
						type="text"
						placeholder="Search news..."
						value={searchText}
						onChange={(event) => setSearchText(event.target.value)}
						onKeyDown={handleKeyPress}
					/>
					{searchText && (
						<span className="clear-icon" onClick={clearSearch}>
							<i className="fa-solid fa-xmark"></i>
						</span>
					)}
					<button onClick={handleSearch}>
						<i className="fa-solid fa-magnifying-glass search-icon"></i>
					</button>
				</div>
				<div className="local-time">{currentTime}</div>
			</div>
		</>
	);
}
