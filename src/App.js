import React, { Component } from 'react';
import Characters from './Characters';
import Search from './Search';
import './App.css';

const Nav = (props) => (
  <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
    <div className="container">
      <a href="../" className="navbar-brand">My Favorite Marvel</a>
    </div>
  </div>
);

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      characters: []
    }
    this.addCharacter = this.addCharacter.bind(this);
  }

  addCharacter(c){
    this.setState({
      characters: this.state.characters.concat([c])
    });
  }

  render() {
    return (
      <div className="App">
        <Nav/>
        <div className="container">
          <Characters chars={this.state.characters}/>
          <Search add={this.addCharacter} />
        </div>
      </div>
    );
  }
}

export default App;
