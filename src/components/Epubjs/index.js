import React, {Component} from 'react';
import {
  StyleSheet,
  StatusBar,
  Animated,
  PermissionsAndroid,
  Modal,
  View,
  Text,
  Button,
  TouchableHighlight,
} from 'react-native';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        statusBarTranslucent={true}
        visible={true}>
        <View style={styles.container}>
          
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  preview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rectangleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rectangle: {
    height: 200,
    width: 200,
    borderWidth: 2,
    borderColor: '#fcb602',
    backgroundColor: 'transparent',
    borderRadius: 0,
  },
  rectangleText: {
    flex: 0,
    color: '#fff',
    marginTop: 10,
  },
  errorText: {
    flex: 0,
    color: '#ff0000',
    marginTop: 10,
  },
  errParent: {
    height: 150,
  },
  border: {
    flex: 0,
    width: 196,
    height: 1,
    backgroundColor: '#f63',
  },
  touchText: {
    color: '#fff',
    padding: 15,
  },
});
