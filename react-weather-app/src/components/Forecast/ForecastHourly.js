import React from "react";
import { useSelector } from "react-redux";

function ForecastHourly() {
	const data = useSelector((state) => state.weather.forecastHourly.data);
	const status = useSelector((state) => state.weather.forecastHourly.status);
    let arr = [];
    if (status === "success") {
		data.list.forEach((item) => {
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
		<div className="forecastHourly">
			{status === "success" &&
				data.list.map((item, key) => (
					<div className="card" key={key}>
						<p>{item.dt_txt.slice(11, 16)}</p>
						<img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt="" />

						<span className="feelsLikeDegree">
							<p>{Math.round(item.main.temp_min)}°C</p>
							<p>{Math.round(item.main.temp_max)}°C</p>
						</span>
						<p>{arr[key]}</p>
					</div>
				))}
		</div>
    );
}

export default ForecastHourly;
