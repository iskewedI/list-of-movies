import React, { Component } from "react";

class Counter extends Component {
  state = {
    count: 1,
    items: ["item1", "item2", "item3"],
  };

  formatCount() {
    const { count } = this.state;
    const zeroWord = <h1>Zero</h1>;

    return count === 0 ? zeroWord : count;
  }

  handleIncrement = () => {
    this.setState({ count: this.state.count + 1 });
  };
  render() {
    return (
      <React.Fragment>
        <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        <button
          onClick={this.handleIncrement}
          className="btn btn-secondary btn-sm"
        >
          Increment
        </button>
        <div>
          <ul>
            {this.state.items.length === 0 && <h1>There are no tags!</h1>}
            {this.state.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </React.Fragment>
    );
  }

  getBadgeClasses() {
    return `badge m-2 badge-${this.state.count === 0 ? "warning" : "primary"}`;
  }
}

export default Counter;
