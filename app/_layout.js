import { Stack } from 'expo-router'
import { useCallback } from 'react';
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'

SplashScreen.preventAutoHideAsync();
// Makes the native splash screen
// (configured in app.json) remain visible until hideAsync is called.

const Layout = () => {
  const [fontsLoaded] = useFonts({
    DMBold: require('../assets/fonts/DMSans-Bold.ttf'),
    DMMedium: require('../assets/fonts/DMSans-Medium.ttf'),
    DMRegular: require('../assets/fonts/DMSans-Regular.ttf')
  })
  
  const onLayoutRootView = useCallback(async () => {
    if(fontsLoaded) {
      await SplashScreen.hideAsync() // only show the homepage when fonts have loaded
    }
  }, [fontsLoaded])

  if (!fontsLoaded) return null

  return <Stack onLayout={onLayoutRootView}/>;
}

export default Layout