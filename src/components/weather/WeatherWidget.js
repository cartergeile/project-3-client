const WeatherWidget = (cityid) => { 
    if (cityid === 'n/a') {
        <div className="m-2">
            <em>Unable to retrieve weather data for this location.</em>
        </div>
    } else {
        <div id="openweathermap-widget-19"></div>
    
        window.myWidgetParam 
        ? 
        window.myWidgetParam 
        : 
        window.myWidgetParam = []  
        
        window.myWidgetParam.push({
            id: 19,
            cityid: {cityid},
            appid: 'dc2845f9bd781af2272c91ca53a8aabf',
            units: 'imperial',
            containerid: 'openweathermap-widget-19',  
        })  
        
        (function() {
            let script = document.createElement('script');script.async = true;script.charset = "utf-8";script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
            let s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(script, s);
        })();
    }
}

export default WeatherWidget