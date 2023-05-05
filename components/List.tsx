import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import { CustomText } from './Text';
import colors from '../constants/colors';

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: colors.white,
  },
  titleText: {
    fontWeight: 'bold',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
  },
});

type ListItemProps = {
  title: string;
  subtitle: string;
  onPress: () => void;
};

export const ListItem = ({
  title,
  subtitle,
  onPress = () => null,
}: ListItemProps) => {
  const rowStyles = [styles.row];

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={rowStyles}>
        <CustomText style={[styles.titleText]}>{title}</CustomText>
        <CustomText>{subtitle}</CustomText>
      </View>
    </TouchableOpacity>
  );
};

export const ListSeparator = () => <View style={styles.separator} />;
