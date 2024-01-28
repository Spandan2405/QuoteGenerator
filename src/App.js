import axios from 'axios';
import './App.css';
import React from 'react';

class App extends React.Component {
  state = { advice: '', backgroundImage: '' };

  componentDidMount() {
    this.fetchAdvice();
    this.fetchRandomImage();
  }

  fetchAdvice = () => {
    axios.get("https://api.adviceslip.com/advice")
      .then((response) => {
        const { advice } = response.data.slip;
        this.setState({ advice });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  fetchRandomImage = () => {
    axios.get("https://source.unsplash.com/random/1920x1080/?nature")
      .then((response) => {
        const backgroundImage = response.request.responseURL;
        this.setState({ backgroundImage });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { advice, backgroundImage } = this.state;
    const backgroundStyle = backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {};

    return (
      <div className='app' style={backgroundStyle}>
        <div className='card'>
          <h1 className='heading'>{advice}</h1>
          <button className='button' onClick={() => { this.fetchAdvice(); this.fetchRandomImage(); }}>
            <span>GIVE ME ADVICE!</span>
          </button>
        </div>
      </div>
    );
  }
}

export default App;
