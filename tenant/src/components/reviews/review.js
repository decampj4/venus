import React from 'react-native';
import OneStarImage from '../../assets/images/one_star_rating.png';
import TwoStarImage from '../../assets/images/two_star_rating.png';
import ThreeStarImage from '../../assets/images/three_star_rating.png';
import FourStarImage from '../../assets/images/four_star_rating.png';
import FiveStarImage from '../../assets/images/five_star_rating.png';
var {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} = React;

const IMAGES = {
  1: OneStarImage,
  2: TwoStarImage,
  3: ThreeStarImage,
  4: FourStarImage,
  5: FiveStarImage,
}

export default class Review extends React.Component {
  getRatingImageWidth() {
    return Dimensions.get('window').width - 20;
  }

  getRatingImageHeight() {
    return Dimensions.get('window').height * 0.035;
  }

  renderRatingView() {
    return (
      <View style={styles.ratingView}>
        <Text style={[styles.label, styles.ratingLabel]}>Rating</Text>
        <Image 
          style={[styles.ratingImage, {height: this.getRatingImageHeight(), width: this.getRatingImageWidth()}]}
          source={IMAGES[this.props.rating]}
          />
      </View>
    );
  }

  renderContentView() {
    return (
      <View style={styles.contentView}>
        <Text style={[styles.label, styles.contentLabel]}>Content</Text>
        <ScrollView
          style={styles.contentScrollView}>
          <Text>{this.props.content}</Text>
        </ScrollView>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderRatingView()}
        {this.renderContentView()}
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
    fontSize: 30,
  },
  ratingView: {
    flex: 1,
  },
  ratingLabel: {
    flex: 5,
  },
  ratingImage: {
    flex: 7,
    resizeMode: 'stretch',
    overflow: 'visible',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  contentView: {
    flex: 4
  },
  contentLabel: {
    flex: 1,
  },
  contentScrollView: {
    flex: 9,
  },
});