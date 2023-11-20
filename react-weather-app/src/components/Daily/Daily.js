import moment from "moment/moment";
import React from "react";
import { useSelector } from "react-redux";

function Daily() {
	const daily = useSelector((state) => state.weather.daily.data);
	const status = useSelector((state) => state.weather.daily.status);
	let w = "";
	let sunset = "";
	let sunrise = "";
	if (status === "success") {
		const desc = daily.weather[0].description.split(" ");
		desc.map((word) => (w += word[0].toUpperCase() + word.slice(1) + " "));

		//calculate sunrise and sunset

		sunset = moment(daily.sys.sunset * 1000).format("HH:mm a");
		sunrise = moment(daily.sys.sunrise * 1000).format("HH:mm a");
	}

	return (
		<div className="daily">
			{status === "success" && (
				<>
					<div className="dailyHeader">
						<p>
							{daily.name}, {daily.sys.country}
						</p>

						<img src={`https://openweathermap.org/img/wn/${daily.weather[0].icon}@2x.png`} alt="" />
					</div>
					<div className="temp">
						<p>{Math.round(daily.main.temp)}°C</p>
						<p>
							{Math.round(daily.main.temp_min)}°C / {Math.round(daily.main.temp_max)}°C{" "}
						</p>
						<p>Feels Like: {Math.round(daily.main.feels_like)}°C</p>
						<p>{w}</p>
					</div>
					<div className="parameters">
						<div className="item">
							<img src="/icons/sunrise.svg" alt="" />
							<p>{sunrise}</p>
						</div>
						<div className="item">
							<img src="/icons/sunset.svg" alt="" />
							<p>{sunset}</p>
						</div>
						<div className="item">
							<img src="/icons/barometer.svg" alt="" />
							<p>{daily.main.pressure} hPa</p>
						</div>
						<div className="item">
							<img src="/icons/humidity.svg" alt="" />
							<p>{daily.main.humidity}%</p>
						</div>
						<div className="item">
							<img src="/icons/wind.svg" alt="" />
							<p>{daily.wind.speed} m/s</p>
						</div>
						<div className="item">
							<img src="/icons/cloudy.svg" alt="" />
							<p>{daily.clouds.all}%</p>
						</div>
					</div>
				</>
			)}
		</div>
	);
}

export default Daily;
