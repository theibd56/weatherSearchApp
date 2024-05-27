import { useState } from "react";

import './searchPanel.scss';
import searchImg from '../../resources/search-normal.svg';
import drop from '../../resources/drop.svg';
import solar_temperature from '../../resources/solar_temperature-linear.svg';
import windImage from '../../resources/wind.svg';

const SearchPanel = () => {

    const [city, setCity] = useState('Your City');
    const [temp, setTemp] = useState(28);
    const [icon, setIcon] = useState("03d");
    const [description, setDescription] = useState("scattered clouds");
    const [humidity, setHumidity] = useState(35);
    const [wind, setWind] = useState(3.74);
    const [inputValue, setInputValue] = useState('');
    const [dt, setDt] = useState(0);

    const timeRequest = new Date(dt * 1000)

    const timeOptions = {  
        hour:  'numeric', 
        hour12 : true,
        minute : 'numeric'
    };

    const _apiKey = 'b387d43b771fe20d3b3eab2f49ea6426';   

    const getWeather = async (city) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${_apiKey}`)
        .then((response) => {
            if (!response.ok) {
                alert("No weather found");
                throw new Error("No weather found");
            }
            return response.json();
        })
        .then((data) => _transformWeather(data));;
    }

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
                    <button type="button" className='searchPanel__button' onClick={searchWeather}><img src={searchImg} alt="search-normal" /></button>
                </div>
                <div className='searchPanel-content'>
                    <div className="searchPanel-content-city">
                        Weather in {city}
                    </div>
                    <div className="searchPanel-content-time">
                        {timeRequest.toLocaleString('en-US', timeOptions)}
                    </div>
                </div>
                <div className='searchPanel-weather'>
                    <div className="searchPanel-weather-item">
                        <img src={solar_temperature} alt="solar_temperature" className="searchPanel-weather-item-img"></img>
                        <div className="searchPanel-weather-item-content">
                        {temp} °C
                        </div>
                    </div>
                    <div className="searchPanel-weather-item">
                        <img src={"https://openweathermap.org/img/wn/" + icon + ".png"} alt="sun" className="searchPanel-weather-item-img"></img>
                        <div className="searchPanel-weather-item-content">
                        {description}
                        </div>
                    </div>
                    <div className="searchPanel-weather-item">
                        <img src={drop} alt="drop" className="searchPanel-weather-item-img"></img>
                        <div className="searchPanel-weather-item-content">
                        {humidity} %
                        </div>
                    </div>
                    <div className="searchPanel-weather-item">
                        <img src={windImage} alt="wind" className="searchPanel-weather-item-img"></img>
                        <div className="searchPanel-weather-item-content">
                        {wind} km/h
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchPanel