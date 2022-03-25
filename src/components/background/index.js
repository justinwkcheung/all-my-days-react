import React, { Component } from "react";
import axios from "axios";

const defaultBackground = "https://images.unsplash.com/photo-1508615039623-a25605d2b022?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2089&q=80"

class Background extends Component {
  constructor(props) {
    super(props);

    this.state = {
      backgroundUrl: "",
      isToday: this.isToday(),
    };
  }

  componentDidMount() {
    this.setBackgroundImage();
  }

  setBackgroundImage = () => {
    if (this.state.isToday) {
      const background = localStorage.getItem('allmydays_backgroundToday');
      if (background) {
        this.setState({ backgroundUrl: background });
        return true;
      }
    }

    this.getBackgroundImage().then((backgroundData) => {
      this.setBackgroundLocalInfo(backgroundData);
      let backgroundToSet = defaultBackground;

      if (backgroundData[0].data.attributes.file_url) {
        backgroundToSet = backgroundData[0].data.attributes.file_url;
      }

      this.setState({ backgroundUrl: backgroundToSet });
    });
  }

  getBackgroundImage = () => {
    axios.defaults.headers = {
      "Access-Control-Allow-Origin" : "*",
    };

    const request = axios.get("http://143.198.52.219//api/v1/backgrounds", {
    }).then((response) => {
      return response.data;
    });

    return request;
  };

  isToday = () => {
    return localStorage.allmydays_date === new Date().toLocaleDateString();
  }

  setBackgroundLocalInfo = (backgroundData) => {
    localStorage.allmydays_date = new Date().toLocaleDateString();
    localStorage.allmydays_backgroundToday = backgroundData[0].data.attributes.file_url;
    localStorage.allmydays_backgroundTomorrow = backgroundData[1].data.attributes.file_url;
  }

  render() {
    return (
      <div
        className="background"
        style={{ backgroundImage:
          `radial-gradient(#0000008f, transparent),
          url("${this.state.backgroundUrl}")`
        }}
      >
      </div>
    )
  }
}

export default Background;