import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

let defaultTextColor = '#fff';
let defaultStyle = {
  color: defaultTextColor
}
let fakeServerData = {
  user: {
    name: 'Lev',
    playlists: [
      {
        name: 'My favorites',
        songs: [ 
          {name: 'Light my fire', duration: 1345}, 
          {name: 'You\'ve never give me your money', duration: 1236},
          {name: 'Sound of silence', duration: 70000}
        ]
      },
      {
        name: 'Discover Weekly',
        songs: [
          {name:'Roll over Beethoven', duration: }, 
          {name: 'I\'m so keked', duration: },
          {name: 'Eminence front', duration: }] 
      },
      {
        name: 'Top rap songs',
        songs: ['Poop', 'Piss', 'I\'m so down'] 
      },
      {
        name: 'Classic',
        songs: ['Stairway to heaven', 'Smoke on the water', 'When the levee breaks'] 
      }
    ]
  }
}

class PlaylistCounter extends Component {
  render () {
    return (
      <div style={{...defaultStyle, width: "40%", display: "inline-block"}}>
        <h2>{this.props.playlists && this.props.playlists.length} playlists</h2>
      </div>
    );
  }
} 

class HoursCounter extends Component {
  render () {
    return (
      <div style={{...defaultStyle, width: "40%", display: "inline-block"}}>
        <h2>{this.props.playlists && this.props.playlists.length} hours</h2>
      </div>
    );
  }
} 

class Filter extends Component {
  render () {
    return (
    <div style ={defaultStyle}>
        <img/>
        <input type="text"/>
      </div>
    );
  }
}

class Playlist extends Component {
  render () {
    return (
      <div style={{...defaultStyle, display: "inline-block", width: '25%'}}>
        <img/>
        <h3>Playlist Name</h3>
        <ul><li>Song 1</li><li>Song 2</li><li>Song 3</li></ul>
      </div>
    );
  }
}

class App extends Component {
  constructor(){
    super(...arguments);
    this.state = {serverData: {}}
  }
  componentDidMount () {
    setTimeout(() => {
      this.setState({serverData: fakeServerData});
  }, 1000);
  }
  render() {
    return (
      <div className="App">
      {this.state.serverData.user ?
        <div>
        {this.state.serverData.user &&
        <h1>{this.state.serverData.user.name}'s playlist
        </h1>}
          <PlaylistCounter playlists = {this.state.serverData.user.playlists}/>
          <HoursCounter playlists = {this.state.serverData.user.playlists}/>
          <Filter/>
          <Playlist/>
          <Playlist/>
          <Playlist/>
          <Playlist/>
          </div> : <h1 style = {defaultStyle}>Loading...</h1>
          }
      </div>
    );
  }
}

export default App;
