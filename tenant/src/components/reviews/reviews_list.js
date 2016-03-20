import React from 'react-native';
var {
  StyleSheet,
  View,
  Text,
  ListView,
} = React;

export default class ReviewsList extends React.Component {
  constructor(props) {
    super(props);

    var ds = new ListView.DataSource({
      rowHasChanged(r1, r2) {
        return r1 !== r2;
      }
    });

    this.state = {
      dataSource: ds.cloneWithRows(['Loading.....']),
    };
  }

  componentWillMount() {
         
  }

  handleRenderRow(rowData) {
    return (
      <Text>{rowData}</Text>
    );
  }

  render() {
    return (
      <ListView
        contentContainerStyle={styles.list}
        dataSource={this.state.dataSource}
        renderRow={this.handleRenderRow}
        >
        
      </ListView>
    );
  }
}

var styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});