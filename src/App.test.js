import React from 'react';
import {render, fireEvent, cleanup} from 'react-testing-library';
import 'jest-dom/extend-expect';
import * as dom from 'dom-testing-library';
import App from './App';
const nextTick = () => new Promise(r => process.nextTick(r));

let capSearchResult = {
  "code": 200,
  "status": "Ok",
  "copyright": "© 2019 MARVEL",
  "attributionText": "Data provided by Marvel. © 2019 MARVEL",
  "attributionHTML": "<a href=\"http://marvel.com\">Data provided by Marvel. © 2019 MARVEL</a>",
  "etag": "1b33b6b6c2815dfecab9b79c88759f6f4282115f",
  "data": {
    "offset": 0,
    "limit": 20,
    "total": 19,
    "count": 19,
    "results": [
      {
        "id": 1009220,
        "name": "Captain America",
        "description": "Vowing to serve his country any way he could, young Steve Rogers took the super soldier serum to become America's one-man army. Fighting for the red, white and blue for over 60 years, Captain America is the living, breathing symbol of freedom and liberty.",
        "modified": "2016-09-06T11:37:19-0400",
        "thumbnail": {
          "path": "http://i.annihil.us/u/prod/marvel/i/mg/3/50/537ba56d31087",
          "extension": "jpg"
        },
        "resourceURI": "http://gateway.marvel.com/v1/public/characters/1009220"
      },
      {
        "id": 1009223,
        "name": "Captain Britain",
        "description": "",
        "modified": "2012-01-19T10:15:28-0500",
        "thumbnail": {
          "path": "http://i.annihil.us/u/prod/marvel/i/mg/9/50/4dbf0e5d57226",
          "extension": "jpg"
        },
        "resourceURI": "http://gateway.marvel.com/v1/public/characters/1009223"
      },
      {
        "id": 1011190,
        "name": "Captain Cross",
        "description": "",
        "modified": "1969-12-31T19:00:00-0500",
        "thumbnail": {
          "path": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available",
          "extension": "jpg"
        },
        "resourceURI": "http://gateway.marvel.com/v1/public/characters/1011190"
      },
      {
        "id": 1011196,
        "name": "Captain Flint",
        "description": "",
        "modified": "1969-12-31T19:00:00-0500",
        "thumbnail": {
          "path": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available",
          "extension": "jpg"
        },
        "resourceURI": "http://gateway.marvel.com/v1/public/characters/1011196"
      },
      {
        "id": 1010338,
        "name": "Captain Marvel (Carol Danvers)",
        "description": "",
        "modified": "2019-02-06T18:09:05-0500",
        "thumbnail": {
          "path": "http://i.annihil.us/u/prod/marvel/i/mg/6/80/5269608c1be7a",
          "extension": "jpg"
        },
        "resourceURI": "http://gateway.marvel.com/v1/public/characters/1010338"
      },
      {
        "id": 1011027,
        "name": "Captain Universe",
        "description": "",
        "modified": "1969-12-31T19:00:00-0500",
        "thumbnail": {
          "path": "http://i.annihil.us/u/prod/marvel/i/mg/4/c0/4c00324c12ba2",
          "extension": "jpg"
        },
        "resourceURI": "http://gateway.marvel.com/v1/public/characters/1011027"
      }
    ]
  }
}



afterEach(cleanup);

test('renders without crashing', async () => {
  const { getByTestId, queryByTestId, queryAllByTestId } = render(<App/>);
  expect(getByTestId("characters")).toHaveTextContent("No characters");
  expect(getByTestId("search")).toBeTruthy();
  expect(getByTestId("searchBtn")).toBeTruthy();
  expect(queryByTestId("searchRes")).toBeNull();

  window.fetch = jest.fn();
  window.fetch.mockReturnValueOnce(
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(capSearchResult)
    })
  );
  const search = getByTestId("search");
  fireEvent.change(search, {target: {value: "Captain"}});
  const button = getByTestId("searchBtn");
  fireEvent.click(button);
  expect(getByTestId("searchRes")).toBeTruthy();
  expect(getByTestId("searchRes")).toHaveTextContent("Loading...");

  await nextTick();

  expect(window.fetch).toBeCalledTimes(1);
  expect(window.fetch).toBeCalledWith(
    expect.stringContaining("nameStartsWith=Captain")
  );

  const results = queryAllByTestId("result");
  expect(results).not.toHaveLength(0);
  results.forEach(r => {
    expect(r.dataset.name).toContain("Captain");
    expect(dom.getByTestId(r, "addBtn")).toBeTruthy();
  });

  const buttonRes = getByTestId("addBtn");
  fireEvent.click(buttonRes);

  expect(getByTestId("characters")).not.toHaveTextContent("No characters");
  const characters = queryAllByTestId("character");
  expect(characters).toHaveLength(1);
  expect(characters[0]).toHaveTextContent(results[0].dataset.name);

  expect(dom.getByTestId(characters[0], "picture").src).toEqual(
    'http://i.annihil.us/u/prod/marvel/i/mg/3/50/537ba56d31087.jpg'
  );

  expect(dom.getByTestId(characters[0], "descr")).toHaveTextContent(
    capSearchResult.data.results[0].description
  );
});
