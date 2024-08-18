import StyleNotes from "./Notes.module.css";
import { useState } from "react";
import ActiveArrow from '../../assets/ActiveArrow.png';
import UnActive from '../../assets/UnActivearrow.png';
import back from '../../assets/BackButton.svg'

const Notes = ({ userIdClicked }) => {
  const [saveNotes, setSaveNotes] = useState(false);
  const storedDataString = localStorage.getItem("groupNamesData");
  const storedData = JSON.parse(storedDataString) || [];
  const [myNotes, setMyNotes] = useState({
    id: [],
    notes: "",
    time: [],
    date: [],
  });

  const groupName = storedData[userIdClicked ]?.groupName || "";
  const color = storedData[userIdClicked ]?.color || "#000";

  const words = groupName.split(" ");
  const avatarText = words.length > 1 ? (words?.[0]?.[0] || "") + (words?.[1]?.[0] || "") : (words?.[0]?.[0] || "N/A");

  const NotesImage = {
    backgroundColor: `${color}`,
    borderRadius: "50%",
    minWidth: "61px",
    minHeight: "61px",
    maxWidth: "61px",
    maxHeight: "61px",
    color: "#FFF",
    fontFamily: "Roboto",
    fontSize: "1.50719rem",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "97.688%",
    letterSpacing: "0.03013rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textTransform: "uppercase",
  };

  const myNotesFunction = (e) => {
    const currentNotesDate = new Date();
    const noteTimeWithSeconds = currentNotesDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    const currentDate = new Date();
    const notesDay = currentDate.getDate();
    const notesMonth = currentDate.getMonth() + 1;
    const notesYear = currentDate.getFullYear();

    const notesDate = `${notesDay} ${currentNotesDate.toLocaleString("default", {
      month: "short",
    })} ${notesYear}`;

    setMyNotes({
      ...myNotes,
      id: userIdClicked,
      notes: e.target.value,
      time: noteTimeWithSeconds,
      date: notesDate,
    });
    setSaveNotes(true);
  };

  const resetTextarea = () => {
    setMyNotes({ ...myNotes, notes: "" });
  };

  const saveMyNotes = () => {
    const existinggroupNamesData = localStorage.getItem("myNotesSave");
    let existingNotes = JSON.parse(existinggroupNamesData) || [];

    if (myNotes.notes !== "" && saveNotes === true) {
      existingNotes.push(myNotes);
      localStorage.setItem("myNotesSave", JSON.stringify(existingNotes));
    }
    resetTextarea();
  };

  const reterivingMyNotes = () => {
    const existinggroupNamesData = localStorage.getItem("myNotesSave");

    if (existinggroupNamesData) {
      const existingNotes = JSON.parse(existinggroupNamesData);

      return existingNotes.map((note, index) =>
        userIdClicked === note.id ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "21px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              position: "relative",
              backgroundColor: "#fff",
            }}
            key={index}
          >
            <div className={StyleNotes.notes}>{note.notes}</div>
            <div className={StyleNotes.timeDate}>
              {note.date} &#8226; {note.time}
            </div>
          </div>
        ) : null
      );
    } else {
      console.log("Data not found in localStorage");
    }
  };

  const handleKEnterKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      saveMyNotes();
    }
  };

  return (
    <>
      {userIdClicked > 0 ? (
        <div className={StyleNotes.NotesGroupNotes}>
          <div className={StyleNotes.NotesGroupHeading}>
            &nbsp; &nbsp; &nbsp;
            <span
              className={StyleNotes.backButton}
              onClick={() => window.location.reload()}
            >
              <img src={back} alt="BackButton" /> &nbsp;
            </span>
            <div style={NotesImage}>{avatarText}</div>
            <div className={StyleNotes.NotesName}>{groupName}</div>
          </div>
          <div className={StyleNotes.NotesContent}>{reterivingMyNotes()}</div>
          <div className={StyleNotes.NotesEnter}>
            <textarea
              type="text"
              placeholder="Enter your text here..........."
              className={StyleNotes.NotesInput}
              onChange={(e) => myNotesFunction(e)}
              value={myNotes.notes}
              onKeyPress={handleKEnterKey}
            />
            <img
             src={myNotes.notes ? ActiveArrow : UnActive} 
              alt="Enter"
              className={StyleNotes.NotesInputButton}
              onClick={saveMyNotes}
            />
          </div>
        </div>
      ) : (
        ("no notes", console.log("no notes"))
      )}
    </>
  );
};

export default Notes;