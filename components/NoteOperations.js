import styles from '../styles/Evernote.module.scss'
import { useState } from 'react'
import { app, db } from '../components/app/firebaseConfig'
import { collection, addDoc } from 'firebase/firestore'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function NoteOperations() {
    const [noteDesc, setNoteDesc] = useState('')
    const addDesc = (value) => {
        setNoteDesc(value)
    }

    const [isInputVisible, setInputVisible] = useState(false);
    const inputToggle = () => {
        setInputVisible(!isInputVisible);
    }

    const [noteTitle, setNoteTitle] = useState('');

    const dbInstance = collection(db, 'notes')
    const saveNote = () => {
        addDoc(dbInstance, {
            noteTitle: noteTitle,
            noteDesc: noteDesc
        }).then(() => {
            setNoteDesc('')
            setNoteTitle('')
        })
    }
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
                </div>
            )}
            <div className={styles.ReactQuill}>
                <ReactQuill
                    onChange={addDesc}
                    value={noteDesc}
                />
            </div>
            <button
                onClick={saveNote}
                className={styles.saveBtn}>
                Save Note
            </button>
        </>
    )
}