import React, { Component } from 'react';
import './App.css';

let defaultStyle = {
  color: '#fff'
};

let fakeServerData = {
  user: {
    name: 'Max',
    playlists: [
      {
        name: 'My favorites',
        songs: [
          {name: 'Heart-Shaped Box', duration: 1345},
          {name: 'Lake Of Fire', duration: 1236},
          {name: 'Where Did You Sleep Last Night', duration: 70000}
        ]
      },
      {
        name: 'Discover Weekely',
        songs: [
          {name: 'Aerials', duration: 1345},
          {name: 'BYOB', duration: 1236},
          {name: 'Roulette', duration: 70000}
        ]
      },
      {
        name: 'Another playlist - best one!',
        songs: [
          {name: 'Old School Hollywood', duration: 1345},
          {name: 'Hypnotize', duration: 1236},
          {name: 'Forest', duration: 70000}
        ]
      },
      {
        name: 'Playlist - yeah!',
        songs: [
          {name: 'Psychosocial', duration: 1345},
          {name: 'Before I Forget', duration: 1236},
          {name: 'Duality', duration: 70000}
        ]
      }
    ]
  }
};

class PlaylistCounter extends Component {
  render() {
    return (
      <div style={{...defaultStyle, width: '40%', display: 'inline-block'}}>
        <h2>{this.props.playlists.length} Playlists</h2>
      </div>
    );
  }
}

class HoursCounter extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs)
    }, [])
    let totalDuration = allSongs.reduce((sum,eachSong) => {
      return sum + eachSong.duration
    }, 0)
    return (
      <div style={{...defaultStyle, width: '40%', display: 'inline-block'}}>
        <h2>{Math.round(totalDuration/60)} Hours</h2>
      </div>
    );
  }
}

class Filter extends Component {
  render() {
    return (
      <div style={defaultStyle}>
        <img />
        <input type="text" />
      </div>
    );
  }
}

class Playlist extends Component {
  render() {
    let playlist = this.props.playlist
    return (
      <div style={{...defaultStyle, display: 'inline-block', width: '25%'}}>
        <img />
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
  constructor(props) {
    super(props);
    this.state = {serverData: {}}
  }
  componentDidMount() {
    setTimeout(() => {
    this.setState({serverData: fakeServerData});
  }, 1000);
}
  render() {
    return (
      <div className="App">
      {this.state.serverData.user ?
        <div>
          <h1 style={{...defaultStyle, 'font-size': '54px'}}>
            {this.state.serverData.user.name}'s Playlist
          </h1>
            <PlaylistCounter playlists={this.state.serverData.user && this.state.serverData.user.playlists}/>
            <HoursCounter playlists={this.state.serverData.user && this.state.serverData.user.playlists}/>           
            <Filter />
            {this.state.serverData.user.playlists.map(playlists =>
              <Playlist playlist={playlists} />
            )}
          </div> : <h1 style={defaultStyle}>Loading...</h1>
          }
        </div>
      );
    }
  }

export default App;
