import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

function AddNote() {
    const { addNote } = useContext(noteContext);
    const handleClick = (e) => {
        e.preventDefault()
        addNote(note);
        document.getElementById("addForm").reset();
        setnote({title: "", description: "", tag: ""})
    }

    const [note, setnote] = useState({title: "", description: "", tag: ""});
    const onChange = (e) => {
        setnote({...note, [e.target.name]: e.target.value})
    }


    return (
        <div>
            <form id="addForm">
                <div className='my-3 mx-1'>
                    <label htmlFor="title" className='form-label'>Title: </label>
                    <input
                        type="text"
                        id='title'
                        name="title"
                        placeholder="Title"
                        className='form-control w-50'
                        onChange={onChange}
                        required
                        minLength={1}
                    />
                    <label htmlFor="description" className='form-label'>Description: </label>
                    <textarea
                        id='description'
                        name="description"
                        placeholder="Description"
                        className='form-control w-50'
                        onChange={onChange}
                    ></textarea>
                    <label htmlFor="tag" className='form-label'>Tag: </label>
                    <input
                        type="text"
                        id='tag'
                        name="tag"
                        placeholder="tag"
                        className='form-control w-50'
                        onChange={onChange}
                    />
                </div>
                <button className= "btn btn-success" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote
