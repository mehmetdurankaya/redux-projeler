import { faGithub, faInstagram, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { darkSwitch } from "../../redux/WeatherSlice";

function Footer() {
	const dispatch = useDispatch();
	const theme = useSelector((state) => state.weather.darkmode);
	const openUrl = (link) => {
		switch (link) {
			case "twitter":
				window.open("https://twitter.com/mehmetdurankaya", "_blank", "noreferrer");
				break;
			case "instagram":
				window.open("https://www.instagram.com/kayamehmetduran", "_blank", "noreferrer");
				break;
			case "github":
				window.open("https://github.com/mehmetdurankaya", "_blank", "noreferrer");
				break;
			case "linkedin":
				window.open("https://www.linkedin.com/in/mehmetdurankaya/", "_blank", "noreferrer");
				break;
			default:
				break;
		}
	};

	const themeHandler = () => {
		dispatch(darkSwitch());
		document.documentElement.setAttribute("data-theme", theme ? "light" : "dark");
	};

	return (
		<div className="footer">
			<div className="darkmode" onClick={themeHandler}>
				{theme ? "Switch Light Mode" : "Switch Dark Mode"}
			</div>
			<div className="icons">
				<FontAwesomeIcon icon={faTwitter} size="2x" onClick={() => openUrl("twitter")} />
				<FontAwesomeIcon icon={faInstagram} size="2x" onClick={() => openUrl("instagram")} />
				<FontAwesomeIcon icon={faGithub} size="2x" onClick={() => openUrl("github")} />
				<FontAwesomeIcon icon={faLinkedin} size="2x" onClick={() => openUrl("linkedin")} />
			</div>
			<p>©mehmetdurankaya</p>
		</div>
	);
}

export default Footer;
