import React from 'react';
import rp from 'request-promise';

class Auth extends React.Component {

  constructor(props) {
    super(props);
    const user = this.props.db.auth().currentUser;

    this.state = {
      user
    };

    // this.db = this.props.db.database().ref('intels');
    console.log('Auth constructor');

    this.props.db.auth().onAuthStateChanged(user => {
      console.log('Auth onAuthStateChanged user ', user);
      this.setState({
        user
      });
      // if (user) {
      //   // User is signed in.
      // } else {
      //   // No user is signed in.
      // }
    });


    this.auth = this.auth.bind(this);
  }

  async auth() {
    const uid = 111;

    // rp('http://localhost:3000/token/' + uid)
    //   .then(token => {
    //     console.log('Auth toke token', token);
    //     this.props.db.auth().signInWithCustomToken(token)
    //       .then(() => console.log('Authenticated'))
    //       .catch(error => {
    //       // Handle Errors here.
    //       var errorCode = error.code;
    //       var errorMessage = error.message;
    //       // ...
    //       console.log('Auth  error  ', errorCode, errorMessage);
    //     });
    //   })
    //   .catch(error => console.error(error))

    //async / await
    try {
      const token = await rp('http://localhost:3000/token/' + uid);
      await this.props.db.auth().signInWithCustomToken(token)

    } catch (error) {
      console.error(error);
    }
  }

  async logout() {
    // this.props.db.auth().signOut().then(() => {
    //   // Sign-out successful.
    //   console.log('Auth signed out ');
    // }).catch(function(error) {
    //   // An error happened.
    //   console.error('Auth signed out error ', error);
    // });

    try {
      await this.props.db.auth().signOut()
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (<div>
      <button onClick={this.auth} data-tid="btn-auth">Auth</button>
      <button onClick={() => this.logout()} data-tid="btn-logout">logout</button>
      <p data-tid="status-auth">Auth user: {this.state.user ? this.state.user.uid : 'not authorized'}</p>
    </div>);
  }
}

export default Auth;
