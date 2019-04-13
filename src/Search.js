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
      <li key={r.id} data-testid="result" data-name={r.name} className="list-group-item d-flex justify-content-between align-items-center">
        {r.name}
        <button data-testid="addBtn" className="btn btn-primary btn-sm" onClick={() => this.props.add(r)}>Add</button>
      </li>
    ));
  }

  renderResults(){
    return (
      this.state.results
        ? <div data-testid="searchRes" className="col-lg-10">
              <div className="bs-component">
                <ul className="list-group">
                  {this.results()}
                </ul>
              </div>
            </div>
        : null
    )
  }

  render() {
    return (
      <div className="row">
        <div className="col-lg-12">
        <form className="bs-component" onSubmit={this.search}>
          <div className="form-row">
            <div className="col-sm-10">
              <input
                className="form-control form-control-lg"
                onChange={this.saveQuery}
                placeholder="Search for Character by Name"
                data-testid="search"
                type="text" required/>
            </div>
            <div className="col-sm-2">
              <button className="btn btn-primary btn-lg" data-testid="searchBtn">Search</button>
            </div>
          </div>
        </form>
        {this.state.loading
          ? <div className="col-lg-12">
            <div className="bs-component">
              <div className="progress">
                <div className="progress-bar progress-bar-striped progress-bar-animated"
                  data-testid="searchRes"
                  role="progressbar"
                  aria-valuenow="75"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: "75%" }}>
                  Loading...
                </div>
              </div>
            </div>
          </div>
          : this.renderResults() }
        </div>
      </div>
    );
  }
}

export default Search;
