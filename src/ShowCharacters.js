import React, { Component } from 'react';
const groupSize = 3;

const Character = (props) => (
  <div className="card text-white bg-primary mb-3"
      style={{maxWidth: "20rem"}}
      data-testid="character">
    <div className="card-body">
      <h4 className="card-title" data-testid="name">{props.character.name}</h4>
        <img
          style={{maxWidth: "18rem"}}
          data-testid="picture"
          alt={props.character.name}
          src={props.character.thumbnail.path+"."+props.character.thumbnail.extension}
        />
      <p className="card-text" data-testid="descr">{props.character.description}</p>
      <button
        className="btn btn-outline-secondary"
        data-testid="deleteButton"
        data-id={props.character.id} 
        onClick={props.removeCharacter}
      >
        Delete
      </button>
    </div>
  </div>
);

class ShowCharacters extends Component{
  constructor(){
    super();
    this.state = {
      page: 0
    }
    this.switchPageBack = this.switchPageBack.bind(this);
    this.switchPageForw = this.switchPageForw.bind(this);
  }

  groupChars(){
    let groups = [];

    for(let i=0; i<this.props.chars.length; i+=groupSize){
      groups.push({ id:i/groupSize, chars: this.props.chars.slice(i, i+groupSize) });
    }

    return groups;
  }

  getMaxPage(){
    if(this.props.chars.length<groupSize){
      return 0;
    } else {
      return parseInt((this.props.chars.length-1)/groupSize);
    }
  }
  switchPageForw(){
    const nextPage = this.state.page >= this.getMaxPage() ? 0 : this.state.page+1;
    this.setState({page: nextPage});
  };

  switchPageBack(){
    const prevPage = this.state.page === 0 ? this.getMaxPage() : this.state.page-1;
    this.setState({page: prevPage});
  };

  renderPage(chars, page){
    const visible = page===this.state.page ? 'visible' : 'hidden';
    return(
      <div key={page} className={visible} data-testid={`page-${visible}`} >
      {
        chars.map(c => (
            <div className="bs-component" key={c.id}>
              <Character character={c} removeCharacter={this.props.removeCharacter}/>
            </div>
          ))
      }
      </div>
    )
  }

  render(){
    return (
      <div style={{position:"relative"}}>
        { this.groupChars().map(g => (this.renderPage(g.chars, g.id))) }
        { this.getMaxPage()>0 ? <button className="btn btn-outline-info"
          style={{position:"absolute", left:"-2em", top:0}}
          onClick={this.switchPageForw}
          data-testid="switchR"> &laquo; </button>
          : null }
        { this.getMaxPage()>0 ? <button className="btn btn-outline-info"
          style={{position:"absolute", right:"-2em", top:0}}
          onClick={this.switchPageBack}
          data-testid="switchL"> &raquo; </button>
          : null }
      </div>
    )
  }

}

export default ShowCharacters;
