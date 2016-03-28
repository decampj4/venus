import React from 'react-native';
import OneStarImage from '../../assets/images/one_star_rating.png';
import TwoStarImage from '../../assets/images/two_star_rating.png';
import ThreeStarImage from '../../assets/images/three_star_rating.png';
import FourStarImage from '../../assets/images/four_star_rating.png';
import FiveStarImage from '../../assets/images/five_star_rating.png';
import Button from '../common/button';
import API from '../../lib/api/v1/api';
var {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  TouchableWithoutFeedback,
} = React;

const IMAGES = {
  1: OneStarImage,
  2: TwoStarImage,
  3: ThreeStarImage,
  4: FourStarImage,
  5: FiveStarImage,
}

export default class Review extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: 3,
      content: '',
      errors: '',
    };
  }

  containerTouched(event) {
    for(let ref in this.refs) {
      this.refs[ref].blur();
    }
    return false;
  }

  handleAddReviewButtonPress() {
    if (!this.state.content) {
      this.setState({errors: 'Content must be added to a review'});
      return;
    }

    API.createReview({
      rating: this.state.rating,
      content: this.state.content,
      property_id: this.props.propertyId,
    })
      .then((review) => {
        this.props.navigator.replace({name: 'review', props: review})
      })
      .catch((error) => {
        this.setState({errors: `Submission error - ${error}`});
      });
  }

  handleImagePress(evt) {
    // x is the location of the image press event. Subtract 10 to account for the left margin on the image
    let x = evt.nativeEvent.locationX - 10;
    let rating = Math.ceil(x / this.getRatingImageWidth() * 5);
    this.setState({rating});
  }

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
        <TouchableWithoutFeedback onPress={this.handleImagePress.bind(this)}>
          <Image 
            style={[styles.ratingImage, {height: this.getRatingImageHeight(), width: this.getRatingImageWidth()}]}
            source={IMAGES[this.state.rating]}
            />
        </TouchableWithoutFeedback>
      </View>
    );
  }

  renderContentView() {
    return (
      <View 
        style={styles.contentView}
        onStartShouldSetResponder={this.containerTouched.bind(this)}
        >
        <Text style={[styles.label, styles.contentLabel]}>Content</Text>
        <TextInput
          style={styles.input}
          value={this.state.content}
          onChangeText={(text) => {this.setState({content: text, errors: ''})}}
          ref='contentTextInput'
          />
      </View>
    );
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
      <View style={styles.container}>
        {this.renderErrors()}
        {this.renderRatingView()}
        {this.renderContentView()}
        <View style={styles.submitButtonView} >
          <Button style={styles.submitButton} text={'Add Review'} handleButtonPress={this.handleAddReviewButtonPress.bind(this)} />
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
    fontSize: 30,
  },
  errorView : {
    flex: 1,
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
    flex: 1
  },
  contentLabel: {
    flex: 1,
  },
  contentScrollView: {
    flex: 9,
  },
  submitButtonView: {
    flex: 3,
  },
  submitButton: {
    backgroundColor: '#C7A4B9',
    marginLeft: 10,
    marginRight: 10,
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
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});