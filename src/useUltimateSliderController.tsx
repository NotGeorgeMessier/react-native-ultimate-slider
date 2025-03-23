import {useRef, useState} from "react";
import {Keyboard, TextInput} from "react-native";
import {clamp} from "react-native-reanimated";

import {
  UseUltimateSliderController,
  UseUltimateSliderControllerOnChange,
  UseUltimateSliderControllerOnEndEditing,
} from "./types";

export const useUltimateSliderController: UseUltimateSliderController = ({
  initValue,
  minValue,
  maxValue,
  step,
}) => {
  const inputRef = useRef<TextInput | null>(null);

  const [value, setValue] = useState(initValue);

  const onPlusMinus = (plusMinus: 1 | -1, stepMultiplier = 1) => {
    Keyboard.dismiss();
    setValue((prev) => clamp(prev + plusMinus * step * stepMultiplier, minValue, maxValue));
  };

  const onChange: UseUltimateSliderControllerOnChange = (e) => {
    setValue(Number(e.nativeEvent.text) || 0);
  };

  const onEndEditing: UseUltimateSliderControllerOnEndEditing = (e) => {
    const num = Number(e.nativeEvent.text) || minValue;
    const val = clamp(num, minValue, maxValue);
    setValue(val);
  };

  const focusInput = () => {
    inputRef?.current?.focus();
  };

  return {
    inputRef,
    value,
    setValue,
    onPlusMinus,
    onChange,
    onEndEditing,
    focusInput,
  };
};
