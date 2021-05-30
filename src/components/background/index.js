import React, { Component } from "react";
import axios from "axios";

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
    this.getBackgroundImage().then((backgroundData) => {
      this.setBackgroundLocalInfo(backgroundData);
      this.setState({ backgroundUrl: backgroundData.data[0].attributes.file_url });
    });
  }

  getBackgroundImage = () => {
    const clientID = process.env.CORE_CLIENT_ID
    // const params = {
    //   w: 1920,
    //   h: 1080,
    //   orientation: "landscape",
    //   collections: "365,827743"
    // };

    axios.defaults.headers = {
      // Authorization: `Client-ID ${clientID}`
      "Access-Control-Allow-Origin" : "*",
    };

    const request = axios.get("http://localhost:3000/api/v1/backgrounds", {
    }).then((response) => {
      return response.data
    });

    return request;
  };

  isToday = () => {
    return localStorage.allmydays_date === new Date().toLocaleDateString();
  }

  setBackgroundLocalInfo = (imageUrl) => {
    localStorage.allmydays_date = new Date().toLocaleDateString();
    localStorage.backgroundUrl = imageUrl;
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