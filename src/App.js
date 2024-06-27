
import axios from 'axios';
import './App.css';
import React from 'react';

class App extends React.Component {
  state = { advice: '', backgroundImage: '' };

  componentDidMount() {
    this.fetchAdvice();
    this.fetchRandomImage();
  }   // ensures that initial data is fetched as soon as the component mounts.
  
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
    axios.get("https://picsum.photos/1920/1080.jpg")
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
