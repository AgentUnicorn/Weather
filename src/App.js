// import React, {useEffect, useState} from 'react';
import React, { Component } from 'react';
import './App.css';
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import "bootstrap/dist/css/bootstrap.min.css";

// function App() {

//   let [weather, setWeather] = useState(null);

//   let currentWeather = async(lat, lon) => {
//     const api = "fb99a9091d0767ca14020c008ceef687"
//     let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&apiKey=${api}`
//     let data = await fetch(url)
//     let result = await data.json();

//     console.log("result", result)
//     setWeather(result)
//   }

//   let getLocation = () => {
//     navigator.geolocation.getCurrentPosition((position)=> {currentWeather(position.coords.latitude, position.coords.longitude)})
//   }

//   useEffect(getLocation,[])

//   return (
//     <div>
//       <h1>Weather App</h1>
//       <h2>{weather && weather.name}</h2>
//       <h3>Temperture</h3>
//       <p>Weather Discription</p>
//     </div>
//   );
// }

// export default App;

const override = css`
display: block;
margin: 0 auto;
border-color: red;
`;

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      weather: null
    };
    this.state = {
      loading: true
    };
  }

  currentWeather = async (lat, lon) => {
    const api = "fb99a9091d0767ca14020c008ceef687"
    let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&apiKey=${api}&units=metric`
    let data = await fetch(url)
    let result = await data.json();

    let errorMessage = (message) => {
      this.message = message;
      this.name ='loadingError';
    }

    if (url === undefined) {
      throw  new errorMessage('hello');
    }

    this.setState({weather:result});
    console.log("result", result)
  };

  catch (e) {
    console.error(e.message,e.name)
  }

  getLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      this.currentWeather(position.coords.latitude,
        position.coords.longitude);
    });
  };

  componentDidMount(){
    this.getLocation();
  }


  render() {
    if(this.state.weather == null) {
      return (
        <div className="sweet-loading">
        <ClipLoader
          css={override}
          size={150}
          color={"#123abc"}
          loading={this.state.loading}
        />
      </div>
      )
    }

    return (
      <div className="container-fluid background">
        <div className="container my-4 py-4">
          <div className="row justify-content-center text-center">
            <h1 className="col-12 display-4 my-2 py-3 text-success">Weather App</h1>
            <h2 className="col-12 text-dark">{this.state.weather.name}</h2>
            <h3 className="col-12 text-danger">{this.state.weather.main.temp}</h3>
            <p className="col-12 text-primary">{this.state.weather.weather[0].description}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default App;