import React, { Component } from 'react';
import Characters from './Characters';
import Search from './Search';
import './App.css';

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
        <Characters chars={this.state.characters}/>
        <Search add={this.addCharacter} />
      </div>
    );
  }
}

export default App;
