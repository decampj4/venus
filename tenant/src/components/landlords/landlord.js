import React from 'react-native';

var {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} = React;

export default class Landlord extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Landlord</Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
  },
  label: {
    fontSize: 30,
  },
  ratingView: {
    flex: 1,
  },
  ratingLabel: {
    flex: 5,
  },
  ratingImage: {
    flex: 7,
    resizeMode: 'stretch',
    overflow: 'visible',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  contentView: {
    flex: 4
  },
  contentLabel: {
    flex: 1,
  },
  contentScrollView: {
    flex: 9,
  },
});