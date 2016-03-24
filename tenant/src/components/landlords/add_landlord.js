import React from 'react-native';
import Button from '../common/button';
import API from '../../lib/api/v1/api';
var {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
} = React;

export default class AddLandlord extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      company: '',
      errors: '',
    };
  }

  handleAddLandlordButtonPress() {
    if (!this.state.name) {
      this.setState({errors: 'A name must be set'});
      return;
    }

    API.createLandlord({name: this.state.name, company: this.state.company})
      .then((landlord) => {
        this.props.navigator.push({name: 'landlord', props: landlord})
      })
      .catch((error) => {
        this.setState({errors: `Submission error - ${error}`});
      });
  }

  renderErrors() {
    if (!this.state.errors) {
      return null;
    }

    return (
      <View style={styles.errorView}>
        <Text style={styles.errorText}>{this.state.errors}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderErrors()}
        <View style={styles.nameView}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={this.state.name}
            onChangeText={(text) => {this.setState({name: text, errors: ''})}}
            />
        </View>
        <View style={styles.companyView}>
          <Text style={styles.label}>Company</Text>
          <TextInput
            style={styles.input}
            value={this.state.company}
            onChangeText={(text) => {this.setState({company: text, errors: ''})}}
            />
        </View>
        <View style={styles.submitView}>
          <Button style={styles.submitButton} text={'Add Landlord'} handleButtonPress={this.handleAddLandlordButtonPress.bind(this)} />
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
    justifyContent: 'space-between'
  },
  label: {
    fontSize: 30,
  },
  input: {
    height: 40,
    borderColor: '#D0D0D0',
    borderWidth: 2,
    borderRadius: 5,
    margin: 5,
    padding: 5,
    width: Dimensions.get('window').width - 10,
    alignSelf: 'center',
    backgroundColor: 'white',
  },
  nameView: {
    flex: 1
  },
  companyView: {
    flex: 1
  },
  submitView: {
    flex: 1
  },
  submitButton: {
    backgroundColor: '#C7A4B9',
    marginLeft: 10,
    marginRight: 10,
  },
  errorView: {
    flex: 0.25,
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  }
});