import React from 'react';
import ShowCharacters from './ShowCharacters';


const Characters = (props) => (
  <div data-testid="characters" className="row">
   {props.chars.length>0
     ? <ShowCharacters chars={props.chars} removeCharacter={props.removeCharacter}/>
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
