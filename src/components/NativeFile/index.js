import React, {Component} from 'react';
import RNFS from 'react-native-fs';

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
  Image,
  ToastAndroid,
} from 'react-native';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  getPath = () => {
    // var xhr = new XMLHttpRequest();
    // xhr.onreadystatechange = function(){
    //   console.log('onreadystatechange', this.readyState, XMLHttpRequest.DONE)
    // };
    // xhr.onerror = function(e){
    //   console.log('onerror', e)
    // };
    // let url = `${RNFS.DocumentDirectoryPath}/epub/1.jpg`;
    // // let url = 'http://www.tuibook.com/szyun/books/caitianxu/1.epub';
    // xhr.open("GET", url, true);
    // xhr.responseType = "arraybuffer";
    // xhr.send();
    // console.log(`${RNFS.DocumentDirectoryPath}`)
    // console.log(`${RNFS.MainBundlePath}`)
    // console.log(`${RNFS.CachesDirectoryPath}`)
    // console.log(`${RNFS.TemporaryDirectoryPath}`)
    // console.log(`${RNFS.ExternalDirectoryPath}`)
    // console.log(`${RNFS.ExternalStorageDirectoryPath}`)
    //判断文件 或者目录 是否存在
    // RNFS.exists(`${RNFS.DocumentDirectoryPath}/epub/1.jpg`).then(res => {
    //   console.log('文件是否存在：', res);
    // });
    // //判断文件 或者目录 是否存在
    // RNFS.exists(`${RNFS.DocumentDirectoryPath}/epub`).then(bool => {
    //   console.log('文件夹是否存在：', bool);
    //   if (!bool) {
    //     //创建文件夹
    //     RNFS.mkdir(`${RNFS.DocumentDirectoryPath}/epub`).then(cc => {
    //       console.log('创建结果：', cc);
    //     });
    //   }
    // });
    //获取目录下的文件列表
    // RNFS.readDir(`${RNFS.DocumentDirectoryPath}/epub`).then(res => {
    //   res.forEach(item => {
    //     console.log('文件：', item.name);
    //   });
    // });
  };
  downFile = () => {
    const url = 'http://www.tuibook.com/szyun/books/caitianxu/1.epub';
    // const url = 'https://img-play.daidaidj.com/img/359dee657879e16bad191bf48b5f4ed7.jpg';
    const downloadDest = `${RNFS.DocumentDirectoryPath}/epub/123.epub`;
    const background = true;
    const progressDivider = 1;
    const begin = () => {
      this.setState({
        text: 'Download has begun',
      });
    };
    const progress = data => {
      console.log(
        (data.bytesWritten / 1024 / 1024).toFixed(1) +
          'MB/' +
          (data.contentLength / 1024 / 1024).toFixed(1) +
          'MB',
      );
      const percentage = ((100 * data.bytesWritten) / data.contentLength) | 0;
      const text = `Progress ${percentage}%`;
      this.setState({
        text: text,
      });
    };
    const ret = RNFS.downloadFile({
      fromUrl: url,
      toFile: downloadDest,
      begin,
      progress,
      background,
      progressDivider,
    });
    ret.promise
      .then(res => {
        console.log('结果1', res);
        if (res.bytesWritten > 0) {
          this.setState({output: JSON.stringify(res)});
          this.setState({imagePath: 'file://' + downloadDest});
        } else {
          console.log('上传失败');
        }
      })
      .catch(err => {
        console.log('上传失败', err);
      });
  };
  render() {
    let cc = `${RNFS.DocumentDirectoryPath}/epub/1.jpg`;
    console.log(cc)
    return (
      <Modal
        animationType="slide"
        transparent={false}
        statusBarTranslucent={true}
        visible={true}>
        <View style={styles.container}>
          <View style={styles.covertin}>
            <View>
              <Text>{this.state.text}</Text>
            </View>
            <View>
              <Text>{this.state.output}</Text>
            </View>
            <View>
              <Text>{this.state.imagePath}</Text>
            </View>
            <View>
              <Button title="获取路径" onPress={this.getPath} />
            </View>
            <View style={{marginTop: 20}}>
              <Button title="下载文件" onPress={this.downFile} />
            </View>
          </View>
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
  },
  covertin: {
    padding: 100,
  },
  footerAction: {
    paddingTop: 100,
  },
});
