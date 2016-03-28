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

export default class AddProperty extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      street_address_one: '',
      street_address_two: '',
      city: '',
      state: '',
      postal_code: '',
      country: '',
    };
  }

  containerTouched(event) {
    for(let ref in this.refs) {
      this.refs[ref].blur();
    }
    return false;
  }

  handleAddPropertyButtonPress() {
    API.createProperty({
      street_address_one: this.state.street_address_one, 
      street_address_two: this.state.street_address_two, 
      city: this.state.city, 
      state: this.state.state, 
      postal_code: this.state.postal_code, 
      country: this.state.country, 
      landlord_id: this.props.landlordId
    })
      .then((property) => {
        this.props.navigator.replace({
          name: 'property',
          props: property,
          nextRoute: 'addReview',
          nextRouteText: 'Add Review',
          nextRouteProps: {
            propertyId: property.id,
          },
        });
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
      <View style={styles.container}
        onStartShouldSetResponder={this.containerTouched.bind(this)}
        >
        {this.renderErrors()}
        <View style={styles.attributeView}>
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            value={this.state.name}
            onChangeText={(text) => {this.setState({street_address_one: text, errors: ''})}}
            ref='addressOneTextInput'
            />
        </View>
        <View style={styles.attributeView}>
          <Text style={styles.label}>Apt/Unit</Text>
          <TextInput
            style={styles.input}
            value={this.state.name}
            onChangeText={(text) => {this.setState({street_address_two: text, errors: ''})}}
            ref='addressTwoTextInput'
            />
        </View>
        <View style={styles.attributeView}>
          <Text style={styles.label}>City</Text>
          <TextInput
            style={styles.input}
            value={this.state.name}
            onChangeText={(text) => {this.setState({city: text, errors: ''})}}
            ref='cityTextInput'
            />
        </View>
        <View style={styles.attributeView}>
          <Text style={styles.label}>State</Text>
          <TextInput
            style={styles.input}
            value={this.state.name}
            onChangeText={(text) => {this.setState({state: text, errors: ''})}}
            ref='stateTextInput'
            />
        </View>
        <View style={styles.attributeView}>
          <Text style={styles.label}>Postal Code</Text>
          <TextInput
            style={styles.input}
            value={this.state.name}
            onChangeText={(text) => {this.setState({postal_code: text, errors: ''})}}
            ref='postalCodeTextInput'
            />
        </View>
        <View style={styles.attributeView}>
          <Text style={styles.label}>Country</Text>
          <TextInput
            style={styles.input}
            value={this.state.name}
            onChangeText={(text) => {this.setState({country: text, errors: ''})}}
            ref='countryTextInput'
            />
        </View>
        <View style={styles.submitView}>
          <Button style={styles.submitButton} text={'Add Property'} handleButtonPress={this.handleAddPropertyButtonPress.bind(this)} />
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
    marginTop: 2,
    fontSize: 25,
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
  attributeView: {
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