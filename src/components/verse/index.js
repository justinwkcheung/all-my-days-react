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
    const today = new Date();

    // Pick up from here next time, need to refactor because verse of month works now but the date conversations are too complicated, perhaps use luxon instead

    if (verses) {
      if (verses.today && new Date(verses.today.for_date.replace(/-/g, '\/')).toLocaleDateString() === today.toLocaleDateString()) {
        console.log("TODAY");

        this.setState({
          verse: verses.today.body,
          translation: verses.today.translation
        });
        return false;
      } else if (verses.tomorrow && new Date(verses.tomorrow.for_date.replace(/-/g, '\/')).toLocaleDateString() === today.toLocaleDateString()) {
        console.log("TOMORROW");

        this.setState({
          verse: verses.tomorrow.body,
          translation: verses.tomorrow.translation
        });
        this.getVersesCall();
        return false;
      } else if (verses.beginning_of_month && new Date(today.getFullYear(), today.getMonth(), 1).toLocaleDateString() === new Date(verses.beginning_of_month.for_date.replace(/-/g, '\/')).toLocaleDateString()) {
        console.log("FOR MONTH");
        this.setState({
          verse: verses.beginning_of_month.body,
          translation: verses.beginning_of_month.translation
        });
        this.getVersesCall();
        return false;
      }
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