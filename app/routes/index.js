
import { createStackNavigator, createAppContainer } from 'react-navigation';
import LogInPage from '../pages/LogIn.page';
import SignUpPage from '../pages/SignUp.page';

const RouteStack = createStackNavigator({
  login: {
    screen: LogInPage
  },
  signup: {
    screen: SignUpPage
  }
});

const Routes = createAppContainer(RouteStack);
export default Routes;
