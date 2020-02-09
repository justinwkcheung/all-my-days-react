import React, { Component } from "react";

class Clock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      time: "",
      timeOfDay: ""
    };
  }

  componentDidMount() {
    this.setTime();
  }

  setTime = () => {
    const today = new Date();
    const hour = today.getHours();
    const minutes = today.getMinutes();
    const timeOfDay = hour < 12 ? "AM" : "PM";
    const formattedHour = this.formatHour(hour);
    const formattedMinutes = this.formatMinutes(minutes);
    const time = `${formattedHour}:${formattedMinutes}`;

    this.setState({
      time: time,
      timeOfDay: timeOfDay
    });
    setTimeout(() => {
      this.setTime()
    }, 500);
  }

  formatHour(hour) {
    if (hour > 12) {
      hour = hour - 12;
    } else if (hour === 0) {
      hour = 12;
    }

    return hour;
  }

  formatMinutes(minutes) {
    return minutes < 10 ? `0${minutes}` : minutes;
  }

  render() {
    return (
      <div className="current-time">
        {this.state.time}
      </div>
    );
  }
}

export default Clock;