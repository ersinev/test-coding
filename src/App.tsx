import React, { useEffect, useState } from "react";

import axios from "axios";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/Card";
import Modal from 'react-bootstrap/Modal';

function App() {
  const base_url: string = "http://www.omdbapi.com/?apikey=d37dede0&";
  const [input, setInput] = useState();
  const [films, setFilms] = useState([] as Film[]);
  const [detailedfilm, setdetailedfilm] = useState([] as DetailedFilmObject[]);
  useEffect(() => {
    fetchFilms(input);
  }, []);

  const fetchFilms = async (s: string | undefined) => {
    if (s != undefined && s.length > 3) {
      const response = await axios.get(
        s ? `${base_url}&s=${s}` : `${base_url}&s=new`
      );
      if (response.data.Response === "True") {
        console.log(response.data);
        setFilms(response.data.Search);
      }
    }
  };


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () =>{
    
    setShow(true)
  };

  return (
    <div className="App">
      <Container >
        <h2>Search a film</h2>
        <input onChange={(e: any) => fetchFilms(e.target.value)} />
        {films.map((film: Film) => {
          return (<div className="d-flex ">
            <Card className="d-flex" style={{ width: "18rem" }}>
              <Card.Img variant="top" src={film.Poster} />
              <Card.Body>
                <Card.Title>{film.Title}</Card.Title>
                <Card.Text>{film.Year}</Card.Text>
                <Button variant="primary" onClick={handleShow}>
                  Get Details
                </Button>

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>{film.Title}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {`Type :${film.Type} imdbID :${film.imdbID}`}
                  </Modal.Body>
                 
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Card.Body>
            </Card>
            </div>
          );
        })}
      </Container>
    </div>
  );
}

export default App;

interface Film {
  Title: string;
  Poster: string;
  Type: string;
  Year: string;
  imdbID: string;
}

export interface Rating {
  Source: string;
  Value: string;
}

export interface DetailedFilmObject {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Rating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}
