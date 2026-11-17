import "./global.css";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "./src/screens/SplashScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import SignInScreen from "./src/screens/SignInScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import { ThemeProvider } from "./src/theme/ThemeProvider";
import ContactScreen from "./src/screens/ContactScreen";
import AvatarScreen from "./src/screens/AvatarScreen";
import { UserRegistrationProvider } from "./src/components/UserContext";
import { AlertNotificationRoot } from "react-native-alert-notification";
import SingleChatScreen from "./src/screens/SingleChatScreen";
import { WebSocketProvider } from "./src/socket/WebSocketProvider";
import NewChatScreen from "./src/screens/NewChatScreen";
import NewContactScreen from "./src/screens/NewContactScreen";
import { useWebSocketPing } from "./src/socket/UseWebSocketPing";
import { useContext, useEffect } from "react";
import { NativeModules } from "react-native";
import { AuthContext, AuthProvider } from "./src/components/AuthProvider";
import HomeTabs from "./src/screens/HomeTab";
import SettingScreen from "./src/screens/SettingsScreen";
import SignOutScreen from "./src/screens/SignOutScreen";
import StatusScreen from "./src/screens/StatusScreen";
import CallsScreen from "./src/screens/CallsScreen";


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

const CURRENT_SCREEN: keyof RootStack = "HomeScreen";
const FORCE_THEME: "light" | "dark" = "light";

const Stack = createNativeStackNavigator<RootStack>();

function ChatApp() {
  const auth = useContext(AuthContext);

  useEffect(() => {
    try {
      if (NativeModules.ExponentKernel) {
        NativeModules.ExponentKernel.setIsOnboardingFinishedAsync?.(true);
        NativeModules.ExponentKernel.requestToCloseDevMenu?.();
      }
      if (NativeModules.DevMenu) {
        NativeModules.DevMenu.closeMenu?.();
        NativeModules.DevMenu.setIsOnboardingFinished?.(true);
      }
      if (NativeModules.ExpoDevMenu) {
        NativeModules.ExpoDevMenu.closeMenu?.();
      }
    } catch (e) {}
  }, []);

  return (
    <WebSocketProvider userId={auth ? Number(auth.userId) : 0}>
      <ThemeProvider forceTheme={FORCE_THEME}>
        <UserRegistrationProvider>
          <NavigationContainer key={`${CURRENT_SCREEN}_${FORCE_THEME}`}>
            <Stack.Navigator
              key={`${CURRENT_SCREEN}_${FORCE_THEME}`}
              initialRouteName={CURRENT_SCREEN}
              screenOptions={{
                animation: "fade",
              }}
            >
              <Stack.Screen
                name="ContactScreen"
                component={ContactScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SignUpScreen"
                component={SignUpScreen}
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
              <Stack.Screen
                name="HomeScreen"
                component={HomeTabs}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SingleChatScreen"
                component={SingleChatScreen}
                options={{ headerShown: false }}
                initialParams={{
                  chatId: 101,
                  friendName: "Shenali Fernando",
                  lastSeenTime: "Today, 10:30 AM",
                  profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200",
                }}
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
              />
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
