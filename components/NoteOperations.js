import styles from '../styles/Evernote.module.scss'
import { useState, useEffect } from 'react'
import { app, db } from '../app/firebaseConfig'
import { collection, addDoc, getDocs } from 'firebase/firestore'
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css';


export const dbInstance = collection(db, 'notes');

export default function NoteOperations({getSingleNote}) {
    const [noteDesc, setNoteDesc] = useState('')
    const addDesc = (value) => {
        setNoteDesc(value)
    }

    const [isInputVisible, setInputVisible] = useState(false);
    const inputToggle = () => {
        setInputVisible(!isInputVisible);
    }

    const [noteTitle, setNoteTitle] = useState('');

    const saveNote = () => {
        addDoc(dbInstance, {
            noteTitle: noteTitle,
            noteDesc: noteDesc
        })
            .then(() => {
                setNoteTitle('')
                setNoteDesc('')
                getNotes();
            })
    }

    const [notesArray, setNotesArray] = useState([]);
    const getNotes = () => {
        getDocs(dbInstance)
            .then((data) => {
                // console.log(data.docs.map((item) => {
                setNotesArray(data.docs.map((item) => {
                    return { ...item.data(), id: item.id }
                }));
            })
    }

    useEffect(() => {
        getNotes();
    }, [])

    return (
        <>
            <div className={styles.btnContainer}>
                <button
                    className={styles.button}
                    onClick={inputToggle}
                >
                    Add Note
                </button>
            </div>
            {isInputVisible && (
                <div>
                    <input className={styles.inputContainer}
                        type="text"
                        placeholder="Enter Note Title"
                        onChange={(e) => setNoteTitle(e.target.value)}
                    />
                    <div className={styles.ReactQuill}>
                        <ReactQuill
                            onChange={addDesc}
                            value={noteDesc}
                            placeholder="Enter Note Description"
                        />
                    </div>
                    <button
                        onClick={saveNote}
                        className={styles.saveBtn}>
                        Save Note
                    </button>
                </div>
            )}
            <div className={styles.notesDisplay}>
                {notesArray.map((note) => {
                    return (
                        // eslint-disable-next-line react/jsx-key
                        <div 
                            className={styles.notesInner}
                            onClick={() => getSingleNote(note.id)}>
                            <h4>{note.noteTitle}</h4>
                            {/* <p dangerouslySetInnerHTML={{ __html: note.noteDesc }} /> */}
                        </div>
                    )
                })}
            </div>
        </>
    )
}