import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Appbar, Text, useTheme} from 'react-native-paper';

const AboutPage = () => {
  const {colors} = useTheme();

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={styles.content}>
        <Text
          variant="headlineSmall"
          style={[
            {
              fontFamily: 'InterTight-SemiBold',
              color: colors.text,
              paddingVertical: 10,
            },
          ]}>
          CalcSnap
        </Text>
        <Text
          style={[
            styles.text,
            styles.description,
            {color: colors.activeButtonColor},
          ]}>
          CalcSnap is a versatile and intuitive calculator application designed
          to simplify your everyday calculations. Whether you need to perform
          basic arithmetic or complex calculations, CalcSnap provides a
          convenient and user-friendly experience.
        </Text>

        <Text style={[styles.text, styles.description, {color: colors.text}]}>
          For Developers, CalcSnap is an open-source project hosted on GitHub.
          Feel free to explore the source code and contribute to its
          development.
        </Text>
        {/* <Text style={[styles.description, {color: colors.text}]}>
          Get in touch with us and stay updated:
        </Text> */}

        <Text
          style={[
            styles.text,
            styles.version,
            {color: colors.activeButtonColor},
          ]}>
          Version 1.0.0
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appBar: {
    backgroundColor: 'transparent',
    elevation: 0,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  text: {
    fontSize: 16,
    fontFamily: 'InterTight-Regular',
    marginBottom: 8,
  },
  description: {
    fontStyle: 'italic',
    marginBottom: 16,
  },
  version: {
    fontWeight: 'bold',
    paddingTop: 20,
  },
});

export default AboutPage;
