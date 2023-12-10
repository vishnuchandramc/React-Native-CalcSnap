import React, {useState} from 'react';
import {Appbar, useTheme, Menu} from 'react-native-paper';
import {Platform, useColorScheme} from 'react-native';

const Header = ({title, style, navigation}) => {
  const theme = useColorScheme();
  const {colors} = useTheme();
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const handleMenuSelect = option => {
    // Handle menu option selection here
    if (option === 'settings') {
      navigation.navigate('Settings');
    } else if (option === 'about') {
      navigation.navigate('About');
    }

    closeMenu();
  };

  return (
    <Appbar.Header
      style={style}
      mode={Platform.OS === 'ios' ? 'center-aligned' : 'small'}
      dark={theme}>
      <Appbar.Content
        title={title}
        titleStyle={{color: colors.text, fontFamily: 'InterTight-SemiBold'}}
      />
      <Menu
        visible={menuVisible}
        onDismiss={closeMenu}
        anchor={
          <Appbar.Action
            icon="dots-horizontal"
            onPress={openMenu}
            color={colors.activeButtonColor}
          />
        }
        contentStyle={{marginTop: 40, backgroundColor: colors.buttonColor}}
        style={{marginRight: 8}}>
        <Menu.Item
          title="Settings"
          titleStyle={{
            color: colors.activeButtonColor,
            fontFamily: 'InterTight-Medium',
          }}
          style={{backgroundColor: colors.buttonColor}}
          onPress={() => handleMenuSelect('settings')}
        />
        <Menu.Item
          title="About"
          titleStyle={{
            color: colors.activeButtonColor,
            fontFamily: 'InterTight-Medium',
          }}
          style={{backgroundColor: colors.buttonColor}}
          onPress={() => handleMenuSelect('about')}
        />
      </Menu>
    </Appbar.Header>
  );
};

export default Header;
