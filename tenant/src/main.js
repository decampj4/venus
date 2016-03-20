'use strict';
import React from 'react-native';
import ReviewsList from './components/reviews/reviews_list';
var {
  StyleSheet,
  Navigator,
} = React;

const ROUTES = {
  reviewsList: ReviewsList
}

export default class Main extends React.Component {
  handleRenderScene(route, navigator) {
    let Component = ROUTES[route.name];
    return <Component route={route} navigator={navigator}/>
  }

  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{name: 'reviewsList'}}
        renderScene={this.handleRenderScene}
        configureScene={() => { return Navigator.SceneConfigs.FloatFromRight; }}
        >
      </Navigator>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

