import React from "react";
import {Keyboard, Pressable, StyleSheet, View} from "react-native";

import {InputSection} from "./InputSection";
import {Slider} from "./Slider";
import {TouchablePlusMinus} from "./TouchablePlusMinus";
import {UltimateSliderProps} from "./types";

// Slider config
const RAIL_H = 16;
const THUMB_SIZE = 40;
const THUMB_OVERFLOW = 5;
// Button config
const LONGPRESS_TRIGGER_INTERVAL = 300;
const LONGPRESS_MIN_INTERVAL = 30;
const LONGPRESS_ITERATION_STEPS = 4;

export const UltimateSlider: React.FC<UltimateSliderProps> = ({
  // slider controller value - required
  value,
  setValue,
  // from useUltimateSliderController - required
  inputRef,
  focusInput,
  onPlusMinus,
  onChange,
  onEndEditing,
  // Slider state - required
  minValue,
  maxValue,
  step,
  // Button text - required
  PlusBtnText,
  MinusBtnText,
  // Slider wrapper - optional
  disableOnPress,
  // Slider config - optional
  railHeight = RAIL_H,
  thumbSize = THUMB_SIZE,
  thumbOverflow = THUMB_OVERFLOW,
  // Input field - optional
  textInputExtraProps,
  inputReplicaTextProps,
  renderText,
  // Button config - optional
  longpressTriggerInterval = LONGPRESS_TRIGGER_INTERVAL,
  longpressMinInterval = LONGPRESS_MIN_INTERVAL,
  longpressIterationSteps = LONGPRESS_ITERATION_STEPS,
  returnCustomTouchablePlus,
  returnCustomTouchableMinus,
  // Style object
  style,
}) => {
  return (
    <Pressable style={style?.wrapper} onPress={disableOnPress ? null : Keyboard.dismiss}>
      <View style={[defaultStyles.inputRow, style?.inputRow]}>
        <TouchablePlusMinus
          plusMinus={-1}
          onPlusMinus={onPlusMinus}
          returnCustomTouchable={returnCustomTouchableMinus}
          longpressTriggerInterval={longpressTriggerInterval}
          longpressMinInterval={longpressMinInterval}
          longpressIterationSteps={longpressIterationSteps}
          style={style || {}}
        >
          <MinusBtnText />
        </TouchablePlusMinus>
        <InputSection
          textInputExtraProps={textInputExtraProps}
          inputReplicaTextProps={inputReplicaTextProps}
          renderText={renderText}
          inputRef={inputRef}
          value={value}
          focusInput={focusInput}
          onChange={onChange}
          onEndEditing={onEndEditing}
          style={style || {}}
        />
        <TouchablePlusMinus
          plusMinus={1}
          onPlusMinus={onPlusMinus}
          returnCustomTouchable={returnCustomTouchablePlus}
          longpressTriggerInterval={longpressTriggerInterval}
          longpressMinInterval={longpressMinInterval}
          longpressIterationSteps={longpressIterationSteps}
          style={style || {}}
        >
          <PlusBtnText />
        </TouchablePlusMinus>
      </View>
      <Slider
        minValue={minValue}
        maxValue={maxValue}
        step={step}
        value={value}
        setValue={setValue}
        railHeight={railHeight}
        thumbSize={thumbSize}
        thumbOverflow={thumbOverflow}
          style={style || {}}
        />
    </Pressable>
  );
};

const defaultStyles = StyleSheet.create({
  inputRow: {
    flexDirection: "row",
  },
});
