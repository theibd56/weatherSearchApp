const WeatherItem = ({ src, alt, content }) => (
    <div className="searchPanel-weather-item">
        <img src={src} alt={alt} className="searchPanel-weather-item-img" />
        <div className="searchPanel-weather-item-content">
            {content}
        </div>
    </div>
);

export default WeatherItem;