import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Forms from "./src/screen/Forms";

const Stack = createStackNavigator();

export default function AppInner() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <>
          <Stack.Screen name="Forms" component={Forms} />
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
