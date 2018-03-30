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
          {name:'Roll over Beethoven', duration: 1345}, 
          {name: 'I\'m so keked', duration: 1236},
          {name: 'Eminence front', duration: 70000}] 
      },
      {
        name: 'Top rap songs',
        songs: [
          {name: 'Poop', duration: 1345}, 
          {name: 'Piss', duration: 1236}, 
          {name: 'I\'m so down', duration: 70000}
        ] 
      },
      {
        name: 'Classic',
        songs: [
          {name: 'Stairway to heaven', duration: 1345}, 
          {name: 'Smoke on the water', duration: 1236}, 
          {name: 'When the levee breaks', duration: 70000}
        ] 
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
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs)
    }, [])
    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration;
    }, 0)
    return (
      <div style={{...defaultStyle, width: "40%", display: "inline-block"}}>
        <h2>{Math.round(totalDuration/60)} hours</h2>
      </div>
    );
  }
} 

class Filter extends Component {
  render () {
    return (
    <div style ={defaultStyle}>
        <img/>
        <input type = "text" onKeyUp = {event => 
          this.props.onTextChange(event.target.value)}/>
      </div>
    );
  }
}

class Playlist extends Component {
  
  render () {
    let playlist = this.props.playlist;
    return (
      <div style={{...defaultStyle, display: "inline-block", width: '25%'}}>
        <img/>
        <h3>{playlist.name}</h3>
        <ul>
          {playlist.songs.map(song => 
            <li>{song.name}</li>
          )}
        </ul>
      </div>
    );
  }
}

class App extends Component {
  constructor(){
    super(...arguments);
    this.state = {
      serverData: {},
      filterString: ''
  };
  }
  componentDidMount () {
    setTimeout(() => {
      this.setState({serverData: fakeServerData});
  }, 1000);
  }
  render() {
    let playlistsToRender = this.state.serverData.user ? this.state.serverData.user.playlists
      .filter(playlist =>
      playlist.name.toLowerCase().includes(
        this.state.filterString.toLowerCase())
    ) : [];
    return (
      <div className="App">
      {this.state.serverData.user ?
        <div>
        {this.state.serverData.user &&
        <h1>{this.state.serverData.user.name}'s playlist
        </h1>}
          <PlaylistCounter playlists = {playlistsToRender}/>
          <HoursCounter playlists = {playlistsToRender}/>
          <Filter onTextChange = {text => {
            this.setState({filterString: text})
            }}/>
          {playlistsToRender.map(playlist => 
            <Playlist playlist = {playlist}/>
          )}
          </div> : <h1 style = {defaultStyle}>Loading...</h1>
          }
      </div>
    );
  }
}

export default App;
