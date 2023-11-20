import React from "react";
import { useSelector } from "react-redux";

function ForecastDaily() {
	const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
	const data = useSelector((state) => state.weather.forecastDaily.data);
	const status = useSelector((state) => state.weather.forecastDaily.status);
	const arr = [];
	if (status === "success") {
		data.forEach((item) => {
			let desc = "";
			item.weather[0].description.split(" ").forEach((word, key) => {
				if (key === 0) {
					desc += word[0].toUpperCase() + word.slice(1) + " ";
				} else {
					desc += word[0].toUpperCase() + word.slice(1);
				}
			});
			arr.push(desc);
		});
	}
	return (
		<div className="forecastDaily">
			{data.map((item, key) => (
				<div className="forecastDailyCard" key={key}>
					<p>{days[new Date((item.dt - 10800) * 1000).getDay() - 1]}</p>
					<img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt="" />
					<p>{arr[key]}</p>
					<span>
						<p>{Math.ceil(item.main.temp_min)}°C</p>
						<p>{Math.floor(item.main.temp_max)}°C</p>
					</span>
				</div>
			))}
		</div>
	);
}

export default ForecastDaily;
