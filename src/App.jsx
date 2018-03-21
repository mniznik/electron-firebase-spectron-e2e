import React from 'react';
import * as firebase from "firebase";
import AddIntel from './AddIntel.jsx';
import Auth from './Auth.jsx';
import IntelList from './IntelList.jsx';

class App extends React.Component {

  constructor(props) {
    super(props);
      const config = {
          apiKey: "",
          authDomain: "",
          databaseURL: "",
          projectId: "",
          storageBucket: "",
          messagingSenderId: ""
    };
    console.log('App constructor initapp');
    firebase.initializeApp(config);
  }

  render() {
    return (<div>
      <h2>Welcome to React! mate 1</h2>
      <Auth db={firebase}/>
      <AddIntel db={firebase}/>
      <IntelList db={firebase}/>
    </div>);
  }
}

export default App;
