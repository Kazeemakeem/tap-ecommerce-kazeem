import React from 'react';
import { StyleSheet, View, Alert, TouchableOpacity, Text } from 'react-native';
import colors from '../constants/colors';
import { CustomText } from '../components/Text';
import { Button } from '../components/Button';
import { TextInput } from '../components/Form';
import { useLogin } from '../util/auth';

// const StyledView = styled.View
// yarn add twrnc

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 10,
  },
});

export const TextDemo = () => (
  <View style={styles.container}>
    <CustomText type="header">This is a header</CustomText>
    <CustomText type="subheader">This is a subheader</CustomText>
    <CustomText>This is normal text</CustomText>
  </View>
);

export const FormDemo = () => {
  const { submit, errors, email, setEmail, password, setPassword } = useLogin();

  return (
    <View style={styles.container}>
      <TextInput
        label="Email Address"
        placeholder="Enter your email..."
        value={email}
        onChangeText={(text: string) => setEmail(text)}
        errorText={errors.email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        label="Password"
        placeholder="Enter your password..."
        value={password}
        onChangeText={(text: string) => setPassword(text)}
        secureTextEntry
        errorText={errors.password}
        autoCapitalize="none"
      />
      <Button onPress={submit}>Sign In</Button>
    </View>
  );
};

export const ButtonDemo = () => (
  <View style={styles.container}>
    <Button onPress={() => Alert.alert('you pressed the default button')}>
      Default Button
    </Button>
    <Button
      type="outline"
      onPress={() => Alert.alert('you pressed the outline button')}
    >
      Outline Button
    </Button>
  </View>
);

export const TailwindDemo = () => (
  <View>
    <TouchableOpacity onPress={() => Alert.alert('you pressed tailwind button')}>
      <Text className="text-red-400 font-extrabold text-xl">Tailwind Button</Text>
    </TouchableOpacity>
  </View>
);


