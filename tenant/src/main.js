'use strict';
import React from 'react-native';
import ReviewsList from './components/reviews/reviews_list';
import Review from './components/reviews/review';
import AddReview from './components/reviews/add_review';
var {
  StyleSheet,
  Navigator,
  View,
  Text,
  TouchableHighlight,
} = React;

const ROUTES = {
  reviewsList: ReviewsList,
  review: Review,
  addReview: AddReview,
}

export default class Main extends React.Component {
  handleRenderScene(route, navigator) {
    let Component = ROUTES[route.name];
    return <Component route={route} navigator={navigator} {...route.props}/>
  }

  getNavigationBarRouteMapper() {
    return {
      LeftButton(route, navigator, index, navState) {
        if(index === 0) {
          return null;
        }

        return (
          <TouchableHighlight
            onPress={() => {navigator.pop()}}
            underlayColor='gray'
            >
            <Text style={[styles.navBarButton, {marginLeft: 5}]}>Back</Text>
          </TouchableHighlight>
        );
      },

      RightButton(route, navigator, index, navState) {
        if(!route.nextRoute || !route.nextRouteText) {
          return null;
        }
        return (
          <TouchableHighlight
            onPress={() => {
              navigator.push({name: route.nextRoute})
            }}
            underlayColor='gray'
            >
            <Text style={[styles.navBarButton, {marginRight: 5}]}>{route.nextRouteText}</Text>
          </TouchableHighlight>
        );
      },

      Title(route, navigator, index, navState) {
        return (
          <Text style={styles.title}>Tenant</Text>
        );
      },
    }
  }

  getNavigationBar() {
    let NavigationBar = Navigator.NavigationBar;
    return (
      <NavigationBar
        style={styles.navBar}
        routeMapper={this.getNavigationBarRouteMapper()}
        />
    );
  }

  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{name: 'reviewsList', nextRoute: 'addReview', nextRouteText: 'Add Review'}}
        renderScene={this.handleRenderScene}
        configureScene={() => { return Navigator.SceneConfigs.FloatFromRight; }}
        navigationBar={this.getNavigationBar()}
        >
      </Navigator>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#98CFE5',
  },
  navBar: {
    backgroundColor: 'white',
    borderBottomWidth: 2,
    borderBottomColor: '#C7A4B9',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    paddingTop: 7,
  },
  navBarButton: {
    fontSize: 18,
    paddingTop: 7,
    color: '#7AA7B9',
  }
});

