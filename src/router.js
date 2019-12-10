import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './screens/LoginScreen';
import SearchProduct from './screens/SearchProduct';
import Details from './screens/Details';

const mainStack = createStackNavigator({
    Login: {
        screen: LoginScreen
    },
    Search: {
        screen: SearchProduct
    },
    Details: {
        screen: Details
    }
});

export default createAppContainer(mainStack);