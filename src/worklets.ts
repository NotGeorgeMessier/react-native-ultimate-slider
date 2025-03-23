import {measure} from "react-native-reanimated";
import {BinarySearchStep, GetWrapperWidth} from "./types";

export const getWrapperWidthWorklet: GetWrapperWidth = (ref, thumbSize) => {
  "worklet";

  const ww = measure(ref)?.width ?? 0;

  return ww - thumbSize < 0 ? 0 : ww - thumbSize;
};

export const binarySearchStepWorklet: BinarySearchStep = (
  rightMaxStep,
  translationX,
  stepWidth,
) => {
  "worklet";
  let left = 0;

  while (left <= rightMaxStep) {
    const mid = left + ((rightMaxStep - left) >> 1);
    const eps = translationX - mid * stepWidth;
    if (Math.abs(eps) <= stepWidth / 2) {
      return mid;
    }
    const epsL = translationX - left * stepWidth;
    if (Math.abs(epsL) <= stepWidth / 2) {
      return left;
    }
    const epsR = translationX - rightMaxStep * stepWidth;
    if (Math.abs(epsR) <= stepWidth / 2) {
      return rightMaxStep;
    }

    if (eps > stepWidth / 2) {
      left = mid + 1;
    } else {
      rightMaxStep = mid - 1;
    }
  }

  return 0;
};
