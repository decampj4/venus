import React from 'react-native';
import ReviewsList from '../reviews/reviews_list';
var {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} = React;

export default class Property extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.attributesView}>
          <Text style={styles.label}>Address</Text>
          <Text style={styles.attribute}>{this.props.street_address_one}</Text>
          <Text style={styles.label}>Apt/Unit</Text>
          <Text style={styles.attribute}>{this.props.street_address_two}</Text>
          <Text style={styles.label}>City</Text>
          <Text style={styles.attribute}>{this.props.city}</Text>
          <Text style={styles.label}>State</Text>
          <Text style={styles.attribute}>{this.props.state}</Text>
          <Text style={styles.label}>Postal Code</Text>
          <Text style={styles.attribute}>{this.props.postal_code}</Text>
          <Text style={styles.label}>Country</Text>
          <Text style={styles.attribute}>{this.props.country}</Text>
          <Text style={styles.label}>Reviews</Text>
        </View>
        <View style={styles.propertiesView}>
          <ReviewsList propertyId={this.props.id} navigator={this.props.navigator} />
        </View>
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
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 5
  },
  attribute: {
    fontSize: 18,
    marginLeft: 20,
  },
  attributesView: {
    flex: 2,
    justifyContent: 'space-between',
  },
  propertiesView: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
  },
});