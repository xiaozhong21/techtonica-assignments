import React, { useState, useEffect } from 'react';
import WeatherResult from './WeatherResult';
import './WeatherCard.scss';

function Weather() {
  const [postcodeInput, setPostcodeInput] = useState('');
  const [displayResult, setDisplayResult] = useState(false);
  const [error, setError] = useState(false);
  
  //States for WeatherResult child component
  const [date, setDate] = useState([]);
  const [temp, setTemp] = useState([]);
  const [highTemp, setHighTemp] = useState([]);
  const [lowTemp, setLowTemp] = useState([]);
  const [humidity, setHumidity] = useState([]);
  const [wind, setWind] = useState([]);
  const [currentCondition, setCurrentCondition] = useState([]);
  const [cityName, setCityName] = useState('');
  const [sunrise, setSunrise] = useState('');
  const [sunset, setSunset] = useState('');
  const [icons, setIcons] = useState([]);
  const [iconUrl, setIconUrl] = useState([]);

  function handleInputChange(e) {
    e.persist();
    setPostcodeInput(e.target.value);
    setDisplayResult(false);
    setError(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (handleValidation()) {   
      setError(false);
      let zip = {
        zip: postcodeInput
      }
      fetch('http://localhost:4001/search-location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(zip)
      })
      .then((response) => {
        console.log(response);
        setDisplayResult(true);
      })
      .catch(error => {
        console.log('Error: ', error);
        setError(true);
      })
    } else {
      setError(true)
    }
  }

  function handleValidation() {
    let regex = /^(\d{5})$/;
    return regex.test(postcodeInput);
  }

async function fetchWeather() {
  let response = await fetch('http://localhost:4001/weather');
  await response.json().then(data => {   
    setDate(() => {
      let result = [];
      for (let i = 0; i < 40; i += 8) {
        let dayOfWeek = new Date(data.list[i].dt * 1000).toLocaleString("en-US", {weekday: "long"});
        result.push(dayOfWeek);
      }
      return result;
    });
    setTemp(() => {
      let result = [];
      for (let i = 0; i < 40; i += 8) {
        result.push(Math.round((data.list[i].main.temp - 273.15) * 9/5 + 32) + '°F');
      }
      return result;
    });
    setHighTemp(() => {
      let result = [];
      for (let i = 0; i < 40; i += 8) {
        result.push(Math.round((data.list[i].main.temp_max - 273.15) * 9/5 + 32) + '°F');
      }
      return result;
    });
    setLowTemp(() => {
      let result = [];
      for (let i = 0; i < 40; i += 8) {
        result.push(Math.round((data.list[i].main.temp_min - 273.15) * 9/5 + 32) + '°F');
      }
      return result;
    });
    setHumidity(() => {
      let result = [];
      for (let i = 0; i < 40; i += 8) {
        result.push(data.list[i].main.humidity + '%');
      }
      return result;
    });
    setWind(() => {
      let result = [];
      for (let i = 0; i < 40; i += 8) {
        result.push(Math.round(data.list[i].wind.speed) + ' mph');
      }
      return result;
    });
    setCurrentCondition(() => {
      let result = [];
      for (let i = 0; i < 40; i += 8) {
        result.push(data.list[i].weather[0].main);
      }
      return result;
    });
    setCityName(data.city.name);
    setSunrise(data.city.sunrise);
    setSunset(data.city.sunset);
    setIcons(() => {
      let result = [];
      for (let i = 0; i < 40; i += 8) {
        result.push(data.list[i].weather[0].icon);
      }
      return result;
    });
  });
}

useEffect(() => {
  setIconUrl(() => {
    let result = [];
    for (let icon of icons) {
      result.push("http://openweathermap.org/img/wn/" + icon + ".png");
    }
    return result;
  })
}, [icons])

  return (
    <article className="tile is-child notification is-warning">
      <div className='columns'>
        <div className="column">
          <div className='card WeatherCard'>
            <div className="card-content WeatherCard__content">
              <form onSubmit={handleSubmit}>
                <p className="title">Weather</p>
                <p className="subtitle">Check weather by entering postcode</p>
                <div>
                  <div className="field">
                    <label className="label">Zipcode</label>
                    <div className="control" style={{textAlign: 'center'}}>
                      <input style={{width: '250px'}} 
                        className="input"
                        type="text"
                        placeholder="Your 5-digit zipcode here"
                        onChange={handleInputChange}
                        required 
                      />
                        {error ? <span>Please check your postcode input</span> : null}
                    </div>
                  </div>
                  <div className="field">
                    <div className="control" style={{textAlign: 'center'}}>
                      <input
                        type='submit'
                        className="button is-light is-large"
                        value='Search'
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="column">
          {displayResult ? <WeatherResult fetchWeather={fetchWeather} date={date[0]} temp={temp[0]} highTemp={highTemp[0]} lowTemp={lowTemp[0]} humidity={humidity[0]} wind={wind[0]} currentCondition={currentCondition[0]} cityName={cityName} sunrise={sunrise} sunset={sunset} icons={icons[0]} iconUrl={iconUrl[0]} /> : null}
        </div>
      </div>
      <div className='columns'>
        <div className="column">
          {displayResult ? <WeatherResult fetchWeather={fetchWeather} date={date[1]} temp={temp[1]} highTemp={highTemp[1]} lowTemp={lowTemp[1]} humidity={humidity[1]} wind={wind[1]} currentCondition={currentCondition[1]} cityName={cityName} sunrise={sunrise} sunset={sunset} icons={icons[1]} iconUrl={iconUrl[1]} /> : null}
        </div>
        <div className="column">
          {displayResult ? <WeatherResult fetchWeather={fetchWeather} date={date[2]} temp={temp[2]} highTemp={highTemp[2]} lowTemp={lowTemp[2]} humidity={humidity[2]} wind={wind[2]} currentCondition={currentCondition[2]} cityName={cityName} sunrise={sunrise} sunset={sunset} icons={icons[2]} iconUrl={iconUrl[2]} /> : null}
        </div>
        <div className="column">
          {displayResult ? <WeatherResult fetchWeather={fetchWeather} date={date[3]} temp={temp[3]} highTemp={highTemp[3]} lowTemp={lowTemp[3]} humidity={humidity[3]} wind={wind[3]} currentCondition={currentCondition[3]} cityName={cityName} sunrise={sunrise} sunset={sunset} icons={icons[3]} iconUrl={iconUrl[3]} /> : null}
        </div>
        <div className="column">
          {displayResult ? <WeatherResult fetchWeather={fetchWeather} date={date[4]} temp={temp[4]} highTemp={highTemp[4]} lowTemp={lowTemp[4]} humidity={humidity[4]} wind={wind[4]} currentCondition={currentCondition[4]} cityName={cityName} sunrise={sunrise} sunset={sunset} icons={icons[4]} iconUrl={iconUrl[4]} /> : null}
        </div>
      </div>
    </article>
  )
}                      

export default Weather;