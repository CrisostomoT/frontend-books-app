import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';

//bootstrap components
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';


//custom Styles
import './style.css'

const Books = () => {
  const [books, setBooks] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const fetchBooks = async () => {
    const result = await axiosInstance.get('/book');
    console.log(result)
    setBooks(result.data);
  };


  const deleteBook = (_id) => async () => {
    await axiosInstance.delete(`/book/${_id}`)
    fetchBooks();
  };

  const addBook = async (evt) => {
    evt.preventDefault();


    const form = evt.target;

    if (form.checkValidity()) {
      const body = {
        title: form.bookTitle.value,
        imagePath: form.imagePath.value,
        datePublished: form.datePublished.value
      }
      await axiosInstance.post('/book', body)
      fetchBooks();
    }
  };

  const updateBook = id => async (evt) => {
    fetchBooks();

    evt.preventDefault();

    const form = evt.target;

    if (form.checkValidity()) {
      const body = {
        title: form.NewBookTitle.value,
        datePublished: form.NewBookDatePublished.value,
        imagePath: form.NewBookImagePath.value,

      }
      await axiosInstance.put(`/book/${id}`, body)
      fetchBooks();
    }

  }

  useEffect(() => {
    fetchBooks()
  }, [])


  return (
    <div>

      <Form onSubmit={addBook}>
        <div>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label htmlFor='bookTitle'>Tile: </Form.Label>
                <Form.Control type='text' name="bookTitle" required />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label htmlFor='imagePath'>Image: </Form.Label>
                <Form.Control type='text' name="imagePath" required />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label htmlFor='datePublished'>Year published: </Form.Label>
                <Form.Control type='number' name="datePublished" required />
              </Form.Group>
            </Col>
          </Row>
        </div>
        <div className="buttonsBook">
          <Button type="submit">Upload book</Button>
          <Button onClick={fetchBooks}>Get all books</Button>
        </div>
      </Form>

      {
        books && books.map(({ title, datePublished, imagePath, authorBook, _id }) => {
          return (
            <Card style={{ width: "18rem" }} key={_id}>
              <Card.Body>
                <Card.Title>{title}</Card.Title>
                <h2>{authorBook}</h2>
                <h3>{datePublished}</h3>
                <Card.Img src={imagePath} alt='' variant="top" />
                <Button variant="outline-danger" onClick={deleteBook(_id)}>Delete book</Button>
              </Card.Body>
              <div>
                <Button variant="primary" onClick={handleShow}>
                  Edit book
                </Button>

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Editing: {title}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div>
                      <Form onSubmit={updateBook(_id)}>
                        <Row>
                          <Col>
                            <Form.Group>
                              <Form.Label htmlFor='NewAuthorName'>New name: </Form.Label>
                              <Form.Control type='text' name="NewAuthorName" required />
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group>
                              <Form.Label htmlFor='NewAuthorCountry'>New country: </Form.Label>
                              <Form.Control type='text' name="NewAuthorCountry" required />
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group>
                              <Form.Label htmlFor='NewAuthorBornYear'>New born year: </Form.Label>
                              <Form.Control type='number' name="NewAuthorBornYear" required />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Button variant="outline-success" size="sm" onClick={handleClose} type="submit">Update author</Button>
                      </Form>
                    </div>
                  </Modal.Body>
                </Modal>
              </div>
            </Card>
          )
        })
      }
    </div>
  );
}

export default Books;