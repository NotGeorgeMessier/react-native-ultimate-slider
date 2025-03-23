import React, {useEffect} from "react";
import {Keyboard, StyleSheet} from "react-native";
import {Gesture, GestureDetector} from "react-native-gesture-handler";
import Animated, {
  clamp,
  Extrapolation,
  interpolate,
  runOnJS,
  runOnUI,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import {SliderProps} from "./types";
import {binarySearchStepWorklet, getWrapperWidthWorklet} from "./worklets";

const dismissKeyboard = () => {
  Keyboard.dismiss();
};

export const Slider: React.FC<SliderProps> = ({
  minValue,
  maxValue,
  step,
  value,
  setValue,
  railHeight,
  thumbSize,
  thumbOverflow,
  style,
}) => {
  const rViewRef = useAnimatedRef<Animated.View>();

  const totalSteps = useSharedValue<number>(0);
  const wrapperWidth = useSharedValue<number>(0);
  const offset = useSharedValue<number>(0);
  const translationX = useSharedValue<number>(0);
  const panInProcess = useSharedValue(false);
  const stepWidth = useDerivedValue<number>(() => wrapperWidth.value / totalSteps.value);
  const translateX = useDerivedValue<number>(() =>
    clamp(translationX.value + offset.value, 0, wrapperWidth.value),
  );
  const overflowShift = useDerivedValue<number>(() =>
    interpolate(
      translateX.value,
      [0, wrapperWidth.value],
      [-thumbOverflow, thumbOverflow],
      Extrapolation.CLAMP,
    ),
  );

  const pan = Gesture.Pan()
    .onBegin(() => {
      panInProcess.value = true;
      wrapperWidth.value = getWrapperWidthWorklet(rViewRef, thumbSize);
      runOnJS(dismissKeyboard)();
    })
    .onChange((event) => {
      const sign = event.translationX > 0 ? 1 : -1;
      let stepCount = 0;
      if (Math.abs(event.translationX) >= wrapperWidth.value) {
        stepCount = totalSteps.value;
      } else {
        stepCount = binarySearchStepWorklet(
          totalSteps.value,
          Math.abs(event.translationX),
          stepWidth.value,
        );
      }

      offset.value = stepCount * stepWidth.value * sign;
    })
    .onFinalize(() => {
      translationX.value = clamp(translationX.value + offset.value, 0, wrapperWidth.value);
      offset.value = 0;
      panInProcess.value = false;
    });

  useAnimatedReaction(
    () =>
      Math.round(
        interpolate(
          translateX.value,
          [0, wrapperWidth.value],
          [minValue, maxValue],
          Extrapolation.CLAMP,
        ),
      ),
    (currentValue) => {
      if (panInProcess.value) {
        runOnJS(setValue)(currentValue);
      }
    },
  );

  useEffect(() => {
    runOnUI(() => {
      totalSteps.value = (maxValue - minValue) / step;
    })();
  }, [step]);

  useEffect(() => {
    runOnUI(() => {
      wrapperWidth.value = getWrapperWidthWorklet(rViewRef, thumbSize);
      if (!panInProcess.value) {
        translationX.value = interpolate(
          value,
          [minValue, maxValue],
          [0, wrapperWidth.value],
          Extrapolation.CLAMP,
        );
      }
    })();
  }, [value]);

  const rRailActiveStyle = useAnimatedStyle(() => ({
    width: translateX.value + thumbSize / 2,
  }));

  const rThumbStyle = useAnimatedStyle(() => ({
    width: withTiming(thumbSize),
    height: withTiming(thumbSize),
    transform: [{translateX: translateX.value + overflowShift.value}],
  }));

  const railPosition = useAnimatedStyle(() => ({
    height: withTiming(railHeight),
    top: withTiming(Math.max(0, thumbSize - railHeight) / 2),
  }));

  return (
    <Animated.View ref={rViewRef}>
      <Animated.View style={[railPosition, defaultStyles.railDefault, style?.railDefault]} />
      <Animated.View
        style={[railPosition, defaultStyles.railActive, style?.railActive, rRailActiveStyle]}
      />
      <GestureDetector gesture={pan}>
        <Animated.View style={[defaultStyles.thumb, style?.thumb, rThumbStyle]} />
      </GestureDetector>
    </Animated.View>
  );
};

const defaultStyles = StyleSheet.create({
  railDefault: {
    width: "100%",
    position: "absolute",
    backgroundColor: "lightblue",
  },
  railActive: {
    position: "absolute",
    backgroundColor: "yellow",
  },
  thumb: {
    borderWidth: 8,
    borderColor: "white",
    borderRadius: 9999,
    backgroundColor: "yellow",
  },
});
