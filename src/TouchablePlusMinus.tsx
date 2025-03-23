import React, {useEffect, useState} from "react";
import {TouchableOpacity} from "react-native";

import {TouchablePlusMinusProps} from "./types";

const TouchablePlusMinusComponent: React.FC<TouchablePlusMinusProps> = ({
  children,
  plusMinus,
  longpressTriggerInterval,
  longpressMinInterval,
  longpressIterationSteps,
  onPlusMinus,
  returnCustomTouchable,
  style,
}) => {
  const [longPressTimestamp, setLongPressTimestamp] = useState(0);
  const [longPressInterval, setLongPressInterval] = useState<number>(longpressTriggerInterval);
  const maxIntervalCalls = (longpressTriggerInterval * longpressIterationSteps) / longPressInterval;

  useEffect(() => {
    if (!longPressTimestamp) {
      return;
    }

    const i = setInterval(() => {
      const currentStep = Math.round((Date.now() - longPressTimestamp) / longPressInterval);

      const intervalMultiplier = longpressTriggerInterval / longPressInterval;
      const iterationMultiplier =
        longPressInterval === longpressMinInterval
          ? Math.ceil(currentStep / longpressIterationSteps)
          : 1;
      onPlusMinus(plusMinus, iterationMultiplier * intervalMultiplier);

      // Accelerate interval
      if (currentStep > maxIntervalCalls && longPressInterval !== longpressMinInterval) {
        setLongPressInterval((prev) => Math.max(prev / 2, longpressMinInterval));
        setLongPressTimestamp(Date.now());
      }
    }, longPressInterval);

    return () => clearInterval(i);
  }, [longPressTimestamp]);

  const touchableProps = {
    delayLongPress: longpressTriggerInterval,
    onPressIn: () => onPlusMinus(plusMinus),
    onLongPress: () => {
      setLongPressTimestamp(Date.now());
    },
    onPressOut: () => {
      setLongPressTimestamp(0);
      setLongPressInterval(longpressTriggerInterval);
    },
  };

  if (returnCustomTouchable) {
    return returnCustomTouchable(touchableProps);
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={plusMinus === 1 ? style?.plusBtn : style?.minusBtn}
      {...touchableProps}
    >
      {children}
    </TouchableOpacity>
  );
};

export const TouchablePlusMinus = React.memo(
  TouchablePlusMinusComponent,
  (prev, next) =>
    prev.plusMinus === next.plusMinus &&
    prev.returnCustomTouchable === next.returnCustomTouchable &&
    prev.longpressTriggerInterval === next.longpressTriggerInterval &&
    prev.longpressMinInterval === next.longpressMinInterval &&
    prev.longpressIterationSteps === next.longpressIterationSteps &&
    JSON.stringify(prev.style) === JSON.stringify(next.style),
);
