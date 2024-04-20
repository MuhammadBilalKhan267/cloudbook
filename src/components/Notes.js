import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

function Notes() {
  const { notes, getNotes, editNote } = useContext(noteContext);
  const [note, setnote] = useState({title: "", description: "", tag: ""});
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('CloudBookAuthToken') === null) {
      navigate('/login')
      return
    }
    getNotes();
    // eslint-disable-next-line
  }, [])

  const ref = useRef(null)

  const updateNote = (note) => {
    ref.current.click()
    setnote(note)
  }

  const handleClick = (e) => {
    e.preventDefault()
    editNote(note);
    ref.current.click()
  }

  
  const onChange = (e) => {
      setnote({...note, [e.target.name]: e.target.value})
  }
  return (
    <>

      <button type="button" ref={ref} className="d-none" data-bs-toggle="modal" data-bs-target="#editModal">
      </button>
      <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className='my-3'>
                  <label htmlFor="title" className='form-label'>Title: </label>
                  <input
                    type="text"
                    id='title'
                    name="title"
                    placeholder="Title"
                    className='form-control'
                    onChange={onChange}
                    value={note.title}
                    required
                    minLength={1}
                  />
                  <label htmlFor="description" className='form-label'>Description: </label>
                  <textarea
                    id='description'
                    name="description"
                    placeholder="Description"
                    className='form-control'
                    onChange={onChange}
                    value={note.description}
                  ></textarea>
                  <label htmlFor="tag" className='form-label'>Tag: </label>
                  <input
                    type="text"
                    id='tag'
                    name="tag"
                    placeholder="tag"
                    className='form-control'
                    onChange={onChange}
                    value={note.tag}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>Save changes</button>
            </div>
          </div>
        </div>
      </div>



      <h1>Your notes</h1>
      <div className="mx-1">{notes.length === 0 && "No notes to display"}</div>
      <div className="row my-3">
        
        {
          notes.map((note, index) => {

            return (
              <div className="col-md-4" key={index}>
                <NoteItem note={note} updateNote={updateNote} />
              </div>
            )
          })
        }
      </div>
      <AddNote />
    </>
  )
}

export default Notes
