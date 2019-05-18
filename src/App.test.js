import React from 'react';
import {render, fireEvent, cleanup} from 'react-testing-library';
import 'jest-dom/extend-expect';
import * as dom from 'dom-testing-library';
import App from './App';
const nextTick = () => new Promise(r => process.nextTick(r));

// Test opbect that pretends it's returned by API
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

  // expect that there are no characters by default
  const { getByTestId, queryByTestId, queryAllByTestId, getAllByTestId } = render(<App/>);
  expect(getByTestId("characters")).toHaveTextContent("No characters");
  expect(getByTestId("search")).toBeTruthy();
  expect(getByTestId("searchBtn")).toBeTruthy();
  expect(queryByTestId("searchRes")).toBeNull();

  // Commented out as this code mocks the api request for Marvel API
  // window.fetch = jest.fn();
  // window.fetch.mockReturnValueOnce(
  //   Promise.resolve({
  //     ok: true,
  //     json: () => Promise.resolve(capSearchResult)
  //   })
  // );

  // Enter "Captain" and press the search button. Expect it loads
  const search = getByTestId("search");
  fireEvent.change(search, {target: {value: "Captain"}});
  const button = getByTestId("searchBtn");
  fireEvent.click(button);

  // Commented out as this code mocks the api request for Marvel API
  //expect(getByTestId("searchRes")).toBeTruthy();
  //expect(getByTestId("searchRes")).toHaveTextContent("Loading...");

  // Wait for pseudo-responce
  await nextTick();

  // Commented out as this code mocks the api request for Marvel API
  // Check that there was one call and we send Captain out
  // expect(window.fetch).toBeCalledTimes(1);
  // expect(window.fetch).toBeCalledWith(
  //   expect.stringContaining("nameStartsWith=Captain")
  // );

  // Check that captains were returned
  const results = queryAllByTestId("result");
  expect(results).not.toHaveLength(0);
  results.forEach(r => {
    expect(r.dataset.name).toContain("Captain");
    expect(dom.getByTestId(r, "addBtn")).toBeTruthy();
  });

  // Press Add for the first captain
  const buttonRes = getByTestId("addBtn");
  fireEvent.click(buttonRes);

  // Confirm the character was removed after addition
  const resultsRefreshed = queryAllByTestId("result");
  expect(dom.getByTestId(resultsRefreshed[0], "res-name")).toHaveTextContent(results[1].dataset.name);

  // Captain is the only one - no switch buttons
  const noButton = queryByTestId('switchR');
  expect(noButton).toBeNull();

  // We have characters now
  expect(getByTestId("characters")).not.toHaveTextContent("No characters");
  const characters = getAllByTestId("character");
  expect(characters).toHaveLength(1);
  expect(characters[0]).toHaveTextContent(results[0].dataset.name);

  expect(dom.getByTestId(characters[0], "picture").src).toEqual(
    'http://i.annihil.us/u/prod/marvel/i/mg/3/50/537ba56d31087.jpg'
  );

  expect(dom.getByTestId(characters[0], "descr")).toHaveTextContent(
    capSearchResult.data.results[0].description
  );

  // Add more characters (all 6)
  for(let i=1; i<capSearchResult.data.results.length; i++){
    const button = getAllByTestId('addBtn')[0];
    fireEvent.click(button)
  }


  // Expect that only 3 shown
  const visiblePage = getByTestId('page-visible');
  const charNames = dom.getAllByTestId(visiblePage, "name").map(m => m.innerHTML);
  expect(charNames).toEqual([ 'Captain America', 'Captain Britain', 'Captain Cross' ]);

  // Expect that 3 are hidden
  const inVisiblePage = getByTestId('page-hidden');
  const charNamesInv = dom.getAllByTestId(inVisiblePage, "name").map(m => m.innerHTML);
  expect(charNamesInv).toEqual(["Captain Flint", "Captain Marvel (Carol Danvers)", "Captain Universe"]);

  // Find and press ButtonRight
  // Expect characters changed
  const buttonR = getByTestId('switchR');
  fireEvent.click(buttonR);

  const visiblePageR = getByTestId('page-visible');
  const charNamesR = dom.getAllByTestId(visiblePageR, "name").map(m => m.innerHTML);
  expect(charNamesR).toEqual(["Captain Flint", "Captain Marvel (Carol Danvers)", "Captain Universe"]);

  // Deletion
  const deleteBtn = getByTestId("deleteButton");
  fireEvent.click(deleteBtn);
  const visiblePageForDeletion = getByTestId('page-visible');
  const charNamesForDeletion = dom.getAllByTestId(visiblePageForDeletion, "name").map(m => m.innerHTML);
  expect(charNamesForDeletion).toEqual(["Captain Marvel (Carol Danvers)", "Captain Universe"]);


});
