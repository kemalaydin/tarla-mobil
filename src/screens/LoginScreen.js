import React, { Component } from 'react';
import { Container, Text, Content, Form, Item, Input, Button } from 'native-base';
import { StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { Provider,observer } from 'mobx-react';
import LoginStore from '../store/LoginStore';

@observer

export default class LoginScreen extends Component {
	static navigationOptions = {
		title: 'Giriş Yap',
	};

  constructor(props) {
	super(props);
	if(LoginStore.login_token != null){
		this.props.navigation.navigate('Search');
	}
  }

  state = {
	  email: null,
	  password: null,
	  loading: false
  }

  login = async () => {
	this.setState({
		loading: true
	})
	await axios.post('http://108.61.188.11/public/api/login', this.state)
	.then(response => {
			console.log(response.data);
			LoginStore.login_token = response.data.token;
			this.props.navigation.navigate('Search');
		}
	).catch(function (error) {
		console.log(error.response);
    	if (error.response.status === 401) {
			alert("Email adresiniz veya Şifreniz Yanlış");
		}
	  })
	  this.setState({
		loading: false
	  })
  }

  emailChange = (email) => {
	  this.setState({
		  email
	  })
  }

  passChange = (password) => {
	this.setState({
		password
	})
  }

  componentDidMount() {
  }

  render() {
	const is_loading = "Bekleyiniz...";
	const login_button = "Giriş Yap";
    return (
        <Container style={styles.container}>
				<Content>
					<Form>
						<Item inlineLabel>
							<Input 
								placeholder="Email Adresiniz" 
								onChangeText={email => this.emailChange(email)}
							/>
						</Item>
						<Item inlineLabel last>
							<Input 
								placeholder="Şifreniz" 
								secureTextEntry={true}
								onChangeText={password => this.passChange(password)}
							/>
						</Item>
						<Button style={{ marginTop: 10 }} block dark onPress={() => {this.login()}}>
							<Text>{this.state.loading ? is_loading : login_button }</Text>
						</Button>
					</Form>
					{ this.state.loading && <ActivityIndicator style={{ marginTop: 20 }} size="large"/> }
				</Content>
        </Container>
    );
  }
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
	}
});
