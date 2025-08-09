import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Search from "./components/search";
import Headlines from "./components/Headlines";
import Weather from "./components/Weather";
import Entertainment from "./components/Entertainment";
import Business from "./components/Business";
import Sports from "./components/Sports";
import Politics from "./components/politics";

import "./App.css";

export default function App(){
	return(
		<>
			<BrowserRouter>
				<Header/>
				<Routes>
					<Route path="/" element={<Home/>}/>
					<Route path="/search" element={<Search/>}/>
					<Route path="/headlines" element={<Headlines/>}/>
					<Route path="/weather" element={<Weather/>}/>
					<Route path="/entertainment" element={<Entertainment/>}/>
					<Route path="/business" element={<Business/>}/>
					<Route path="/sports" element={<Sports/>}/>
					<Route path="/politics" element={<Politics/>}/>
				</Routes>
				<Footer/>
			</BrowserRouter>
		</>
	);
}
