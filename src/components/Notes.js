import React, { useContext, useEffect, useRef,useState } from 'react'
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import Noteitem from './Noteitem';
const Notes = () => {
  const context = useContext(noteContext);
  const { notes, addNote, getNotes,editNote } = context;
  useEffect(() => {
    getNotes()
  }, [])

  const ref = useRef(null)
  const refClose = useRef(null)

  const [note,setNote]=useState({id:"", etitle:"",edescription:"",etag:"default"});
  const updateNote = (currentNote) => {
    ref.current.click()
    setNote({id:currentNote._id,etitle:currentNote.title , edescription:currentNote.description ,etag:currentNote.tag})

  }
  


  const handleClick=(e)=>{
    editNote(note.id,note.etitle,note.edescription,note.etag)
    refClose.current.click();
    // addNote(note.title,note.description,note.tag);
 }

  const onChange=(e)=>{
      setNote({...note,[e.target.name]:e.target.value})
  }
  return (
    <>
      <AddNote />

      <button style={{display:'none'}} ref={ref} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className='my-3'>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input minLength={5} required onChange={onChange} type="text" className="form-control" value={note.etitle} id="etitle" name='etitle' aria-describedby="emailHelp" />

                </div>
                <div className="mb-3">
                  <label minLength={5} required htmlFor="edescription" className="form-label">Description</label>
                  <input onChange={onChange} type="text" className="form-control" value={note.edescription} id="edescription" name="edescription" />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input minLength={5} required onChange={onChange} type="text" className="form-control" value={note.etag} id="etag" name="etag" />
                </div>

                
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5 } onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container mx-2">
        {notes.length===0 && 'No notes to display'}
        </div>
        {notes.map((note) => {
          return <Noteitem key={note._id} updateNote={updateNote} note={note} />;
        })}
      </div>
    </>
  )
}

export default Notes