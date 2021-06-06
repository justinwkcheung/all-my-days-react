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

  getDate(verseData) {
    var dateArray = verseData.attributes.for_date.split("-");
    var year = dateArray[0];
    var month = parseInt(dateArray[1], 10) - 1;
    var date = dateArray[2];
    var dateString = (new Date(year, month, date)).toLocaleDateString();
    return dateString;
  }

  getVerse = () => {
    // const clientID = process.env.CORE_CLIENT_ID

    // axios.defaults.headers = {
    //   Authorization: `Client-ID ${clientID}`
    // };

    const verses = JSON.parse(localStorage.getItem('allmydays_verses'));
    const today = new Date();

    if (verses) {
      const verseTodayDate = this.getDate(verses.data);
      if (verseTodayDate === today.toLocaleDateString()) {
        const today = verses.data.attributes;

        this.setState({
          verse: today.body,
          translation: today.translation
        });
        return false;
      }
    }

    console.log("No local data");
    this.getVersesCall().then((data) => {
      const verseToday = data.attributes
      this.setState({
        verse: verseToday.body,
        translation: verseToday.translation
      });
    });
  }

  getVersesCall = () => {
    const request = axios.get("http://localhost:3000/api/v1/verses", {
    }).then((response) => {
      if (response.data) {
        this.setVersesLocalInfo(response.data);
      }
      return response.data.data;
    });

    return request;
  }

  setVersesLocalInfo = (versesObject) => {
    localStorage.setItem('allmydays_verses', JSON.stringify(versesObject));
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
    );
  }
}

export default Verse;