import React, { Component } from "react"
import  {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  View,
  Text,
  Image,
} from "react-native"

import { sHome, sTask } from '../MainStyle';
import { Icon } from 'react-native-elements';
import { connect } from "react-redux";

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const taskColor = {
  personal: "#f9c229",
  work: "#03c03c",
  meeting: "#d10263"
}

class TaskScreen extends Component {

  projectWidget = (bgColor, iconName, iconColor, title, tasks) => {
    return (
    <TouchableOpacity style={sTask.project} onPress={()=>this.props.navigation.navigate('TaskDetail', {cate: title})}>
      <View style={[sTask.iconCon, {backgroundColor: bgColor}]}><Icon name={iconName} type="ionicon" color={iconColor} size={40}/></View>
      <Text style={sTask.titleProject}>{title}</Text><Text style={sTask.tasksProject}>{tasks ? tasks.length : 0} tasks</Text>  
    </TouchableOpacity>);
  }

  render() {
    let tasks = this.props.data.userTasks;
    let numTasks = 0;
    for (let x in tasks) {
      numTasks += tasks[x].length
      console.log(x)
    }

    return(
      <>
      <View style={sHome.header}>

        <View style={sHome.profileHeader}>
          <View>
            <Text style={sHome.hello}>Hello {this.props.data.userData.displayName}</Text>
            <Text style={sHome.helloTasks}>You have total {numTasks} tasks.</Text>
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

      <ScrollView style={sTask.body}>
        <View style={sHome.section}>
          <View><Text style={sHome.title}>Projects</Text></View>
          <View style={sTask.projectList}>
            {this.projectWidget('#ffee9b5c', "md-person", "#f9c229", 'Personal', this.props.data.userTasks.personal)}
            {this.projectWidget('#b5ff9b5c', "md-briefcase", "#03c03c", 'Work', this.props.data.userTasks.work)}
            {this.projectWidget('#ff9bcd5c', "ios-easel", "#d10263", 'Meeting', this.props.data.userTasks.meeting)}
            {this.projectWidget('#ffd09b5c', "md-pricetag", "#ec6c0b", 'Shopping', this.props.data.userTasks.shopping)}


          </View>
        </View>
      </ScrollView>
      </>
    );
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(TaskScreen);