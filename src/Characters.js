import React from 'react';

const Character = (props) => (
  <div data-testid="character">
    {props.character.name}
    <img
      data-testid="picture"
      alt={props.character.name}
      src={props.character.thumbnail.path+"."+props.character.thumbnail.extension}
    />
  <div data-testid="descr">{props.character.description}</div>
  </div>
);

const ShowCharacters = (props) => (
  props.chars.map(c => (
    <Character key={c.id} character={c}/>
  ))
);

const Characters = (props) => (
  <div data-testid="characters">
   {props.chars.length>0
     ? <ShowCharacters chars={props.chars} />
     : "No characters" }
  </div>
);

export default Characters;
