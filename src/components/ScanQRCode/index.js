import React, {Component} from 'react';
import {RNCamera} from 'react-native-camera';
import {
  StyleSheet,
  StatusBar,
  Animated,
  PermissionsAndroid,
  Modal,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';

export default class ScanQRCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moveAnim: new Animated.Value(4),
      errUrl: false,
    };
  }
  componentDidMount() {
    StatusBar.setBarStyle('light-content');
    this.startAnimation();
  }
  componentWillUnmount() {
    StatusBar.setBarStyle('dark-content');
  }
  /**
   * 进入模块前需要先执行此方法
   */
  async requestCameraPermission() {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('获得权限');
    } else {
      console.log('未活动的权限');
    }
  }
  /**
   * 识别到二维码
   */
  onBarCodeRead = result => {
    const {data} = result;
    //扫码后的操作
    if (!data || data.indexOf('bookid') == -1) {
      this.setState({
        errUrl: true,
      });
    } else {
      this.setState({
        errUrl: false,
      });
    }
  };
  /**
   * 扫描框动画
   */
  startAnimation = () => {
    this.state.moveAnim.setValue(4);
    Animated.sequence([
      Animated.timing(this.state.moveAnim, {
        toValue: 200,
        duration: 1500,
        useNativeDriver: true,
        isInteraction: false,
      }),
      Animated.timing(this.state.moveAnim, {
        toValue: 4,
        duration: 1500,
        useNativeDriver: true,
        isInteraction: false,
      }),
    ]).start(() => this.startAnimation());
  };
  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        statusBarTranslucent={true}
        visible={true}>
        <View style={styles.container}>
          <RNCamera
            captureAudio={false}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            onBarCodeRead={this.onBarCodeRead}>
            <View style={styles.rectangleContainer}>
              <Animated.View
                style={[
                  styles.border,
                  {transform: [{translateY: this.state.moveAnim}]},
                ]}
              />
              <View style={styles.rectangle} />
              <Text style={styles.rectangleText}>
                将二维码放入框内，即可自动扫描
              </Text>
              <View style={styles.errParent}>
                {this.state.errUrl ? (
                  <Text style={styles.errorText}>无效二维码</Text>
                ) : null}
              </View>
              <View style={styles.footerAction}>
                <TouchableHighlight
                  onPress={this.props.close}
                  activeOpacity={1}
                  underlayColor="#fcb602">
                  <Text style={styles.touchText}>退出扫码</Text>
                </TouchableHighlight>
              </View>
            </View>
          </RNCamera>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
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
  footerAction: {
    color: '#fff',
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
