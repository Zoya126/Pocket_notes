import NotesGroup from "../NotesGroup/NotesGroup";
import StylesLeftSidePannel from "./LeftBar.module.css";
import React, { useState, useEffect } from "react";
import plus from '../../assets/add.png'

const LeftSidePannel = ({ handleClick,handleUserIdClicked, id, groupName, color, create }) => {
  const [clickedButton, setClickedButton] = useState(null);
  

  const storedDataString = localStorage.getItem("groupNamesData");
  const storedData = JSON.parse(storedDataString) || [];

  const newId =
    storedData.length > 0 ? storedData[storedData.length - 1].id + 1 : 1;

  const newData = {
    id: newId,
    groupName: groupName,
    color: color,
    create: create,
  };
  

  const submitCheck = () => {
    if (groupName !== "" && create === true) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (submitCheck()) {
      storedData.push(newData);
      localStorage.setItem("groupNamesData", JSON.stringify(storedData));
    }
  }, [groupName, create, newData]);


  const handleButtonClick = (buttonId) => {
    setClickedButton(buttonId);
  };

  const buttonStyle = (buttonId) => {
    return {
      backgroundColor: clickedButton === buttonId ? "#2F2F2F2B" : "transparent",
      color: "white",
      minWidth: "185%",
      minHeight: "75px",
      display: "flex",
      padding: "0.25rem 0.25rem 0.5rem 0.5",
      justifyContent: "flex-start",
      borderRadius: "1rem ",
      cursor: "pointer",
      
   

    };
  };

  return (
    <div className={StylesLeftSidePannel.leftSidePannel}>
       <h1 className={StylesLeftSidePannel.pocketNotesTitle}>Pocket Notes</h1>
      <div className={StylesLeftSidePannel.center}>
        <button className={StylesLeftSidePannel.createNotesGroup}
          onClick={() => handleClick(true)}
        >
          {" "}
          <img src={plus} alt="+" style={{ width: "24px",height: "24px", }} /> 
        </button>
        <div>
          <br />
          <div
            style={{
              display: "flex",
              flexDirection: "column-reverse",
            }}
          >
            {storedData.map((group) =>
              group.create ? (
                <div className={StylesLeftSidePannel.notesGroupSlected}>
                  
                  <span
                    className={StylesLeftSidePannel.act}
                    style={buttonStyle(group.id)}
                    onClick={(_) => {
                      handleUserIdClicked(group.id);
                      handleButtonClick(group.id);
                    }}
                  >
                    <NotesGroup
                      key={group.id}
                      groupName={group.groupName}
                      color={group.color}
                      buttonColorId={group.id}
                    />
                  </span>
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSidePannel;