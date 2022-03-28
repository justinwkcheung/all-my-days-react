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
      hour: formattedHour,
      minutes: formattedMinutes,
      time: time,
      timeOfDay: timeOfDay
    });
    setTimeout(() => {
      this.setTime()
    }, 500);
  }

  formatHour(hour) {
    if (hour > 12) {
      hour -= 12;
    } else if (hour === 0) {
      hour = 12;
    }

    if (hour < 10) {
      hour = `0${hour}`;
    }

    return hour.toString();
  }

  formatMinutes(minutes) {
    return minutes < 10 ? `0${minutes}` : minutes;
  }

  render() {
    return (
      <div className="current-time">
        <div className="time-digits hour">{this.state.hour}</div>
        <div className="time-digits minutes">{this.state.minutes}</div>
      </div>
    );
  }
}

export default Clock;