import StyleNotesGroup from "./NotesGroup.module.css";
import React from "react";

const NotesGroup = ({ id, groupName, color, buttonColorId }) => {

  const words = groupName.split(' ');
  const firstChar = words[0] ? words[0][0] : '';
  const secondChar = words[1] ? words[1][0] : '';

  const NotesImage = {
    backgroundColor: color,
    borderRadius: "50%",
    minWidth: "61px",
    minHeight: "61px",
    color: "#FFF",
    fontFamily: "Roboto",
    fontSize: "1.3rem",
    fontStyle: "normal",
    fontWeight: 500,
    letterSpacing: "0.03013rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textTransform: "uppercase",
    padding: "0px",
  };

  return (
    <>
      {
        (buttonColorId === id) ? (
          <div className={StyleNotesGroup.NotesGroup} style={{ backgroundColor: "#F7ECDC" }}>
            <div style={NotesImage}>
              {firstChar}
              {secondChar}
            </div>
            <div className={StyleNotesGroup.NotesName}>{groupName}</div>
          </div>
        ) : (
          <div className={StyleNotesGroup.NotesGroup}>
            <div style={NotesImage}>
              {firstChar}
              {secondChar}
            </div>
            <div className={StyleNotesGroup.NotesName}>{groupName}</div>
          </div>
        )
      }
    </>
  );
};

export default NotesGroup;