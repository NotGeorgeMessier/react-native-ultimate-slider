import React from "react";
import {StyleSheet, Text, TextInput, View} from "react-native";

import {InputSectionProps} from "./types";

export const InputSection: React.FC<InputSectionProps> = ({
  textInputExtraProps,
  inputReplicaTextProps,
  renderText,
  inputRef,
  value,
  focusInput,
  onChange,
  onEndEditing,
  style,
}) => {
  return (
    <View>
      <TextInput
        ref={inputRef}
        keyboardType="numeric"
        style={[defaultStyles.hiddenInput, style.hiddenInput]}
        value={String(value)}
        onChange={onChange}
        onEndEditing={onEndEditing}
        {...textInputExtraProps}
      />
      <Text
        style={[defaultStyles.inputReplicator, style.inputReplicator]}
        onPress={focusInput}
        {...inputReplicaTextProps}
      >
        {renderText ? renderText(String(value)) : String(value)}
      </Text>
    </View>
  );
};

const defaultStyles = StyleSheet.create({
  // Hidden input that is used to update the value
  hiddenInput: {
    position: "absolute",
    left: 5,
    overflow: "hidden",
    opacity: 0,
    zIndex: -999,
    width: 1,
    height: 1,
  },
  // Replicates the input value to the visible text
  inputReplicator: {
    flex: 1,
  },
});
