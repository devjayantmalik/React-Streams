import React from 'react';
import {signIn, signOut} from '../actions';
import {connect} from 'react-redux';

class GoogleAuth extends React.Component{
  componentDidMount(){
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({clientId: '733376409195-6ve5770rroglr90bu8p0s4prirlphmah.apps.googleusercontent.com',
      scope: 'email'
    }).then(() => {
      this.auth = window.gapi.auth2.getAuthInstance();

      this.onAuthChange(this.auth.isSignedIn.get());
      this.auth.isSignedIn.listen(this.onAuthChange);
    });

    });

  }

  onAuthChange = (isSignedIn) => {

    if(isSignedIn){
      this.props.signIn(this.auth.currentUser.get().getId())
    } else{
      this.props.signOut();
    }


  }

  onSignInClick = () => {
    this.auth.signIn();
  }

  onSignOutClick = () => {
    this.auth.signOut();
  }

  renderAuthButton = () => {
    if(this.props.isSignedIn === null) return null;

    if(this.props.isSignedIn){
      return (
        <button
          onClick={this.onSignOutClick}
          className="ui red google icon button">
          <i className="google icon"></i>
          Sign Out
        </button>
      )
    }

    if(this.props.isSignedIn === false){
      return(
        <button
          onClick={this.onSignInClick}
          className="ui red google icon button">
          <i className="google icon"></i>
          Sign In with Google
        </button>
      )
    }
  }

  render(){
    return this.renderAuthButton()
  }
}

const mapStateToProps = (state, props) => {
  return {isSignedIn: state.auth.isSignedIn}
}

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);
