import { Tabs } from "expo-router"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import "../../global.css"
const TabLayout = () => {
  return (
    <Tabs screenOptions={{
      headerStyle: { backgroundColor: '#ede7ff' ,borderRadius:30 },
      headerShadowVisible: false,
      headerTitleAlign:'center',
      tabBarStyle: {
        backgroundColor: '#f5f5f5',
        borderTopWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
      },
      tabBarActiveTintColor: "#6200ee",
      tabBarInactiveTintColor: "#666666",

    }}>

        <Tabs.Screen name="index"
        options={{
          title:'Status',
          tabBarIcon: ({ color, focused,size }) => (
            <MaterialCommunityIcons 
            name="progress-check"
            size={size}
            color={color}
            />
          ),
        }}
        />
        <Tabs.Screen name="history"
         options={{
          title:'History',
          tabBarIcon: ({ color, focused,size }) => (
            <MaterialCommunityIcons 
            name="history"
            size={size}
            color={color}
            />
          ),
        }}
        />
        {/* <Tabs.Screen name="settings"
        options={{
          title:'settings',
          tabBarIcon: ({ color, focused,size }) => (
            <MaterialCommunityIcons 
            name="cog"
            size={size}
            color={color}
            />
          ),
        }}
        /> */}
    </Tabs>
  )
}

export default TabLayout