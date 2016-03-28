import React from 'react-native';
import PropertiesList from '../properties/properties_list';
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
        <View style={styles.attributesView}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.attribute}>{this.props.name}</Text>
          <Text style={styles.label}>Company</Text>
          <Text style={styles.attribute}>{this.props.company}</Text>
          <Text style={styles.label}>Properties</Text>
        </View>
        <View style={styles.propertiesView}>
          <PropertiesList landlordId={this.props.id} navigator={this.props.navigator} />
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
    flex: 1,
    justifyContent: 'space-between',
  },
  propertiesView: {
    flex: 2,
    marginLeft: 5,
    marginRight: 5,
  },
});