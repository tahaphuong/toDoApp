import React, { Component } from "react"
import  {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  View,
  Text,
  TextInput,
  ActivityIndicator
} from "react-native"

import { sAuth } from '../MainStyle';
import { Icon } from 'react-native-elements';
import firebase from 'react-native-firebase';
import GLOBAL from '../GLOBAL';


class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      pass: '',
      errorLoginMess: '',
      buttonLogin: <Text style={sAuth.buttonAuthText}>SIGN IN</Text>,
      buttonDisable: false,

      allTasks: null,
      user: null,
    }
  }
  getInput = (name, value) => {
    this.setState({[name]: value})
  }

  handleLogin = async () => {
    
    const { email, pass } = this.state
    this.setState({...this.state, buttonLogin: <ActivityIndicator size="small"/>})

    if (email && pass) {
      try {
        let result = await firebase.auth().signInWithEmailAndPassword(email, pass)

        if (result.user) {
          await this.props.navigation.navigate('AuthLoading')
        }
        else { throw new Error('Invalid user')}

      } catch (err) {
        this.setState({ ...this.state, errorLoginMess: err.message, buttonLogin: <Text style={sAuth.buttonAuthText}>SIGN IN</Text>, buttonDisable: false})
      }
    } else {
      this.setState({...this.state, errorLoginMess: 'please fill all fields', buttonLogin: <Text style={sAuth.buttonAuthText}>SIGN IN</Text>, buttonDisable: false})
    }
  }
	
  render() {
    return(
      <View style={sAuth.background}>
        <View style={sAuth.modalLogin}>
          <View style={sAuth.modalLoginHeader}>
            <View>
              <Text style={sAuth.welcome}>Welcome</Text>
              <Text style={sAuth.signInToContinue}>Sign in to continue</Text>
            </View>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('SignUp')} style={sAuth.toSignUpCon}>
              <Text style={sAuth.toSignUpText}>New user</Text>
              <Icon name="md-arrow-forward" type="ionicon" size={15} color="#5b83e3"/>
            </TouchableOpacity>
          </View>

          <View>
            <Text style={sAuth.titleInput}>Email</Text>
            <View><TextInput onChangeText={(text)=>this.getInput('email', text)} style={sAuth.input}/></View>
          </View>

          <View>
            <Text style={sAuth.titleInput}>Password</Text>
            <View><TextInput onChangeText={(text)=>this.getInput('pass', text)} style={[sAuth.input, sAuth.inputPass]} secureTextEntry={true}/></View>
          </View>
          
          <View style={sAuth.messCon}>
            <Text style={sAuth.errorMessage}>{this.state.errorLoginMess}</Text>
            <Text style={sAuth.forgotPass}>Forgot Password?</Text>
          </View>
          <View>
            <TouchableOpacity disable={this.state.buttonDisable} onPress={()=>this.handleLogin()} style={sAuth.buttonAuth}>{this.state.buttonLogin}</TouchableOpacity>
          </View>

        </View>
        <View style={sAuth.orCon}><Text style={sAuth.textOutsideModal}>-OR-</Text></View>
        <View><TouchableOpacity style={sAuth.signInMethodButton}><Text style={sAuth.signInMethodButtonText}>Sign in with Facebook</Text></TouchableOpacity></View>
        <View><TouchableOpacity style={sAuth.signInMethodButton}><Text style={sAuth.signInMethodButtonText}>Sign in with Google</Text></TouchableOpacity></View>
      </View>
    )
  }
}

export default Login;

