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

  getDate(verses) {
    var dateArray = verses[0].attributes.for_date.split("-");
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

    const verses = JSON.parse(localStorage.getItem('allMyDaysVerses'));
    const today = new Date();

    // Pick up from here next time, need to refactor because verse of month works now but the date conversations are too complicated, perhaps use luxon instead

    if (verses) {
      const verseTodayDate = this.getDate(verses);
      if (verseTodayDate === today.toLocaleDateString()) {
        console.log("TODAY");
        const today = verses[0].attributes;

        this.setState({
          verse: today.body,
          translation: today.translation
        });
        return false;
      // } else if (verses.tomorrow && new Date(verses.tomorrow.for_date.replace(/-/g, '')).toLocaleDateString() === today.toLocaleDateString()) {
      //   console.log("TOMORROW");

      //   this.setState({
      //     verse: verses.tomorrow.body,
      //     translation: verses.tomorrow.translation
      //   });
      //   this.getVersesCall();
      //   return false;
      // } else if (verses.beginning_of_month && new Date(today.getFullYear(), today.getMonth(), 1).toLocaleDateString() === new Date(verses.beginning_of_month.for_date.replace(/-/g, '')).toLocaleDateString()) {
      //   console.log("FOR MONTH");
      //   this.setState({
      //     verse: verses.beginning_of_month.body,
      //     translation: verses.beginning_of_month.translation
      //   });
      //   this.getVersesCall();
      //   return false;
      }
    }

    console.log("CATCH ALL");
    this.getVersesCall().then((data) => {
      const verseToday = data[0].attributes
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
        this.setVersesLocalInfo(response.data.data);
      }
      return response.data.data;
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
    );
  }
}

export default Verse;