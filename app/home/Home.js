import React, { Component } from "react"
import  {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  View,
  Text,
  Image,
  PanResponder,
  Animated

} from "react-native"

import { sHome } from '../MainStyle';
import { Icon } from 'react-native-elements';
import { connect } from "react-redux";
import firebase from 'react-native-firebase';


// import GLOBAL from '../GLOBAL';


// VERTICAL DEVICE ONLY
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const colorByTasks = {
  personal: "#f9c229",
  work: "#03c03c",
  meeting: "#d10263"
}

const bellColor = {
  on: '#ffdc00',
  off: '#dedede'
}

const taskColor = {
  yellow: '#ffd506',
  red: '#d10263',
  green: '#1ed102'
}

const tick = <Icon name='ios-checkmark-circle' type='ionicon' color='#83c752' size={WIDTH*0.07}/>
const untick = <Icon name='ios-radio-button-off' type='ionicon' color='#dedede' size={WIDTH*0.07}/>

class HomeScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      taskTextStyle: sHome.taskContentTextNormal,
    };
    
  }


  // 2 below functions are pretty similar. Should combine as one.

  changeTick = async (createdAt, cate) => {
    let tasks = this.props.data.userTasks;

    for (let ele of tasks[cate]) {
      if(ele.createdAt == createdAt) {
        ele.tick = !ele.tick;
      }
    }
    await this.props.handle({type: 'updateTasks', payload: {tasks: tasks}})    

    await firebase
    .firestore()
    .collection('users')
    .doc(this.props.data.userData.uid)
    .update({
      [cate]: tasks[cate]
    })

  }

  changeNoti = async (createdAt, cate) => {
    let tasks = this.props.data.userTasks;

    for (let ele of tasks[cate]) {
      if(ele.createdAt == createdAt) {
        ele.noti = !ele.noti;
      }
    }
    await this.props.handle({type: 'updateTasks', payload: {tasks: tasks}})    

    await firebase
    .firestore()
    .collection('users')
    .doc(this.props.data.userData.uid)
    .update({
      [cate]: tasks[cate]
    })

  }
  
  render() {
    // delete this
    // GLOBAL.homeScreen = this;
    
    let list = this.props.data.userTasks;
    let tasksToday = []

    // NOW: show all, unordered list
    // FIX: show in date order

    // go through each prop of object
    for (let cate in list) {
      // go through each ele of array
      for (let task of list[cate]) {
        if (new Date(task.time).toLocaleDateString() == new Date().toLocaleDateString()){
          tasksToday.push(
          <View style={[sHome.taskLine, {backgroundColor: colorByTasks[cate]}]} key={tasksToday.length}>
            <View style={sHome.task}>
              <TouchableOpacity onPress={()=>this.changeTick(task.createdAt, cate)}>{task.tick ? tick : untick}</TouchableOpacity>
              <View style={sHome.taskTimeCon}><Text style={sHome.taskTimeText}>{task.time}</Text></View>
              <View style={sHome.taskContentCon}><Text style={sHome.taskContentTextNormal}>{task.content}</Text></View>
              <TouchableOpacity onPress={()=>this.changeNoti(task.createdAt, cate)}><Icon name='ios-notifications' type='ionicon' color={task.noti ? bellColor.on : bellColor.off} size={WIDTH*0.06}/></TouchableOpacity>
            </View>
          </View>
          )
        }
      }
    }

    return(
      <>
      <ScrollView>
      <View style={sHome.header}>

        <View style={sHome.profileHeader}>
          <View>
            <Text style={sHome.hello}>Hello {this.props.data.userData.displayName}</Text>
            <Text style={sHome.helloTasks}>Today you have {tasksToday.length} tasks.</Text>
          </View>
          <View style={sHome.avaFrame}><Image/></View>
        </View>

        <View style={sHome.reminderHeaderCon}>
          <View style={sHome.reminderHeader}>
            <View><Text style={sHome.todayReminder}>Today Reminder</Text></View>
            <View><Text style={sHome.workReminder}>Meeting with client</Text></View>
            <View><Text style={sHome.timeReminder}>13.00 P.M</Text></View>
          </View>
          <View style={sHome.bellReminderCon}><Image source={require("../img/bell.png")} style={{width: HEIGHT*0.12, height: HEIGHT*0.12}}/></View>
        </View>
        
      </View>

      <View style={sHome.body}>

        <View style={sHome.section}>
          <View><Text style={sHome.title}>Today</Text></View>

          <View style={sHome.taskList}>
            
            {tasksToday}
          </View>

        </View>


      </View>
      </ScrollView>
      </>
    );
  }
}

{/* <Animated.View {...this.panResponder.panHandlers} style={[this.state.pan.getLayout(), sHome.taskLine, {backgroundColor: taskColor.yellow}]}>
              <View style={sHome.task}>
                <TouchableOpacity onPress={this.changeTick}><Icon name='ios-radio-button-off' type='ionicon' color='#dedede' size={WIDTH*0.07}/></TouchableOpacity>
                <View style={sHome.taskTimeCon}><Text style={sHome.taskTimeText}>13.00 P.M</Text></View>
                <View style={sHome.taskContentCon}><Text style={sHome.taskContentTextNormal}>Meeting with mommy</Text></View>
                <TouchableOpacity><Icon name='ios-notifications' type='ionicon' color={bellColor.off} size={WIDTH*0.06}/></TouchableOpacity>
              </View>
            </Animated.View> */}

            {/* list tasks */}

// output
const mapStateToProps = state => {
  return {
    data: state.handleUser
  }
}

// call function
const mapDispatchToProps = dispatch => {
  return {
    handle: action => dispatch(action),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
