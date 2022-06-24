import React,{useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext';


const AddNote = (props) => {
    const context=useContext(noteContext);
  const {addNote}=context;
  const [note,setNote]=useState({title:"",description:"",tag:""});
  const handleClick=(e)=>{
    e.preventDefault();
    addNote(note.title,note.description,note.tag);
    setNote({title:"",description:"",tag:""})
    props.showAlert("Added Successfully","success")
 }

  const onChange=(e)=>{
      setNote({...note,[e.target.name]:e.target.value})
  }
    return (
        <div>
            <div className="container my-3">
                <h2>Add a Note</h2>
                <form className='my-3'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input value={note.title} minLength={5} required onChange={onChange} type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" />
                        
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input value={note.description} minLength={5} required onChange={onChange} type="text" className="form-control" id="description" name="description" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input value={note.tag} minLength={5} required onChange={onChange} type="text" className="form-control" id="tag" name="tag" />
                    </div>
                    
                    <button disabled={note.title.length<5 || note.description.length<5 } type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>

        </div>
    )
}

export default AddNote