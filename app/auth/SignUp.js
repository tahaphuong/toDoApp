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
import firebase from 'react-native-firebase';
import GLOBAL from '../GLOBAL';


class SignUp extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',

      buttonSignUp: <Text style={sAuth.buttonAuthText}>SIGN UP</Text>,
      buttonDisable: false,
      errorMessageAuth: ''
    }
  }

  validate = (text) => {
    if (text.trim().length) {return true}
  }

  setUser = (name, value) => {
		this.setState({[name]:value})
  }

  handleSignUp = async () => {
    const { username, email, password, confirmPassword } = this.state

    if (this.validate(username) && this.validate(email) && this.validate(password) && this.validate(confirmPassword) && (password==confirmPassword)) {
      this.setState({...this.state, buttonSignUp: <ActivityIndicator size="small"/>, buttonDisable: true})
      
      try{

        let user;

        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(userData=>user = userData.user)

        await firebase.auth().currentUser.updateProfile({displayName: username, photoURL: 'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'})

        // CREATE DATABASE
        let userId = user.uid // get user uid
        await firebase.firestore()
        .collection('users')
        .doc(userId)
        .set({})
        
        // Navigate to AuthLoading screen
        await this.props.navigation.navigate('AuthLoading')

      } catch(err) {
        this.setState({...this.state, errorMessageAuth: err.message, buttonSignUp: <Text style={sAuth.buttonAuthText}>SIGN UP</Text>, buttonDisable: false})
      }
      console.log(this.state)
    } else {
      this.setState({...this.state, errorMessageAuth: 'Invalid input!', buttonSignUp: <Text style={sAuth.buttonAuthText}>SIGN UP</Text>, buttonDisable: false})
    }
  }
  render() {
    return(
      <View style={sAuth.background}>
        <View style={sAuth.modalSignUp}>
          <View style={sAuth.modalLoginHeader}>
            <Text style={sAuth.welcome}>Sign Up</Text>
          </View>

          <View>
            <Text style={sAuth.titleInput}>Name</Text>
            <View><TextInput onChangeText={text=>this.setUser('username', text)} maxLength={20} style={sAuth.input}/></View>
          </View>

          <View>
            <Text style={sAuth.titleInput}>Email</Text>
            <View><TextInput onChangeText={text=>this.setUser('email', text)} maxLength={40} style={sAuth.input}/></View>
          </View>

          <View>
            <Text style={sAuth.titleInput}>Password</Text>
            <View><TextInput onChangeText={text=>this.setUser('password', text)} maxLength={30} style={[sAuth.input, sAuth.inputPass]} secureTextEntry={true}/></View>
          </View>
          <View>
            <Text style={sAuth.titleInput}>Confirm Password</Text>
            <View><TextInput onChangeText={text=>this.setUser('confirmPassword', text)} maxLength={30} style={[sAuth.input, sAuth.inputPass]} secureTextEntry={true}/></View>
          </View>
          
          <View style={sAuth.messCon}>
            <Text style={sAuth.errorMessage}>{this.state.errorMessageAuth}</Text>
          </View>
          <View>
            <TouchableOpacity onPress={()=>this.handleSignUp()} style={sAuth.buttonAuth}>{this.state.buttonSignUp}</TouchableOpacity>
          </View>

        </View>
        <TouchableOpacity disable={this.state.buttonDisable} onPress={()=>this.props.navigation.navigate('Login')} style={sAuth.orCon}>
          <Text style={[sAuth.textOutsideModal, {marginTop: 20}]}>You have an account? Log in</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default SignUp;