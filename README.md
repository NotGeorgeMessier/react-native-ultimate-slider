
# React Native Ultimate Slider

Very flexible slider

Based on Reanimated animations

### Why is it ultimate?

- Its working (value that)
- Exclusive connection with custom TextInput and +/- Buttons out of box
- The components can be used separately (including simple slider)
- Every component can be styled by yourself, your design system, etc.
- Small package size (and all You need in it)
- 60 FPS always - animations and calcucations run on UI thread

### Prerequisites

- [Reanimated 2+](https://docs.swmansion.com/react-native-reanimated/)
- [Gesture Handler 2+](https://docs.swmansion.com/react-native-gesture-handler/docs/)

## How to use

![Slider](https://i.postimg.cc/Qd4WS5FZ/image.png)

### UltimateSlider

`UltimateSlider` component - All in one

Require props from `useUltimateSliderController`

and config props
```tsx
  const PROPS = {
  // Slider state - required
  initValue: 150000,
  minValue: 0,
  maxValue: 1000000,
  step: 100,
  // Button text - required
  PlusBtnText: () => <Text>+</Text>,
  MinusBtnText: () => <Text>-</Text>,
  // Slider style - optional
  railHeight: 16,
  thumbSize: 40,
  thumbOverflow: 5,
  // Input field - optional
  textInputExtraProps: undefined,
  inputReplicaTextProps: undefined,
  renderText: (v: string) => `$${v}`,
  // Button config - optional
  longpressTriggerInterval: 300,
  longpressMinInterval: 30,
  longpressIterationSteps: 4,
  returnCustomTouchablePlus: undefined,
  returnCustomTouchableMinus: undefined,
  // Slider wrapper - optional
  disableOnPress: undefined,
};
```

and `style` prop
```ts
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
```

### Slider
`Slider` - main component

Requires `value, setValue` pair from useState or any other state manager`

and config props
```tsx
  const PROPS = {
  // Slider state - required
  minValue: 0,
  maxValue: 1000000,
  step: 100,
  // Slider style - optional
  railHeight: 16,
  thumbSize: 40,
  thumbOverflow: 5,
};
```

and `style` prop
```ts
type Style = {
  /** Slider default rail */
  railDefault?: StyleProp<ViewStyle>;
  /** Slider active rail */
  railActive?: StyleProp<ViewStyle>;
  /** Slider thumb */
  thumb?: StyleProp<ViewStyle>;
};
```

### Input Section (InputSection)

Custom input section that may work together with other components from this lib or standalone

Require props from `useUltimateSliderController` (or manually created for InputSection, if You bold enough)

optional props
```ts
type UltimateSliderInputField = {
  /** Extra props for the TextInput */
  textInputExtraProps?: TextInputProps;
  /** Extra props for the displayed text instead of the TextInput */
  inputReplicaTextProps?: TextProps;
  /** Function to modify the displayed text */
  renderText?: (value: string) => string;
};
```
and `style` prop
```ts
type Style = {
  /** Hidden TextInput to handle keyboard input */
  hiddenInput?: StyleProp<TextStyle>;
  /** Text to display the value instead of the TextInput */
  inputReplicator?: StyleProp<TextStyle>;
};
```

### Touchable buttons Plus or Minus (TouchablePlusMinus)

Custom buttons that may work together with other components from this lib or standalone

require props (details in types file):

define the purpose `plusMinus: 1 | -1;`

2 ways of render the content inside. First is deafult React `children`, second is render Function `returnCustomTouchable`

define the behavior `onPlusMinus` - best way is to receive `onPlusMinus` from `useUltimateSliderController`

also:

```ts
type UltimateSliderButtonLongPressConfig = {
  /** Initial interval between long press triggers, that will be reduced by half until "longpressMinInterval" */
  longpressTriggerInterval: number;
  /** Minimum interval between long press triggers (usually around 10x less than "longpressTriggerInterval") */
  longpressMinInterval: number;
  /** Number of steps for long press repeats within one interval,
   * until the interval is reduced by half or to "longpressMinInterval" */
  longpressIterationSteps: number;
};
```
and `style` prop with one of the style
```ts
type Style = {
  /** Touchable minus button */
  minusBtn?: StyleProp<ViewStyle>;
  /** Touchable plus button */
  plusBtn?: StyleProp<ViewStyle>;
};
```

#### Afterword

Its sort of alternative to everything else, including community slider

And its still pretty much in progress, on its way to perfection

Go shit me in [issues](github.com/NotGeorgeMessier/react-native-ultimate-slider) if you dare
