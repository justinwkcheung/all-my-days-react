import React, { Component } from "react";

class Welcome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      nameSubmitted: false
    };
  }

  componentDidMount() {
    if (localStorage.allMyDaysName) {
      this.setState({
        nameSubmitted: true,
        name: localStorage.allMyDaysName
      });
    }
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ name: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.name !== "") {
      this.setState({ nameSubmitted: true });
      localStorage.allMyDaysName = this.state.name;
    }
  }

  changeName = () => {
    this.setState({ nameSubmitted: false });
  }

  cancelChange = () => {
    if (this.state.name !== "") {
      this.setState({ nameSubmitted: true });
      localStorage.allMyDaysName = this.state.name;
    }
  }

  renderName() {
    if (this.state.nameSubmitted) {
      return (
        <div className="welcome-name" onClick={this.changeName}>
          Rise and shine, {this.state.name}
        </div>
      );
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input className="name-input" type="text" autoFocus value={this.state.name} onChange={this.handleChange} onBlur={this.cancelChange} placeholder="What's your name?" />
        </form>
      </div>
    );
  }

  render() {
    return (
      this.renderName()
    );
  }
}

export default Welcome;