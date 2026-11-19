import "./global.css";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useContext } from "react";
import { AlertNotificationRoot } from "react-native-alert-notification";
import SplashScreen from "./src/screens/SplashScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import SignInScreen from "./src/screens/SignInScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import ContactScreen from "./src/screens/ContactScreen";
import AvatarScreen from "./src/screens/AvatarScreen";
import SingleChatScreen from "./src/screens/SingleChatScreen";
import NewChatScreen from "./src/screens/NewChatScreen";
import NewContactScreen from "./src/screens/NewContactScreen";
import HomeTabs from "./src/screens/HomeTab";
import SettingScreen from "./src/screens/SettingsScreen";
import SignOutScreen from "./src/screens/SignOutScreen";
import StatusScreen from "./src/screens/StatusScreen";
import CallsScreen from "./src/screens/CallsScreen";
import { ThemeProvider } from "./src/theme/ThemeProvider";
import { UserRegistrationProvider } from "./src/components/UserContext";
import { WebSocketProvider } from "./src/socket/WebSocketProvider";
import { AuthContext, AuthProvider } from "./src/components/AuthProvider";

export type RootStack = {
  SplashScreen: undefined;
  SignUpScreen: undefined;
  ContactScreen: undefined;
  AvatarScreen: undefined;
  SignInScreen: undefined;
  HomeScreen: undefined;
  ProfileScreen: undefined;
  SettingScreen: undefined;
  SingleChatScreen: {
    chatId: number;
    friendName: string;
    lastSeenTime: string;
    profileImage: string;
  };
  NewChatScreen: undefined;
  NewContactScreen: undefined;
  SignOutScreen: undefined;
  StatusScreen: undefined;
  CallsScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStack>();

function ChatApp() {
  const auth = useContext(AuthContext);

  return (
    <WebSocketProvider userId={auth ? Number(auth.userId) : 0}>
      <ThemeProvider>
        <UserRegistrationProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="SplashScreen"
              screenOptions={{
                animation: "fade",
              }}
            >
              {auth?.isLoading ? (
                <Stack.Screen
                  name="SplashScreen"
                  component={SplashScreen}
                  options={{ headerShown: false }}
                />
              ) : auth?.userId === null ? (
                <Stack.Group>
                  <Stack.Screen
                    name="SignUpScreen"
                    component={SignUpScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="ContactScreen"
                    component={ContactScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="AvatarScreen"
                    component={AvatarScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="SignInScreen"
                    component={SignInScreen}
                    options={{ headerShown: false }}
                  />
                </Stack.Group>
              ) : (
                <Stack.Group>
                  <Stack.Screen
                    name="HomeScreen"
                    component={HomeTabs}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="SingleChatScreen"
                    component={SingleChatScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="ProfileScreen"
                    component={ProfileScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="SettingScreen"
                    component={SettingScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="NewChatScreen"
                    component={NewChatScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="NewContactScreen"
                    component={NewContactScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="StatusScreen"
                    component={StatusScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="CallsScreen"
                    component={CallsScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="SignOutScreen"
                    component={SignOutScreen}
                    options={{ headerShown: false }}
                  />
                </Stack.Group>
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </UserRegistrationProvider>
      </ThemeProvider>
    </WebSocketProvider>
  );
}

export default function App() {
  return (
    <AlertNotificationRoot>
      <AuthProvider>
        <ChatApp />
      </AuthProvider>
    </AlertNotificationRoot>
  );
}
