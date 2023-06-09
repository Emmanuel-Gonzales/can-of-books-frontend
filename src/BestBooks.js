import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import BookFormModal from './BookFormModal';
import UpdateBookForm from './UpdateBookForm';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      show: false,
      showUpdate: false,
      bookToUpdate: {}
    }
  }


  handleShow = () => {
    this.setState({
      show: true
    })
  }

  handleShowUpdate = () => {
    this.setState({
      showUpdate: true
    })
  }

  handleClose = () => {
    this.setState({
      show: false,
      showUpdate: false
    })
  }


  /* TODO: Make a GET request to your API to fetch all the books from the database  */

  // getBooks = async () => {
  //   let url = `${process.env.REACT_APP_SERVER}/books`

  //   let bookData = await axios.get(url);

  //   this.setState({
  //     books: bookData.data
  //   });
  // };

  getBooks = async () => {
    let url = `${process.env.REACT_APP_SERVER}/books`;
    let bookData = await axios.get(url);
    this.setState({
      books: bookData.data,
    });
  }

  componentDidMount() {
    this.getBooks();
  }

  deleteBook = async (id) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/books/${id}`
      await axios.delete(url);

      let updatedBooks = this.state.books.filter(book => book._id !== id);

      this.setState({
        books: updatedBooks
      })


    } catch (error) {
      console.log(error.response)
    }
  }



  postBook = async (bookObj) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/books`
      let createdBook = await axios.post(url, bookObj)

      this.setState({
        books: [...this.state.books, createdBook.data]
      })

    } catch (error) {
      console.log(error.message)
    }
  }


  updateBook = async (bookObjToUpd) => {
    console.log(bookObjToUpd);
    try {
      let url = `${process.env.REACT_APP_SERVER}/books/${bookObjToUpd._id}`
      let updatedBook = await axios.put(url, bookObjToUpd);

      let updatedBookArr = this.state.books.map(existingBook => {
        return existingBook._id === bookObjToUpd._id
          ? updatedBook.data
          : existingBook
      });
      this.setState({
        books: updatedBookArr,
      });
    } catch (error) {
      console.log(error.message);
    };
  }

   selectedBook = (bookToUpdate) => {
    console.log('this is the book to be updated', bookToUpdate);
    this.setState({
      bookToUpdate: bookToUpdate, 
      showUpdate: true
    }) 
   }

  render() {
    console.log(this.state.books);
    /* TODO: render all the books in a Carousel */

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
        <Button onClick={() => this.setState({ show: true })}>Add Book</Button>
        {this.state.books.length ? (
          <Carousel>
            {this.state.books.map((book, index) => {
              return (
                <Carousel.Item key={index}>
                  <img
                    className='d-block w-100'
                    src='https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2016%2F09%2F10%2F17%2F18%2Fbook-1659717_960_720.jpg'
                    alt='book pic'
                  />
                  <Carousel.Caption>
                    <h3 style={{ backgroundColor: 'teal', borderRadius: '5px', width: 'max-content', margin: 'auto', padding: '5px' }}>Title:{book.title} Description:{book.description}</h3>

                    <Button onClick={() => {
                     
                      this.selectedBook(book)
                      
                      }}>Update Book</Button>

                    <Button onClick={() => { this.deleteBook(book._id) }}>Delete</Button>

                  </Carousel.Caption>
                </Carousel.Item>
              )
            })}
          </Carousel>
        ) : (
          <h3>No Books Found :</h3>
        )}
        {this.state.show && (
          <BookFormModal show={this.state.show} handleClose={this.handleClose} postBook={this.postBook} />
        )}
        {console.log("Books Arr", this.state.books.title)}
        {
          <UpdateBookForm show={this.handleShowUpdate} showUpdate={this.state.showUpdate} handleClose={this.handleClose}
            updateBook={this.updateBook}
            bookToUpdate={this.state.bookToUpdate} />
        }
      </>
    )
  }
}

export default BestBooks;
