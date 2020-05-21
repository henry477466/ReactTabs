import React, { Component } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native';

export default class index extends Component {
  render() {
    return (
      <View style={styles.safeAreaView}>
        <View style={styles.bg1} />
        <View style={styles.bg2}>
          <View style={styles.bg3}>
            <Image source={require('./img/bg.png')} style={styles.bg} />
            <Text style={styles.label}>点击屏幕，重新加载</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  bg1: {
    backgroundColor: '#eee',
    width: '100%',
    height: '30%'
  },
  bg2: {
    backgroundColor: '#fff',
    width: '100%',
    height: '70%',
    position: 'relative'
  },
  bg3: {
    position: 'absolute',
    backgroundColor: '#fff',
    width: '200%',
    height: '200%',
    borderRadius: 1000,
    alignItems: 'center',
    top: -50,
    left: '-50%',
    paddingTop: 200
  },
  bg: {
    width: 100,
    height: 100
  },
  label: {
    color: '#bfbfbf',
    marginTop: 20,
    fontSize: 12
  }
});