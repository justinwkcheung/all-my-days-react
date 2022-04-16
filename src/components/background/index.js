import React, { Component } from "react";
import axios from "axios";

import IconHeart from "../../static/icons/heart.png";

const defaultBackground = "https://images.unsplash.com/photo-1546529249-8de036dd3c9a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2089&q=80"

class Background extends Component {
  constructor(props) {
    super(props);

    this.state = {
      backgroundUrl: "",
      backgroundSource: "",
      isToday: this.isToday(),
      showCreditText: false,
    };
  }

  componentDidMount() {
    this.setBackgroundImage();
  }

  setBackgroundImage = () => {
    if (this.state.isToday) {
      let background;
      const backgroundData = localStorage.getItem('allmydays_backgroundToday');

      try {
        background = JSON.parse(backgroundData);
      } catch (err) {
        if (typeof backgroundData == 'string') {
          background = backgroundData;
        }
      }

      if (background) {
        this.setState({
          // remove OR statements next release
          backgroundUrl: background.url || background,
          backgroundSource: background.source || ""
        });
        return true;
      }
    }

    this.getBackgroundImage().then((backgroundData) => {
      this.setBackgroundLocalInfo(backgroundData);
      let backgroundToSet = defaultBackground;
      let backgroundSource = this.state.backgroundSource;

      if (backgroundData[0].data) {
        backgroundToSet = backgroundData[0].data.attributes.file_url;
        backgroundSource = backgroundData[0].data.attributes.source;
      }

      this.setState({
        backgroundUrl: backgroundToSet,
        backgroundSource: backgroundSource
      });
    });
  }

  toggleShowCreditText = () => {
    this.setState({ showCreditText: !this.state.showCreditText });
  }

  getBackgroundImage = () => {
    axios.defaults.headers = {
      "Access-Control-Allow-Origin" : "*",
    };

    const request = axios.get("http://143.198.52.219/api/v1/backgrounds", {
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
    if (backgroundData[0].data) {
      localStorage.allmydays_backgroundToday =
      JSON.stringify({
        url: backgroundData[0].data.attributes.file_url,
        source: backgroundData[0].data.attributes.source
      });
    }
    if (backgroundData[1].data) {
      localStorage.allmydays_backgroundTomorrow =
      JSON.stringify({
        url: backgroundData[1].data.attributes.file_url,
        source: backgroundData[1].data.attributes.source
      });
    }
  }

  creditTextClass = () => {
    if (this.state.showCreditText) {
      return "credit-text seen";
    }

    return "credit-text";
  }

  renderCreditSection = () => {
    if (this.state.backgroundSource) {
      return (
        <section className="photo-credit-section"
          onMouseOver={this.toggleShowCreditText}
          onMouseOut={this.toggleShowCreditText}
        >
          <img src={IconHeart} alt={"heart"}></img>
          <p className={this.creditTextClass()}>Photo By {this.state.backgroundSource}</p>
        </section>
      );
    }

    return null;
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
        {this.renderCreditSection()}
      </div>
    )
  }
}

export default Background;