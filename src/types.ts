import React from "react";
import {
  NativeSyntheticEvent,
  StyleProp,
  TextInput,
  TextInputChangeEventData,
  TextInputEndEditingEventData,
  TextInputProps,
  TextProps,
  TextStyle,
  ViewStyle,
} from "react-native";
import Animated, { AnimatedRef } from "react-native-reanimated";

// Helpers
export type GetWrapperWidth = (
  ref: AnimatedRef<Animated.View>,
  thumbSize: number
) => number;
export type BinarySearchStep = (
  rightMaxStep: number,
  translationX: number,
  stepWidth: number
) => number;

// Hooks
type UseUltimateSliderControllerInputRef = React.RefObject<TextInput>;
type SliderControllerValue = {
  /** Current value of the slider */
  value: number;
  /** SetValue for the slider */
  setValue: React.Dispatch<React.SetStateAction<number>>;
};
type UseUltimateSliderControllerOnPlusMinus = (
  plusMinus: 1 | -1,
  stepMultiplier?: number
) => void;
type UseUltimateSliderControllerFocusInput = () => void;
export type UseUltimateSliderControllerOnChange = (
  e: NativeSyntheticEvent<TextInputChangeEventData>
) => void;
export type UseUltimateSliderControllerOnEndEditing = (
  e: NativeSyntheticEvent<TextInputEndEditingEventData>
) => void;

export type UseUltimateSliderController = (
  props: SliderState & { initValue: number }
) => SliderControllerValue & {
  /** Ref for the TextInput */
  inputRef: UseUltimateSliderControllerInputRef;
  /** Callback for plus or minus buttons around the input */
  onPlusMinus: UseUltimateSliderControllerOnPlusMinus;
  /** Callback to focus the TextInput */
  focusInput: UseUltimateSliderControllerFocusInput;
  /** Callback for onChange input by keyboard */
  onChange: UseUltimateSliderControllerOnChange;
  /** Clamp the value to the min or max on the end of editing */
  onEndEditing: UseUltimateSliderControllerOnEndEditing;
};

// Props
type ReturnTouchable = (touchableProps: {
  /** Delay before long press for repeated presses */
  delayLongPress: number;
  /** Immediate callback for trigger plus or minus */
  onPressIn: () => void;
  /** Callback for repeated presses */
  onLongPress: () => void;
  /** Callback to reset long press interval */
  onPressOut: () => void;
}) => React.ReactNode;

type SliderState = {
  /** Minimum value for the slider */
  minValue: number;
  /** Maximum value for the slider */
  maxValue: number;
  /** Step value for the slider */
  step: number;
};

type SliderConfig = {
  /** Height of the rail */
  railHeight?: number;
  /** Size of the thumb */
  thumbSize?: number;
  /** How much the thumb can overflow the rail on X axis */
  thumbOverflow?: number;
};

type UltimateSliderInputField = {
  /** Extra props for the TextInput */
  textInputExtraProps?: TextInputProps;
  /** Extra props for the displayed text instead of the TextInput */
  inputReplicaTextProps?: TextProps;
  /** Function to modify the displayed text */
  renderText?: (value: string) => string;
};

type UltimateSliderButtonLongPressConfig = {
  /** Initial interval between long press triggers, that will be reduced by half until "longpressMinInterval" */
  longpressTriggerInterval?: number;
  /** Minimum interval between long press triggers (usually around 10x less than "longpressTriggerInterval") */
  longpressMinInterval?: number;
  /** Number of steps for long press repeats within one interval,
   * until the interval is reduced by half or to "longpressMinInterval" */
  longpressIterationSteps?: number;
};

// Styles
type UltimateSliderStyle = {
  /** Container that wraps the slider */
  wrapper?: StyleProp<ViewStyle>;
  /** Container that wraps the input section and touchable plus / minus */
  inputRow?: StyleProp<ViewStyle>;
  /** Touchable minus button */
  minusBtn?: StyleProp<ViewStyle>;
  /** Touchable plus button */
  plusBtn?: StyleProp<ViewStyle>;
  /** Hidden TextInput to handle keyboard input */
  hiddenInput?: StyleProp<TextStyle>;
  /** Text to display the value instead of the TextInput */
  inputReplicator?: StyleProp<TextStyle>;
  /** Slider default rail */
  railDefault?: StyleProp<ViewStyle>;
  /** Slider active rail */
  railActive?: StyleProp<ViewStyle>;
  /** Slider thumb */
  thumb?: StyleProp<ViewStyle>;
};

// Components

// Main
export type UltimateSliderProps = SliderState &
  SliderConfig &
  UltimateSliderInputField &
  UltimateSliderButtonLongPressConfig &
  ReturnType<UseUltimateSliderController> & {
    /** Disable Keyboard from appearing when the slider area is pressed */
    disableOnPress?: boolean;
    /** Default text component without event handlers for the minus button */
    MinusBtnText: React.FC;
    /** Custom touchable component with event handlers for the minus button
     * - if not provided, default MinusBtnText will be used */
    returnCustomTouchableMinus?: ReturnTouchable;

    /** Default text component without event handlers for the plus button */
    PlusBtnText: React.FC;
    /** Custom touchable component with event handlers for the plus button
     * - if not provided, default PlusBtnText will be used */
    returnCustomTouchablePlus?: ReturnTouchable;
    /** Styles for all components */
    style?: UltimateSliderStyle;
  };

// Input
export type InputSectionProps = UltimateSliderInputField & {
  inputRef: UseUltimateSliderControllerInputRef;
  value: SliderControllerValue["value"];
  focusInput: UseUltimateSliderControllerFocusInput;
  onChange: UseUltimateSliderControllerOnChange;
  onEndEditing: UseUltimateSliderControllerOnEndEditing;
  // Style object
  style: Pick<UltimateSliderStyle, "hiddenInput" | "inputReplicator">;
};

// Touchable plus / minus
export type TouchablePlusMinusProps =
  Required<UltimateSliderButtonLongPressConfig> & {
    plusMinus: 1 | -1;
    onPlusMinus: UseUltimateSliderControllerOnPlusMinus;
    // children or render custom touchable component
    children: React.ReactNode;
    returnCustomTouchable?: ReturnTouchable;
    // Style object
    style: Pick<UltimateSliderStyle, "minusBtn" | "plusBtn">;
  };

// Slider
export type SliderProps = SliderState &
  SliderControllerValue &
  Required<SliderConfig> & {
    // Style object
    style: Pick<UltimateSliderStyle, "railDefault" | "railActive" | "thumb">;
  };
