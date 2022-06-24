import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext';
const Noteitem = (props) => {
    const context=useContext(noteContext);
    const {deleteNote}= context;
    const { note,updateNote } = props;
    
    return (
        <div className='col-md-3'>
            <div className="card my-3" >
                <div className="card-body">
                    <div className="d-flex align-items-center">
                    <h5 className="card-title">{note.title}</h5>
                    <i onClick={()=>{deleteNote(note._id);props.showAlert("Deleted Successfully","success")}} className="fa-solid fa-trash-can mx-2"></i>
                    <i onClick={()=>{updateNote(note)}} className="fa-solid fa-pen-to-square mx-2"></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                    
                </div>
            </div>
        </div>
    )
}

export default Noteitem