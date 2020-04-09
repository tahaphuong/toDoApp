import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import GLOBAL from '../GLOBAL';
import firebase from 'react-native-firebase';
import { connect } from "react-redux";

class Loading extends Component {

  componentDidMount = async () => {
    // this._isMounted = true;

    firebase.auth().onAuthStateChanged(async user=> {
      if (user) {
      // get info user
      GLOBAL.user = user;

      let tasks;

      // get data
      await firebase.firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then(async doc=>{
        if (doc.data()) {
          GLOBAL.allTasks = doc.data()
          tasks = doc.data()
        } else {
          console.log('AUTHLOADING: no data!')
        }
      })
      .catch(err=>{console.log(err.message)})

      // save data and navigate
      await this.props.handle({type: 'saveInfoWhenLogin', payload: {user: user, tasks: tasks}})
      console.log(this.props)

      await this.props.navigation.navigate('AppStack')
      } else {
        this.props.navigation.navigate('AuthStack')
      }
    })

  }
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9fcff'}}>
        <ActivityIndicator size="large"/>
      </View>
    )
  }
}


// output
// const mapStateToProps = state => {
//   return {
//     data: state.handleUser
//   }
// }

// call function
const mapDispatchToProps = dispatch => {
  return {
    handle: action => dispatch(action),
  }
}

export default connect(null, mapDispatchToProps)(Loading)