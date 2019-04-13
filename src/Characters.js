import React from 'react';

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

const ShowCharacters = (props) => (
  props.chars.map(c => (
    <div className="bs-component" key={c.id}>
      <Character character={c}/>
    </div>
  ))
);

const Characters = (props) => (
  <div data-testid="characters" className="row">
   {props.chars.length>0
     ? <ShowCharacters chars={props.chars} />
     : <NoCharacters /> }
  </div>
);

const NoCharacters = (props) => (
    <div className="col-lg-4">
      <div className="bs-component">
        <div className="alert alert-dismissible alert-danger">
          <strong>No characters</strong>
        </div>
      </div>
    </div>
);

export default Characters;
