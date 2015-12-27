import React from "react";

class Modal extends React.Component {
  constructor(props){
  	super(props);
  }
  render(){
    let displayStatus = { 
        display : this.props.showModal ? "block" : "none"
    };
    return  (
      <div id="openModal" className="modalDialog" style = { displayStatus }  >
        <div>
          { this.props.modalContent }
          <div className = 'thread-post-postedBy'>
            Posted by : { this.props.modalPostedBy }
          </div>
        </div>
      </div>
    )
  }
}


export default Modal;