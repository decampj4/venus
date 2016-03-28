import React from 'react-native';
import API from '../../lib/api/v1/api';
var {
  StyleSheet,
  View,
  Text,
  ListView,
  TouchableHighlight,
} = React;

// The distance (in the y direction) that will trigger a refresh
const PULLDOWN_DISTANCE = 40;

export default class ReviewsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: [],
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
    this.loadReviews();
  }

  componentWillReceiveProps(nextProps) {
    // This is a hacky way to reload the list when the navigator navigates back to this scene, but it's fine
    // for now
    this.loadReviews();
  }

  loadReviews() {
    if (this.state.loading) {
      // Bail out immediately if we're already loading the reviews
      return;
    }

    this.setState({
      loading: true,
    });
    API.getReviewsByProperty(this.props.propertyId).then((reviews) => {
      this.setState({
        reviews: reviews,
        loading: false,
      });
    });
  }

  handleScroll(event) {
    if (event.nativeEvent.contentOffset.y < -PULLDOWN_DISTANCE) {
      this.loadReviews();
    }
  }

  handleRenderHeader() {
    return this.state.loading ? <View style={styles.listHeader}><Text>Loading</Text></View> : null;
  }

  handleRowPress(reviewId) {
    let review = this.state.reviews.find((review) => {
      return review.id === reviewId;
    });
    this.props.navigator.push({name: 'review', props: review})
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
          {`${rowData.rating} Stars - ${rowData.content}`}
        </Text>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          style={styles.listView}
          contentContainerStyle={styles.listViewContainer}
          dataSource={this.getDefaultDataSource().cloneWithRows(this.state.reviews)}
          renderRow={this.handleRenderRow.bind(this)}
          renderHeader={this.handleRenderHeader.bind(this)}
          onScroll={this.handleScroll.bind(this)}
          />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listView: {

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