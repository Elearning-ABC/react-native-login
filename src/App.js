import React, { Component } from 'react'
import GoogleLogin from 'react-google-login'

export class App extends Component {

  onSuccess = (response) => {
    console.log("Success", response.profileObj);
  }

  onFailure = (response) => {
    console.log("Fail", response);
  }

  render() {
    return (
      <div>
        <GoogleLogin 
          clientId='140095184917-7m29t7386k3opolh79drbtpn6585ejmb.apps.googleusercontent.com' //get id in console.cloud.google.com
          buttonText='Login'
          onSuccess={this.onSuccess}
          onFailure={this.onFailure}
          cookiePolicy={'single_host_origin'}
        />        
      </div>
    );
  }
}

export default App