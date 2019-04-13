import React, { Component } from 'react';
const apiKey = '4349118c475b4f8fc68c3a2f780946b5';
const searchURL = `https://gateway.marvel.com:443/v1/public/characters?apikey=${apiKey}&`;

class Search extends Component {
  constructor(props){
    super(props);
    this.state = {
      results: null,
      query: "",
      loading: false
    }
    this.search = this.search.bind(this);
    this.saveQuery = this.saveQuery.bind(this);
  }


  search(event){
    event.preventDefault();
    const query = this.state.query;
    this.setState({
      loading: true
    });
    window.fetch(searchURL+'nameStartsWith='+encodeURIComponent(query))
    .then(response => response.json())
    .then(json => {
      this.setState({
        results: json.data.results,
        loading: false
      });
    })
  }

  saveQuery(event){
    // this.state.query = ""
    this.setState({
      query: event.target.value // = "Captain"
    });
  }

  results(){
    return this.state.results.map(r => (
      <div key={r.id} data-testid="result" data-name={r.name}>
        {r.name}
        <button data-testid="addBtn" onClick={() => this.props.add(r)}>Add</button>
      </div>
    ));
  }

  renderResults(){
    return (
      this.state.results
        ? <div data-testid="searchRes">{this.results()}</div>
        : null
    )
  }

  render() {
    return (
      <div>
        <form onSubmit={this.search}>
          <input onChange={this.saveQuery} data-testid="search" type="text" required/>
          <button data-testid="searchBtn">Add</button>
        </form>
        {this.state.loading ? <div data-testid="searchRes">Loading...</div> : this.renderResults() }
      </div>
    );
  }
}

export default Search;
