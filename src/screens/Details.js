import React, { Component } from 'react';
import { Container, Content, Card, CardItem, Text, Body, Badge, ListItem, List } from "native-base";
import { StyleSheet, View, TouchableOpacity, Button  } from 'react-native';
import { Provider,observer } from 'mobx-react';
import LoginStore from '../store/LoginStore';

@observer

export default class Details extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: LoginStore.product_detail.product_code,
    };
  };

  constructor(props) {
    super(props);
    this.setState({
      works: LoginStore.product_detail.work
    })
  }

  state = {
    works: LoginStore.product_detail.work,
  }
  

  getWork = (item) => {
    return (
      <TouchableOpacity>
        <View style={styles.contactDetail}>
          <Text style={styles.contactName}>{item.work_type}</Text>
          <Text>{item["work_type"]}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  render() {
    return (
      <Container>
        <Content padder>
          <Card>
            <CardItem header bordered>
              <Text>Temel Bilgiler</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                
                <Text style={styles.contentText}>
                  <Text style={styles.titleText}>Ürün Adı : </Text><Text> {LoginStore.product_detail.product_type.product_name} </Text>
                </Text>
                <Text style={styles.contentText}>
                  <Text style={styles.titleText}>Ürün Kodu : </Text><Text> {LoginStore.product_detail.product_code} </Text>
                </Text>
                <Text style={styles.contentText}>
                  <Text style={styles.titleText}>Ürün Türü : </Text><Text> {LoginStore.product_detail.product_type.product_type} </Text>
                </Text>
              </Body>
            </CardItem>
          </Card>


          <Card>
            <CardItem header bordered>
              <Text>Ekim Bilgileri</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text style={styles.contentText}>
                  <Text style={styles.titleText}>Toplanan Tarla : </Text><Text> {LoginStore.product_detail.plantation.garden_name} </Text>
                </Text>
                <Text style={styles.contentText}>
                  <Text style={styles.titleText}>Tohum Üreticisi : </Text><Text onPress={ () => { alert(LoginStore.product_detail.seed.created_at+" Tarihinde Satın Alındı") }}> {LoginStore.product_detail.seed.supplier.merchant_name} </Text>
                </Text>
                <Text style={styles.contentText}>
                  <Text style={styles.titleText}>Gübre Üreticisi : </Text><Text onPress={ () => { alert(LoginStore.product_detail.fertilizer.created_at+" Tarihinde Satın Alındı") }}> {LoginStore.product_detail.fertilizer.supplier.merchant_name}</Text>
                </Text>
              </Body>
            </CardItem>
          </Card>


          <Card>
            <CardItem header bordered>
              <Text>Yapılan İşlemler</Text>
            </CardItem>
            <CardItem bordered>
              <Body style={{  flex: 1 }}>
              <List>
              { LoginStore.product_detail.work.map((item,key)=>(
                  
                    <ListItem style={[styles.list]} key={key} onPress={ () => alert(item.created_at+" Tarihinde " +item.user.name +" "+item.user.surname+" Tarafından Yapıldı")}>
                      <Text>
                        <Text style={styles.type}>{ item.work_type }</Text> -  { item.details } ( {item.work_code} )
                      </Text>
                    </ListItem>
                  
                ))}
                </List>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    contentText: {
      marginBottom: 10
    },
    titleText: {
      fontWeight: 'bold'
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
    contactCompany: {
      fontSize: 10,
    }, 
    type:{
      fontWeight: 'bold',
    },
    list:{
      marginBottom: 10,
      paddingLeft: 10,
      marginLeft: 2,
    }
});
