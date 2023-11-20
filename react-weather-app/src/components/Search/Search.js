import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AsyncPaginate } from "react-select-async-paginate";
import {
  getForecastDaily,
  getForecastHourly,
  getWeatherCity,
} from "../../redux/WeatherSlice";

function Search() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.weather.darkmode);
  const defaultCity = {
    value: "36.202033 36.161869",
  };
  dispatch(getWeatherCity(defaultCity));
  dispatch(getForecastHourly(defaultCity));
  dispatch(getForecastDaily(defaultCity));
  const option = {
    method: "GET",
    url: "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
    headers: {
      "X-RapidAPI-Key": "4019612f98msh79acfaf515dd398p156a92jsnad89244c6d47",
      "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
    },
  };

  const loadOptions = (inputValue) => {
    return axios
      .request(option, (option.params = { namePrefix: `${inputValue}` }))
      .then((response) => {
        return {
          options: response.data.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      })
      .catch((error) => console.log(error));
  };

  const onChangeHandler = (value) => {
    dispatch(getWeatherCity(value));
    dispatch(getForecastHourly(value));
    dispatch(getForecastDaily(value));
  };

  const handleClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (pos) {
        const city = {
          value: pos.coords.latitude + " " + pos.coords.longitude,
        };
        dispatch(getWeatherCity(city));
        dispatch(getForecastHourly(city));
        dispatch(getForecastDaily(city));
      });
    }
  };

  return (
    <div className="search">
      <div className="searchInput">
        <AsyncPaginate
          placeholder="Search for city"
          debounceTimeout={600}
          onChange={onChangeHandler}
          loadOptions={loadOptions}
        />
        <FontAwesomeIcon
          icon={faLocationDot}
          size="2x"
          color={theme ? "white" : ""}
          bounce
          onClick={handleClick}
        />
      </div>
    </div>
  );
}

export default Search;
