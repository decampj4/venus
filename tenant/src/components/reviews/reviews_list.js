import React from 'react-native';
import API from '../../lib/api/v1/api';
var {
  StyleSheet,
  View,
  Text,
  ListView,
  TouchableHighlight,
} = React;

export default class ReviewsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: [{content: 'Loading...'}],
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
    API.getReviews()
      .then((reviews) => {
        this.setState({reviews});
      });
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
          {rowData.content}
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
          dataSource={this.getDefaultDataSource().cloneWithRows(this.state.reviews)}
          renderRow={this.handleRenderRow.bind(this)}
          >  
        </ListView>
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
  }
});