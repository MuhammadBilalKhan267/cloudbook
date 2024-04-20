import NoteContext from './noteContext';
import { useState, useContext } from 'react';
import alertContext from '../alert/alertContext';

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const initialnotes = []

    const [notes, setnotes] = useState(initialnotes);

    const {showalert} = useContext(alertContext);

    //Get all notes
    const getNotes = async () => {
        //API call to get from backend
        const response = await fetch( host + '/api/notes/fetchallnotes', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('CloudBookAuthToken')
          }
        })
        const json = await response.json()
        setnotes(json)
      }
      
      //Add notes
      const addNote = async (note) => {
        if (note.title === "") {
          return showalert("Title cannot be empty", "danger")
        }
        const {title, description, tag} = note;

        //API call to add from backend
        const response = await fetch( host + '/api/notes/addnote', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('CloudBookAuthToken')
          },
          body: JSON.stringify({title, description, tag})
        })

        const json = await response.json()

        if (response.status === 201 && json) {
          setnotes([...notes, json])
          showalert("Note added successfully", "success")
        }
        else {
          showalert(json.error, "danger")
        }
      }

      //Edit notes
      const editNote = async (note) => {
        if (note._id === undefined) {
          return showalert("Note not found", "danger")
        }
        else if (note.title === "") {
          return showalert("Title cannot be empty", "danger")
        }
        const {title, description, tag, _id: id} = note;
        console.log("Editing note with id", id);
        console.log(note)

        //API call to edit from backend
        const response = await fetch( host + `/api/notes/updatenote/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('CloudBookAuthToken')
          },
          body: JSON.stringify({title, description, tag})
        })
        console.log(response)

        const json = await response.json()

        if (response.status === 201 && json) {
          const newNotes = notes.map((note) => {
            return note._id === id ? json : note
          })
          setnotes(newNotes)
          showalert("Note updated successfully", "success")
        }
        else{
          showalert(json.error, "danger")
        }
      }

      //Delete notes
      const deleteNote = async (id) => {
        
        if (id === undefined) {
          return showalert("Note not found", "danger")
        }

        //API call to delete from backend
        const response = await fetch( host + `/api/notes/deletenote/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('CloudBookAuthToken')
          }
        })

        const json = await response.json()

        if (response.status === 200 && json) {
          const newNotes = notes.filter((note) => {
            return note._id !== id
          })
          setnotes(newNotes)
          showalert("Note deleted successfully", "success")
        }
        else{
          showalert(json.error, "danger")
        }
        
      }

    return (

        <NoteContext.Provider value={{notes, addNote, editNote, deleteNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState

