/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  ListView,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import Modal from 'react-native-modalbox';

var moment = require('moment');
var years = [moment().add(0,'years').format('YYYY'),
moment().add(1,'years').format('YYYY'),
moment().add(2,'years').format('YYYY'),
moment().add(3,'years').format('YYYY'),
moment().add(4,'years').format('YYYY'),
moment().add(5,'years').format('YYYY'),
moment().add(6,'years').format('YYYY'),
moment().add(7,'years').format('YYYY'),
moment().add(8,'years').format('YYYY'),
moment().add(9,'years').format('YYYY'),
moment().add(10,'years').format('YYYY')]

var months = ["01","02","03","04","05","06","07","08","09","10","11","12"]

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class home extends Component {
  constructor(){
    super();

    console.log(this.props);
    console.log(years);
    console.log(months);

    this.state = {
      selectedValueY: years[0],
      selectedValueM: moment().add(0,'month').format('MM'),
      dataSource: ds.cloneWithRows(years),
      dataSourceM: ds.cloneWithRows(months),
      cardNumber:"",
      cardName:"",
      cvc:""

    }
  }
  
  render() {
    return (
      <View style={styles.container}>
      <View style={{justifyContent:'center', flex:1, alignItems:'center',}}>
      <Image source={require('../img/credit-cards.png')} resizeMode="contain" style={{width:80, margin:10, height:80}} />
      <View style={{backgroundColor:'#555', margin:10, padding:10, width:350}}>
      
      <TextInput 
      placeholder="Name on card"
      icon="ios-person"
      borderType="underline"
      secureTextEntry={false}
      dark={false}
      onChangeText={(val) => this.setState({cardName: val}) }/>
      <TextInput 
      placeholder="Card Number"
      icon="ios-card"
      borderType="underline"
      secureTextEntry={false}
      dark={false}
      onChangeText={(val) => this.setState({cardNumber: val}) }/>
      <Text style={{color:'#fff', margin:10}}>Expiration Date</Text>
      <View style={{flexDirection:'row', justifyContent:'space-around'}}>
      <TouchableOpacity onPress ={() => this.openModal1()}><Text style={{color:'#fff', margin:10}}>{this.state.selectedValueY}</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => this.openModal2()}><Text style={{color:'#fff', margin:10}}>{this.state.selectedValueM}</Text></TouchableOpacity>

      </View>
      <TextInput 
      placeholder="CVC"
      icon="ios-lock"
      borderType="underline"
      maxLength={3}
      secureTextEntry={false}
      dark={false}
      onChangeText={(val) => this.setState({cvv: val}) }/>



      <TouchableOpacity onPress={() => this.submit()}><Text>Submit</Text></TouchableOpacity>
      <Modal style={{justifyContent: 'center',alignItems: 'center', padding:10,height: 260, backgroundColor: "#333"}} backdrop={false} ref={"modal1"} swipeToClose={this.state.swipeToClose} >
      {this.selectYear()}
      </Modal>
      <Modal style={{justifyContent: 'center',alignItems: 'center', padding:10,height: 260, backgroundColor: "#333"}} backdrop={false} ref={"modal2"} swipeToClose={this.state.swipeToClose} >
      {this.selectMonth()}
      </Modal>
      </View>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

