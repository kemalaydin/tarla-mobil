import React, { Component } from 'react';
import { Container, Text, Content, Input, Button, View } from 'native-base';
import { StyleSheet,ActivityIndicator } from 'react-native';
import axios from 'axios';
import { Provider,observer } from 'mobx-react';
import LoginStore from '../store/LoginStore';
import { RNCamera } from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';


@observer

export default class SearchProduct extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
          title: 'Ürün Kontrol',
          
        };
      };

      constructor(props) {
        super(props);
        this.camera = null;
        this.barcodeCodes = [];
    
        this.state = {
          product_code: null,
          scanCode: null,
          camera: {
            type: RNCamera.Constants.Type.back,
            flashMode: RNCamera.Constants.FlashMode.auto,
          }
        };
      }

      onBarCodeRead = async (scanResult) => {
          if (scanResult.data != null) {
            if (!this.barcodeCodes.includes(scanResult.data)) {
              this.barcodeCodes.push(scanResult.data);
              await this.setState({
                scanCode: scanResult.data,
                product_code: scanResult.data
              });
              this.getData();
            }
          }
      }
    

    state = {
        product_code: null,
        loading: false,
        camera: {
          type: RNCamera.Constants.Type.back,
          flashMode: RNCamera.Constants.FlashMode.auto,
        },
        scanCode: null,
        loading_qr: false,
    };
    
    config = {
        headers: {'Authorization': "bearer " + LoginStore.login_token}
    };

    setProductCode = (productCode) => {
        this.setState({
          product_code: productCode
        })
    }

    
    
    getData = async () => {
      this.setState({
        loading: true,
        loading_qr: true
      })
        axios.defaults.headers.common = {
            'Authorization': 'Bearer ' + LoginStore.login_token
        };
        await axios.post('http://108.61.188.11/public/api/product_search',this.state)
        .then(response => {
                LoginStore.product_detail = response.data;
                this.props.navigation.navigate('Details');
            }
        ).catch(function (error) {
            if (error.response.status === 404) {
              alert("Ürün Bulunamadı");
              
            }else if(error.response.status === 401){
              alert("Yetkiniz Bulunmuyor");
            }
          })
          setTimeout(function(){ this.barcodeCodes = [] }, 3000);
          this.setState({
            loading: false,
            scanCode: null,
            product_code: null,
          })
      }
  render() {
    const is_loading = "Ürün Aranıyor...";
    const search_button = "Ürün Ara";
    return (
          <Content style={styles.container}>
            <View
              style={{ flex:1 }}>
                <Input 
                  style={styles.inputStyle}
                  placeholder="Ürün Numarası"
                  onChangeText={productCode => this.setProductCode(productCode)}
                  value={this.state.scanCode}
                />
                <Button rounded block primary
                    onPress={ () => {this.getData()}}
                    style={styles.buttonStyle}
                >
                  <Text style={styles.buttonText}>{this.state.loading ? is_loading : search_button }</Text>
                </Button>
                { this.state.loading && <ActivityIndicator style={{ marginTop: 20 }} size="large"/> }
            </View>
            <View 
              style={{ 
                flex:1,
                textAlign: 'center',
                alignContent: 'center',
                justifyContent: 'center',
               }}>
              <RNCamera
              ref={ref => {
                this.camera = ref;
              }}
              style={{  
                flex: 1,
                width: '100%',
                height: 300,
                marginTop: 30,
              }}
              defaultTouchToFocus
              flashMode={this.state.camera.flashMode}
              mirrorImage={false}
              onBarCodeRead={this.onBarCodeRead.bind(this)}
              onFocusChanged={() => {}}
              onZoomChanged={() => {}}
              type={this.state.camera.type}
            >
              <BarcodeMask />
            </RNCamera>
            </View>
          </Content>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 10,
    flex: 1,
  },
  buttonStyle:{
    marginTop: 10,
    textAlign: 'center'
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  inputStyle: {
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 60
  }
});