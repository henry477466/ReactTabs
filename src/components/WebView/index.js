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
import {WebView} from 'react-native-webview';

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
          <WebView
            mixedContentMode="always" //允许安全链接页面中加载非安全链接的内容
            allowFileAccess={true} //运行访问本地文件
            javaScriptEnabled={true} //启用js
            allowUniversalAccessFromFileURLs={true}
            source={{uri: 'file:///android_asset/index.html'}}
          />
          {/* <WebView
            mixedContentMode="always" //允许安全链接页面中加载非安全链接的内容
            allowFileAccess={true} //运行访问本地文件
            javaScriptEnabled={true}
            allowUniversalAccessFromFileURLs={true}
            source={{uri: 'file:///android_asset/index.html'}}
          /> */}
          <View style={styles.footerAction}>
            <TouchableHighlight
              onPress={this.props.close}
              activeOpacity={1}
              underlayColor="#fcb602">
              <Button title="退出模块" onPress={this.props.close} />
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
