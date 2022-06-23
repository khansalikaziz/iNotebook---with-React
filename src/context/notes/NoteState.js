import React, { useState } from "react";
import NoteContext from "./noteContext";


const NoteState = (props) => {
  const notesInitial = [
    {
      "_id": "62b33861bed82645e0cb03f1",
      "user": "62b2e5ad446c7458c4c8655b",
      "title": "New notekk",
      "description": "My jj description hj",
      "tag": "personajjl45",
      "date": "2022-06-22T15:42:25.209Z",
      "__v": 0
    },
    {
      "_id": "62b33861bed82645e0cb03f1",
      "user": "62b2e5ad446c7458c4c8655b",
      "title": "New notekk",
      "description": "My jj description hj",
      "tag": "personajjl45",
      "date": "2022-06-22T15:42:25.209Z",
      "__v": 0
    },
    {
      "_id": "62b33861bed82645e0cb03f1",
      "user": "62b2e5ad446c7458c4c8655b",
      "title": "New notekk",
      "description": "My jj description hj",
      "tag": "personajjl45",
      "date": "2022-06-22T15:42:25.209Z",
      "__v": 0
    },
    {
      "_id": "62b33861bed82645e0cb03f1",
      "user": "62b2e5ad446c7458c4c8655b",
      "title": "New notekk",
      "description": "My jj description hj",
      "tag": "personajjl45",
      "date": "2022-06-22T15:42:25.209Z",
      "__v": 0
    },
    {
      "_id": "62b33861bed82645e0cb03f1",
      "user": "62b2e5ad446c7458c4c8655b",
      "title": "New notekk",
      "description": "My jj description hj",
      "tag": "personajjl45",
      "date": "2022-06-22T15:42:25.209Z",
      "__v": 0
    },
    {
      "_id": "62b33861bed82645e0cb03f1",
      "user": "62b2e5ad446c7458c4c8655b",
      "title": "New notekk",
      "description": "My jj description hj",
      "tag": "personajjl45",
      "date": "2022-06-22T15:42:25.209Z",
      "__v": 0
    },
    {
      "_id": "62b33861bed82645e0cb03f1",
      "user": "62b2e5ad446c7458c4c8655b",
      "title": "New notekk",
      "description": "My jj description hj",
      "tag": "personajjl45",
      "date": "2022-06-22T15:42:25.209Z",
      "__v": 0
    },
  ]
  const [notes, setNotes] = useState(notesInitial)
  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;