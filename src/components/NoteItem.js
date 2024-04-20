import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext';

function NoteItem(props) {
    const { note, updateNote } = props;
    const {deleteNote} = useContext(noteContext);
    return (
        <>
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex algin-items-center">
                        <h5 className="card-title ove text-truncate">{note.title}</h5>
                        <div className="justify-content-end d-flex my-1">
                            <i className="fa-solid fa-pen text-primary mx-2" onClick={()=>{updateNote(note)}}></i>
                            <i className="fa-solid fa-trash-can text-danger mx-2" onClick={()=>{deleteNote(note._id)}}></i>
                        </div>
                    </div>
                    <p className="card-text text-truncate">{note.description}</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item text-truncate">Date: {note.date}</li>
                    <li className="list-group-item text-truncate">Tag: {note.tag}</li>
                </ul>

            </div>
        </>
    )
}

export default NoteItem
