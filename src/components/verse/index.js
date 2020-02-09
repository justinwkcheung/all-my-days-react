import React, { Component } from "react";
import axios from "axios";

class Verse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      verse: "",
      translation: "",
    };
  }

  componentDidMount() {
    this.getVerse();
  }

  getVerse = () => {
    const clientID = process.env.CORE_CLIENT_ID

    axios.defaults.headers = {
      Authorization: `Client-ID ${clientID}`
    };

    const verses = JSON.parse(localStorage.getItem('allMyDaysVerses'));
    const today = new Date().toLocaleDateString();

    // Pick up from here next time, need to refactor, and fix UTC issue when localizing string time, basically too late in the day will think its tomorrow

    if (verses) {
      if (verses.today && new Date(verses.today.for_date).toLocaleDateString() === today) {
        console.log("TODAY");

        this.setState({
          verse: verses.today.body,
          translation: verses.today.translation
        });
      } else if (verses.tomorrow && new Date(verses.tomorrow.for_date).toLocaleDateString() === today) {
        console.log("TOMORROW");

        this.setState({
          verse: verses.tomorrow.body,
          translation: verses.tomorrow.translation
        });
        this.getVersesCall();
      } else if (verses.for_month && new Date(today.getFullYear(), today.getMonth(), 1).toLocaleDateString() === verses.for_month.for_date) {
        console.log("FOR MONTH");
        this.setState({
          verse: verses.for_month.body,
          translation: verses.for_month.translation
        });
        this.getVersesCall();
      }

      return false;
    }

      console.log("CATCH ALL");
      this.getVersesCall().then((data) => {
        this.setState({
          verse: data.today.body,
          translation: data.today.translation
        });
      });

  }

  getVersesCall = () => {
    const request = axios.get("http://localhost:3000/api/v1/verses", {
    }).then((response) => {
      if (response.data) {
        this.setVersesLocalInfo(response.data);
      }
      return response.data
    });

    return request;
  }

  setVersesLocalInfo = (versesObject) => {
    localStorage.setItem('allMyDaysVerses', JSON.stringify(versesObject));
  }

  renderVerse = () => {
    if (this.state.verse !== "") {
      return (
        <div>{`${this.state.verse} (${this.state.translation})`}</div>
      );
    }

    return null;
  }

  render() {
    return (
      this.renderVerse()
    )
  }
}

export default Verse;