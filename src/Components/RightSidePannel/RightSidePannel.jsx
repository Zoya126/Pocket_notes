import StyleRightSidePannel from "./RightSidePannel.module.css";
import Image from '../../assets/NoteDefaultImage.png';
import encrypt from '../../assets/endToEndEncryptedImage.svg';
const RightSidePannel = () => {
  return (
    <>
      <div className={StyleRightSidePannel.rightSidePannel}>
        <div className={StyleRightSidePannel.image}>
          <img
            src={Image} alt="NoteDefaultImageOnPageLoad" style={{ width: "40vw" , marginTop: "170px"}}
          />
          <div>
            <div className={StyleRightSidePannel.imageText1}><h3>Pocket Notes</h3></div>
            <div className={StyleRightSidePannel.imageText2}>
              <p>Send and receive messages without keeping your phone online.
              <br />
              Use Pocket Notes on up to 4 linked devices and 1 mobile phone
              </p>
            </div>
          </div>
          <div className={StyleRightSidePannel.endToEnd}><img src={encrypt} alt="endToEndEncryptedImage"/> end-to-end encrypted</div>
        </div>
          </div>
    </>
  );
};

export default RightSidePannel;