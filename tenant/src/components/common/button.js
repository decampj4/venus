'use strict';
import React from 'react-native';
var {
  Text,
  StyleSheet,
  TouchableHighlight,
} = React;

export default class Button extends React.Component {
  render() {
    return (
      <TouchableHighlight
        onPress={this.props.handleButtonPress}
        style={[styles.button, this.props.style]}
        underlayColor='gray'>
        <Text style={styles.buttonText}>
          {this.props.text}
        </Text>
      </TouchableHighlight>
    );
  }
}

var styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    borderColor: 'black',
    marginTop: 10
  },
  buttonText: {
    flex: 1,
    alignSelf: 'center',
    fontSize: 20,
  }
});