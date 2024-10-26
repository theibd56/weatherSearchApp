import { useState } from "react";

import './searchPanel.scss';
import searchImg from '../../resources/search-normal.svg';
import drop from '../../resources/drop.svg';
import solar_temperature from '../../resources/solar_temperature-linear.svg';
import windImage from '../../resources/wind.svg';

import WeatherItem from "../weatherItem/WeatherItem";
import {useHttp} from "../../hooks/http.hook";

const SearchPanel = () => {
    const {request} = useHttp();

    const [city, setCity] = useState(null);
    const [temp, setTemp] = useState(null);
    const [icon, setIcon] = useState(null);
    const [description, setDescription] = useState(null);
    const [humidity, setHumidity] = useState(null);
    const [wind, setWind] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [dt, setDt] = useState(0);

    const timeRequest = new Date(dt * 1000)

    const timeOptions = {  
        hour:  'numeric', 
        hour12 : true,
        minute : 'numeric'
    };

    //A test key to ensure operability
    const _apiKey = 'b387d43b771fe20d3b3eab2f49ea6426';

    const getWeather = async (city) => {
        const res = await request(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${_apiKey}`);
        if(res !== undefined) {
            return _transformWeather(res)
        }

    };

    const _transformWeather = (data) => {
        setCity(city => data.name);
        setTemp(temp => data.main.temp);
        setIcon(icon => data.weather[0].icon);
        setDescription(description => data.weather[0].main);
        setHumidity(humidity => data.main.humidity);
        setWind(wind => data.wind.speed)
        setDt(dt => data.dt)
    }

    const searchWeather = () => {
        getWeather(inputValue)
    }

    const onKeyUp = (e) => {
        if(e.key === 'Enter') {
            getWeather(inputValue)
        }
    }

    return (
        <div className="container">
            <div className='searchPanel'>
                <div className='searchPanel-form'>
                    <input type="text"
                           placeholder="Please enter your city"
                           className='searchPanel__input'
                           value={inputValue}
                           required
                           onChange={(e) => setInputValue(e.target.value)}
                           onKeyUp={onKeyUp}/>
                    <button type="button"
                            className='searchPanel__button'
                            onClick={searchWeather}>
                        <img src={searchImg} alt="search-normal"/>
                    </button>
                </div>
                <div className='searchPanel-content'>
                    <div className={city !== null && dt !== null ? 'searchPanel-content-city' : 'searchPanel-content-null'}>
                        {
                            city !== null && dt !== null ?
                                (`Weather in ${city} at ${timeRequest.toLocaleString('en-US', timeOptions)}`) :
                                (`To find out the weather in the place you are interested in, fill in the field in the form above.`)
                        }
                    </div>
                </div>

                <div className='searchPanel-weather'>
                    {temp !== null && (
                        <WeatherItem
                            src={solar_temperature}
                            alt="solar_temperature"
                            content={`${temp} °C`}
                        />
                    )}
                    {description !== null && (
                        <WeatherItem
                            src={`https://openweathermap.org/img/wn/${icon}.png`}
                            alt="weather icon"
                            content={description}
                        />
                    )}
                    {humidity !== null && (
                        <WeatherItem
                            src={drop}
                            alt="drop"
                            content={`${humidity} %`}
                        />
                    )}
                    {wind !== null && (
                        <WeatherItem
                            src={windImage}
                            alt="wind"
                            content={`${wind} km/h`}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}



export default SearchPanel