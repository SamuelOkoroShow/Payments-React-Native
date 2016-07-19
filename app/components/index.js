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
  Dimensions,
  View
} from 'react-native';

var full_width = Dimensions.get('window').width; //full width
import Modal from 'react-native-modalbox';
import Icon from 'react-native-vector-icons/Ionicons';

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
  submit(){
  var url = "YOUR URL HERE";

  var myInit = {
    method:'POST', 
    headers: { 
      'cache-control': 'no-cache',
      'content-type': 'application/json',
      authorization: "YOUR AUTH TOKEN HERE"},
      body: JSON.stringify({ 
            credits: '2.5',
            save_payment_details: true,
            credit_card: 
            { number: this.state.cardNumber,
            cvv: this.state.cvv,
            expiration_year: this.state.selectedValueY,
            expiration_month: this.state.selectedValueM } }),
      json: true }

    

    fetch(url,myInit).then((res) => res.json()).then((res)=>
     console.log(res));
   }

   row(res){
    return(
      <TouchableOpacity style={{padding:10, margin:5}} onPress={() =>this.selectThisY(res)}><Text style={{color:'#fff'}}>{res}</Text></TouchableOpacity>
      )
  }
  rowM(res){
    return(
      <TouchableOpacity style={{padding:10, margin:5}} onPress={() =>this.selectThisM(res)}><Text style={{color:'#fff'}}>{res}</Text></TouchableOpacity>
      )
  }
  selectThisY(x){
    this.setState({
      selectedValueY: x
    });
    this.closeModal1();
  }

  selectThisM(x){
    this.setState({
      selectedValueM: x
    });
    this.closeModal2();
  }
  selectYear(){
    return(
      <View style={{flex:1}}>
      <ListView 
      dataSource={this.state.dataSource}
      renderRow={(rowData) => this.row(rowData)}
      />
      </View>
      )
  }
  selectMonth(){
    return(
      <View style={{flex:1}}>
      <ListView 
      dataSource={this.state.dataSourceM}
      renderRow={(rowData) => this.rowM(rowData)}
      />
      </View>
      )
  }

  openModal1() {
    this.refs.modal1.open()
  }
  closeModal1() {

    this.refs.modal1.close()
  }
  openModal2() {
    this.refs.modal2.open()
  }
  closeModal2() {

    this.refs.modal2.close()
  }
  render() {
    return (
      <View style={styles.container}>
      <View style={{justifyContent:'center', flex:1, alignItems:'center',}}>
      <Image source={require('../img/credit-cards.png')} resizeMode="contain" style={{width:80, margin:10, height:80}} />
      <View style={{backgroundColor:'#555', margin:10, padding:10, width:350}}>
      <View style={{flexDirection:'row'}}>
      <Icon name ="ios-person" color ="#fff" size={25} style={{alignSelf:'center'}}/>
      <TextInput 
      placeholder="Name on card"
      style={{flex:1, color:'#fff', padding:10, fontSize:14}}
      placeholderTextColor = "#fff"
      borderType="underline"
      secureTextEntry={false}
      dark={false}
      onChangeText={(val) => this.setState({cardName: val}) }/>
      </View>
      <View style={{flexDirection:'row',}}>
      <Icon name ="ios-card" color ="#fff" size={25} style={{alignSelf:'center'}}/>
      <TextInput 
      style={{color:'#fff', flex:1}}
      placeholder="Card Number"
      placeholderTextColor = "#fff"
      style={{flex:1, color:'#fff', padding:10, fontSize:14}}
      onChangeText={(val) => this.setState({cardNumber: val}) }/>
      </View>
      <Text style={{color:'#fff', margin:10}}>Expiration Date</Text>
      <View style={{flexDirection:'row', justifyContent:'space-around'}}>
      <TouchableOpacity onPress ={() => this.openModal1()}><Text style={{color:'#fff', margin:10}}>{this.state.selectedValueY}</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => this.openModal2()}><Text style={{color:'#fff', margin:10}}>{this.state.selectedValueM}</Text></TouchableOpacity>

      </View>
      <View style={{flexDirection:'row'}}>
      <Icon name ="ios-lock" color ="#fff" size={25} style={{alignSelf:'center'}}/>
<TextInput 
      placeholderTextColor = "#fff"
      maxLength = {3}
      placeholder = "cvv"
      style={{color:'#fff', width:80, color:'#fff', padding:10, fontSize:14}}
      onChangeText={(val) => this.setState({cvv: val}) }/>
      </View>

      <TouchableOpacity onPress={() => this.submit()} style={{backgroundColor:"#f3f3f3", padding:10, margin:10, alignItems:'center'}}><Text>Submit</Text></TouchableOpacity>
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

