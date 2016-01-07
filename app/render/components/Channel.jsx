import React from "react";

class Channel extends React.Component {
  joinChannel(){
    this.props.joinChannel(this.props.channel.name);
  }
  render(){
    let channelSelect = this.props.currentChannel === this.props.channel.name ? "channels-list-item active" : "channels-list-item";
    let channelName = this.props.channel.name;
    if(channelName.length > 15){
      channelName = channelName.substring(0, 15) + "...";
    }
    return (
      <li className = { channelSelect } onClick = { this.joinChannel.bind(this) } >
        { channelName }
      </li>
    )
  }
}

class ChannelSubmitForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      newChannelName : "",
      newChannelDesc : ""
    }
  }
  handleChannelNameChange(evt) {
    evt.preventDefault();
    this.setState({
      newChannelName: evt.target.value
    });
  }
  handleChannelDescChange(evt) {
    evt.preventDefault();
    this.setState({
      newChannelDesc: evt.target.value
    });
  }
  submitChannelForm(){
    if(/\S/.test(this.state.newChannelName)){
      this.props.submitChannelForm({
        name : this.state.newChannelName,
        desc : this.state.newChannelDesc
      });
    }

    this.props.toggleChannelForm();

    this.setState({
      newChannelName : "",
      newChannelDesc : ""
    });
  }
  render(){
    let displayStatus = {
        display : this.props.showChannelForm ? "block" : "none"
    };

    return(
      <div id = "channel-form-area">
        <div style = { displayStatus } id = "channel-form-shader"
          onClick = { this.props.toggleChannelForm.bind(this) } >
        </div>
        <div style = { displayStatus } id = "channel-form">
          <p> Make a new channel </p>
           <textarea id = "channel-name-input" className = "channel-input-form"
            type = "text"
            placeholder = "Name this channel!"
            onChange = { this.handleChannelNameChange.bind(this) }
            value = { this.state.newChannelName } ></textarea>
           <textarea id = "channel-desc-input" className = "channel-input-form"
            type = "text"
            placeholder = "What is it for?"
            onChange = { this.handleChannelDescChange.bind(this) }
            value = { this.state.newChannelDesc } ></textarea>
          <span id = "submit-channel-form" onClick = { this.submitChannelForm.bind(this) } >
            make
          </span>
          <i id = "close-channel-form" className = "fa fa-times"
            onClick = { this.props.toggleChannelForm.bind(this) } ></i>
        </div>
      </div>
    )
  }
}

class ChannelArea extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showChannelForm : false
    }
  }
  joinChannel(channelName){
    this.props.joinChannel(channelName);
  }
  toggleChannelForm(){
    this.setState({
      showChannelForm : !this.state.showChannelForm
    })
  }
  submitChannelForm(newChannelData){
    this.props.makeChannel(newChannelData);
  }
  render() {
    let channels = this.props.channels.map(function(channel, i){
      return (
        <Channel key = { i } currentChannel = { this.props.currentChannel } channel = { channel } joinChannel = { this.joinChannel.bind(this) }/>
      );
    }, this);

    return(
      <div id = "channels-area">
        <div id = "channels-menu">
          <span id = "channels-menu-area">
            channels
          </span>
          <i id = "channel-add-button" className = "fa fa-plus"
            onClick = { this.toggleChannelForm.bind(this) } ></i>
          <ChannelSubmitForm showChannelForm = { this.state.showChannelForm }
            toggleChannelForm = { this.toggleChannelForm.bind(this) }
            submitChannelForm = { this.submitChannelForm.bind(this) }/>
        </div>
        <ul id = "channels-list">
          { channels }
        </ul>
      </div>
    )
  }
}

export default ChannelArea;