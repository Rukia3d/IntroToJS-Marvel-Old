import React, { Component } from 'react';
const groupSize = 3;

const Character = (props) => (
  <div className="card text-white bg-primary mb-3" style={{maxWidth: "20rem"}} data-testid="character">
    <div className="card-body">
      <h4 className="card-title">{props.character.name}</h4>
        <img
          style={{maxWidth: "18rem"}}
          data-testid="picture"
          alt={props.character.name}
          src={props.character.thumbnail.path+"."+props.character.thumbnail.extension}
        />
      <p className="card-text" data-testid="descr">{props.character.description}</p>
    </div>
  </div>
);

class ShowCharacters extends Component {
  constructor(){
    super();
    this.state = {
      page: 0
    };
    this.switchPage = this.switchPage.bind(this);
  }

  groupChars(){
    let groups = [];
    for(let i = 0; i<this.props.chars.length; i+=groupSize){
      groups.push(
        { id:i/groupSize, chars: this.props.chars.slice(i, i+groupSize) }
      );
    }
    return groups;
  }

  switchPage(){
    const maxPage = parseInt(this.props.chars.length/3);
    const nextPage = this.state.page >= maxPage ? 0 : this.state.page+1;

    this.setState({ page: nextPage });
  }

  renderPage(chars, page){
    return(
    <div key={page} style={{display: page===this.state.page ? "block" : "none" }} onClick={this.switchPage}>
      {
        chars.map(c => (
         <div className="bs-component" key={c.id}>
           <Character character={c}/>
         </div>
       ))
      }
     </div>
   )
  }

  render(){
    console.log(this.props.chars);
    return this.groupChars().map(g =>(
      this.renderPage(g.chars, g.id)
    ))
  }

}

export default ShowCharacters;
