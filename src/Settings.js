import React, {useState} from 'react';
import {View, StyleSheet, Linking} from 'react-native';
import {Appbar, List, useTheme, Menu, Text} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {setDarkMode, setHapticValueState} from '../async-storage/setData';
import {setHapticState, setThemeState} from '../store/slice';
import Header from './components/AppBar';

const Settings = () => {
  const {isHapticEnabled, isDarkModeEnabled} = useSelector(
    state => state.calculator,
  );
  const dispatch = useDispatch();
  const [themeMenuVisible, setThemeMenuVisible] = useState(false);
  const [selectedMode, setSelectedMode] = useState(
    isDarkModeEnabled ? 'dark' : 'light',
  );
  const [hapticMenuVisible, setHapticMenuVisible] = useState(false);

  const handleDarkModeToggle = async mode => {
    const isDarkMode = mode === 'dark';
    console.log('IsDark---', isDarkMode);
    await setDarkMode(isDarkMode);
    dispatch(setThemeState(isDarkMode));
    setSelectedMode(mode);
    setThemeMenuVisible(false);
  };

  const handleHapticFeedbackToggle = async mode => {
    console.log('IsHaptic---', mode);
    await setHapticValueState(mode);
    dispatch(setHapticState(mode));
    setHapticMenuVisible(false);
  };

  const handleOpenGithub = async () => {
    try {
      const githubRepoUrl =
        'https://github.com/vishnuchandramc/react-native-calculator';

      await Linking.openURL(githubRepoUrl);
    } catch (error) {
      console.log('error---', error);
    }
  };

  const handleRateAppPress = () => {
    // Handle "Send Feedback" button press
  };

  // const handleSendFeedbackPress = async () => {
  //   try {
  //     const email = 'utilitynestdev@gmail.com';
  //     const subject = 'Feedback regarding CalcSnap';

  //     const gmailUrl = `googlegmail://co?to=${email}&subject=${subject}`;

  //     const supported = await Linking.canOpenURL(gmailUrl);
  //     if (supported) {
  //       Linking.openURL(gmailUrl);
  //     } else {
  //       console.log('Gmail app is not installed');
  //       // You can provide a fallback or open the email in a web browser
  //     }
  //   } catch (error) {
  //     console.log('errr- ', error);
  //   }
  // };

  const {colors} = useTheme();

  const openThemeMenu = () => setThemeMenuVisible(true);
  const closeThemeMenu = () => setThemeMenuVisible(false);
  const openHapticMenu = () => setHapticMenuVisible(true);
  const closeHapticMenu = () => setHapticMenuVisible(false);

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <List.Section>
        <List.Subheader
          style={[
            styles.text,
            {color: colors.activeButtonColor2, fontSize: 16},
          ]}>
          Appearance
        </List.Subheader>
        <List.Item
          title="Theme"
          titleStyle={[styles.text, {color: colors.text}]}
          onPress={openThemeMenu}
          right={() => (
            <View style={styles.anchor}>
              <Text style={[styles.text, {color: colors.activeButtonColor2}]}>
                {selectedMode === 'dark' ? 'Dark' : 'Light'}
              </Text>
              <Menu
                visible={themeMenuVisible}
                onDismiss={closeThemeMenu}
                contentStyle={{
                  marginTop: 40,
                  backgroundColor: colors.buttonColor,
                }}
                anchor={
                  <Appbar.Action icon="chevron-down" onPress={openThemeMenu} />
                }>
                <Menu.Item
                  onPress={() => handleDarkModeToggle('light')}
                  title="Light"
                  titleStyle={{
                    color: colors.activeButtonColor,
                    fontFamily: 'InterTight-Medium',
                  }}
                />
                <Menu.Item
                  onPress={() => handleDarkModeToggle('dark')}
                  title="Dark"
                  titleStyle={{
                    color: colors.activeButtonColor,
                    fontFamily: 'InterTight-Medium',
                  }}
                />
              </Menu>
            </View>
          )}
        />
      </List.Section>

      <List.Section>
        <List.Subheader
          style={[
            styles.text,
            {color: colors.activeButtonColor2, fontSize: 16},
          ]}>
          Behaviour
        </List.Subheader>
        <List.Item
          title="Vibration"
          titleStyle={[styles.text, {color: colors.text}]}
          onPress={openHapticMenu}
          right={() => (
            <View style={styles.anchor}>
              <Text style={[styles.text, {color: colors.activeButtonColor2}]}>
                {isHapticEnabled ? 'On' : 'Off'}
              </Text>
              <Menu
                visible={hapticMenuVisible}
                onDismiss={closeHapticMenu}
                contentStyle={{
                  marginTop: 40,
                  backgroundColor: colors.buttonColor,
                }}
                anchor={
                  <Appbar.Action icon="chevron-down" onPress={openHapticMenu} />
                }>
                <Menu.Item
                  onPress={() => handleHapticFeedbackToggle(true)}
                  title="On"
                  titleStyle={{
                    color: colors.activeButtonColor,
                    fontFamily: 'InterTight-Medium',
                  }}
                />
                <Menu.Item
                  onPress={() => handleHapticFeedbackToggle(false)}
                  title="Off"
                  titleStyle={{
                    color: colors.activeButtonColor,
                    fontFamily: 'InterTight-Medium',
                  }}
                />
              </Menu>
            </View>
          )}
        />
      </List.Section>

      <List.Section>
        <List.Subheader
          style={[
            styles.text,
            {color: colors.activeButtonColor2, fontSize: 16},
          ]}>
          About
        </List.Subheader>
        <List.Item
          title="Rate the app"
          descriptionStyle={{
            paddingVertical: 6,
            color: colors.activeButtonColor2,
          }}
          description="Love this app? Let us know in the Google Play Store how we can make it even better."
          titleStyle={[styles.text, {color: colors.text}]}
          onPress={handleRateAppPress}
        />
        <List.Item
          title="Github"
          description="Hello developers, Fork the project on Github."
          descriptionStyle={{
            paddingVertical: 6,
            color: colors.activeButtonColor2,
          }}
          titleStyle={[styles.text, {color: colors.text}]}
          onPress={handleOpenGithub}
        />
        <List.Item
          title="App Version 1.0.0"
          // description="1.0.0"
          titleStyle={[styles.text, {color: colors.text}]}
          onPress={handleOpenGithub}
        />
        {/* <List.Item
          title="Send Feedback"
          description="For any queries, Please let me know"
          titleStyle={[styles.text, {color: colors.text}]}
          onPress={handleSendFeedbackPress}
        /> */}
      </List.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontFamily: 'InterTight-Medium',
  },
  anchor: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Settings;
