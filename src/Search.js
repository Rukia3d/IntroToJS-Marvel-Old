import React, { Component } from 'react';
import request from './data/captain.json';

//const apiKey = '4349118c475b4f8fc68c3a2f780946b5';
//const searchURL = `https://gateway.marvel.com:443/v1/public/characters?apikey=${apiKey}&`;

const Item = (props) => (
  <li key={props.r.id} data-testid="result" data-name={props.r.name}
    className={"list-group-item d-flex justify-content-between align-items-center" + (props.highlights.some(str => props.r.name.includes(str)) ? ' highlighted' : '')}>
    <span data-testid="res-name">{props.r.name}</span>
    <button data-testid="addBtn" className="btn btn-primary btn-sm" onClick={() => props.onClick(props.r)}>Add</button>
  </li>
)

class Search extends Component {
  constructor(props){
    super(props);
    this.state = {
      results: null,
      query: "",
      loading: false,
      highlight: false
    }
    this.search = this.search.bind(this);
    this.saveQuery = this.saveQuery.bind(this);
    this.removeResult = this.removeResult.bind(this);
    this.toggleHighlight = this.toggleHighlight.bind(this);
  }

  highlights() {
    if (this.state.highlight) {
      return ['(', ')'];
    } else {
      return [];
    }
  }

  search(event){
    event.preventDefault();
    this.setState({
      loading: true
    });
    //const query = this.state.query;
    // window.fetch(searchURL+'nameStartsWith='+encodeURIComponent(query))
    // .then(response => response.json())
    // .then(json => {
    //   this.setState({
    //     results: json.data.results,
    //     loading: false
    //   });
    // })

    this.setState({
      loading: false,
      results: request.data.results
    });
  }

  toggleHighlight() {
    this.setState({ highlight: !this.state.highlight });
  }

  saveQuery(event){
    this.setState({
      query: event.target.value
    });
  }

  removeResult(r){
    const newResult = this.state.results.filter( res => res.id !== r);
    this.setState({
      results: newResult
    });
  }

  update(c){
    this.removeResult(c.id);
    this.props.add(c);
  }

  results(){
    return this.state.results.map(r => <Item highlights={this.highlights()} r={r} key={r.id} onClick={() => this.update(r)} />)
  }

  renderResults(){
    return (
      this.state.results
        ? <div data-testid="searchRes" className="col-lg-10 noIdent">
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
            <div className="col-sm-8">
              <input
                className="form-control form-control-lg"
                onChange={this.saveQuery}
                placeholder="Search for Character by Name"
                data-testid="search"
                type="text" required/>
            </div>
            <div className="col-sm-2">
              <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" onChange={this.toggleHighlight} />
                    <label className="custom-control-label" htmlFor="customCheck1">Extended</label>
              </div>
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
