import React, {Component} from 'react';
import ImagePicker from 'react-native-image-crop-picker';

import {
  StyleSheet,
  StatusBar,
  Animated,
  PermissionsAndroid,
  Modal,
  View,
  Text,
  TouchableHighlight,
  Button,
  ToastAndroid,
} from 'react-native';

export default class Index extends Component {
  openPicker = () => {
    ImagePicker.openPicker({
      width: 200,
      height: 200,
      cropping: true,
    })
      .then(image => {
        console.log(image.path);
      })
      .catch(err => {
        if (err.code == 'E_PERMISSION_MISSING') {
          ToastAndroid.show('未获得权限!', ToastAndroid.SHORT);
        }
      });
  };
  // prettier-ignore
  openCamera = () => {
    ImagePicker.openCamera({
      width: 200,
      height: 200,
      cropping: true,
    }).then(image => {
      console.log(image.path);
    }).catch(err => {
      if (err.code == 'E_PERMISSION_MISSING') {
        ToastAndroid.show('未获得权限!', ToastAndroid.SHORT);
      }
    });
  };
  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        statusBarTranslucent={true}
        visible={true}>
        <View style={styles.container}>
          <View style={styles.covertin}>
            <View>
              <Button title="使用相册" onPress={this.openPicker} />
            </View>
            <View style={{marginTop: 20}}>
              <Button title="使用相机" onPress={this.openCamera} />
            </View>
          </View>
          <View style={styles.footerAction}>
            <TouchableHighlight
              onPress={this.props.close}
              activeOpacity={1}
              underlayColor="#fcb602">
              <Button title="退出照片" onPress={this.props.close} />
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  covertin: {
    padding: 100,
  },
  footerAction: {
    paddingTop: 100,
  },
});
