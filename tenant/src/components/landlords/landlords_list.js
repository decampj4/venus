import React from 'react-native';
import API from '../../lib/api/v1/api';
var {
  StyleSheet,
  View,
  Text,
  ListView,
  RefreshControl,
  TouchableHighlight,
} = React;

// The distance (in the y direction) that will trigger a refresh
const PULLDOWN_DISTANCE = 40;

export default class LandlordsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      landlords: [],
      loading: false,
    };
  }

  getDefaultDataSource() {
    return new ListView.DataSource({
      rowHasChanged(r1, r2) {
        return r1 !== r2;
      }
    });
  }

  componentWillMount() {
    this.loadLandlords();
  }

  componentWillReceiveProps(nextProps) {
    // This is a hacky way to reload the list when the navigator navigates back to this scene, but it's fine
    // for now
    this.loadLandlords();
  }

  loadLandlords() {
    if (this.state.loading) {
      // Bail out immediately if we're already loading the landlords
      return;
    }

    this.setState({
      loading: true,
    });
    API.getLandlords().then((landlords) => {
      this.setState({
        landlords: landlords,
        loading: false,
      });
    });
  }

  handleScroll(event) {
    if (event.nativeEvent.contentOffset.y < -PULLDOWN_DISTANCE) {
      this.loadLandlords();
    }
  }

  handleRenderHeader() {
    return this.state.loading ? <View style={styles.listHeader}><Text>Loading</Text></View> : null;
  }

  handleRowPress(landlordId) {
    let landlord = this.state.landlords.find((landlord) => {
      return landlord.id === landlordId;
    });
    this.props.navigator.push({
      name: 'landlord',
      props: landlord,
      nextRoute: 'addProperty',
      nextRouteText: 'Add Property',
      nextRouteProps: {
        landlordId: landlord.id,
      },
    });
  }

  handleRenderRow(rowData) {
    return (
      <TouchableHighlight 
        style={styles.listItemView}
        underlayColor='gray'
        onPress={this.handleRowPress.bind(this, rowData.id)}
        key={rowData.id}
        >
        <Text style={styles.listItem} numberOfLines={1}>
          {rowData.company ? `${rowData.name} - ${rowData.company}` : rowData.name}
        </Text>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View>
        <ListView
          style={styles.listView}
          contentContainerStyle={styles.listViewContainer}
          dataSource={this.getDefaultDataSource().cloneWithRows(this.state.landlords)}
          renderRow={this.handleRenderRow.bind(this)}
          renderHeader={this.handleRenderHeader.bind(this)}
          onScroll={this.handleScroll.bind(this)}
          />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  listView: {
    marginTop: 60,
  },
  listViewContainer: {
    backgroundColor: 'white',
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 5,
  },
  listItemView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 1,
    paddingBottom: 1,
    overflow: 'hidden',
    borderBottomWidth: 1,
    borderBottomColor: '#D0D0D0',
  },
  listItem: {
    fontSize: 20,
  },
  listHeader: {
    alignItems: 'center',
  },
  listFooter: {
    alignItems: 'center',
  },
});