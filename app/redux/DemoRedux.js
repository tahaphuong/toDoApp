import React, { Component } from "react"
import {View, Text, Button} from 'react-native'
import { connect } from "react-redux"

class DemoRedux extends Component {
  render() {
    return (
      <View>
        <Text>{this.props.sumAll}</Text>
        <Button
          onPress={()=>this.props.increment({type: 'INCREMENT', payload: 2})}
          title="Plus more"
        />
      </View>
    )
  }
}

// output
const mapStateToProps = state => {
  return {
    sumAll: state.constReducer.sum
  }
}

// call function
const mapDispatchToProps = dispatch => {
  return {
    increment: action => dispatch(action),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DemoRedux)