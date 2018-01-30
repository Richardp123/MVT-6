import React, { Component } from 'react';
import './App.css';
import mySocket from "socket.io-client";

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      mode: 0,
      username: "",
      users: [],
      allChats: [],
      myMsg: ""
    }
    this.joinChat = this.joinChat.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handleMyMsg = this.handleMyMsg.bind(this);
    this.sendChat = this.sendChat.bind(this);
  }

  componentDidMount() {
    // this.socket = mySocket("http://localhost:10001");
  }

  joinChat() {
    this.setState({
      mode: 1
    })
    this.socket = mySocket("http://localhost:10001");
    this.socket.emit("username", this.state.username);

    this.socket.on("usersjoined", (data) => {
      console.log(data);
      this.setState({
        users: data
      })
    });

    this.socket.on("msgsent", (data)=>{
      this.setState({
        allChats:data
      })
    });
  }

  handleUsername(evt) {
    this.setState({
      username: evt.target.value
    })
  }

  handleMyMsg(evt) {
    this.setState({
      myMsg: evt.target.value
    })
  }

  sendChat() {
    var msg = this.state.username + ": " + this.state.myMsg;
    this.socket.emit("sendChat", msg);
  }

  render() {

    var config = null;

    if (this.state.mode === 0) {
      config = (
        <div>
          <input type = "text" placeholder = "Type your username"
          onChange = {this.handleUsername}/>
          <button onClick = {this.joinChat}>Join Chat</button>
        </div>
      )
    } else if (this.state.mode === 1) {
      var allChats = this.state.allChats.map((obj,i)=>{
        return (
          <div key={i}>
            {obj}
          </div>
        )
      });
      config = (
        <div id="chatBox">
        <div id="chatDisplay">{allChats}</div>
        <div id="controls">
          <input type="text" placeholder="Type your message"
          onChange={this.handleMyMsg}/>
          <button onClick={this.sendChat}>Send</button>
        </div>
        </div>
      )
    }

    var allUsers = this.state.users.map((obj, i) => {
      return (
        <div key={i}>
          {obj}
        </div>
      )
    });



    return (
      <div className="App">
        <div id="mainPage">

        <div id="mvtInfo">MOTOR VEHICKLE FEFT IS THE SICKSTH ITTERATION OF THE POPULAR CAR STEALING GAME MOTER VHIKKEL THEPHTD. ITS GOT AKSHIN PACKED CAR STEELING AND DRIVING. PLAY WITH YOURE FEIRNDS OR ALONE. YOU WILL HAVE LOTS OF FUNS.
        <br />
        <button id="mvtBut">ENTER</button>
        </div>

        </div>
        <div id="mvtLogo">
        </div>

        // CHATROOM HERE

        {config}
        <hr/>
        <div id="allUsers">
          Users in the chatroom right now
          <div id="users">
          {allUsers}
          </div>
        </div>

      </div>
    );
  }
}

export default App;
