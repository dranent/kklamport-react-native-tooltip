@kklamport/react-native-tooltip 🚀
A lightweight, highly customizable, and animated tooltip component for React Native.

This library provides an easy way to show animated tooltips (speech bubbles) in your React Native applications. It features built-in dark mode support, an auto-hide timer, and complete theme customization.

🛠 Features
🌓 Dynamic Theme: Automatically detects and switches between Light and Dark modes.

⏱ Auto-hide: Optional auto-dismiss functionality using the autoHideDuration prop.

🎛 Full Customization: Control background colors, text colors, arrows, and the close button.

💫 Smooth Animation: Built with the Animated API for fluid entry and exit transitions.

⌨️ TypeScript Support: Fully typed for a better developer experience and type safety.

📦 Installation
Bash

# Using npm

npm install @kklamport/react-native-tooltip

# Using yarn

yarn add @kklamport/react-native-tooltip
Note: Ensure react-native-safe-area-context is installed in your project.

🚀 Usage
Here is a basic example. Click the button to toggle the tooltip, which will automatically disappear after 3 seconds.

TypeScript

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Tooltip } from '@kklamport/react-native-tooltip';

export default function App() {
const [showTooltip, setShowTooltip] = useState(false);

return (
<View style={styles.container}>
<Tooltip
isVisible={showTooltip}
message="Hello! This is a customizable tooltip."
position="top"
autoHideDuration={3000} // Auto-hide after 3 seconds
onClose={() => setShowTooltip(false)} >
<TouchableOpacity
style={styles.button}
onPress={() => setShowTooltip(!showTooltip)} >
<Text style={styles.buttonText}>Show Tooltip</Text>
</TouchableOpacity>
</Tooltip>
</View>
);
}

const styles = StyleSheet.create({
container: {
flex: 1,
alignItems: 'center',
justifyContent: 'center',
},
button: {
backgroundColor: '#007AFF',
paddingVertical: 12,
paddingHorizontal: 24,
borderRadius: 8,
},
buttonText: {
color: 'white',
fontWeight: 'bold',
},
});

## ⚙️ Props

| Property                  | Type                | Default     | Description                                          |
| :------------------------ | :------------------ | :---------- | :--------------------------------------------------- |
| **`isVisible`**           | `boolean`           | `required`  | Controls whether the tooltip is visible.             |
| **`message`**             | `string`            | `required`  | The text message to display inside the tooltip.      |
| **`children`**            | `ReactNode`         | `required`  | The component that the tooltip will anchor to.       |
| **`position`**            | `'top' \| 'bottom'` | `'top'`     | Placement of the tooltip relative to children.       |
| **`autoHideDuration`**    | `number`            | `undefined` | Duration in ms before the tooltip auto-closes.       |
| **`onClose`**             | `() => void`        | `undefined` | Callback function triggered when the tooltip closes. |
| **`showArrow`**           | `boolean`           | `true`      | Whether to show the bubble arrow.                    |
| **`showCloseButton`**     | `boolean`           | `true`      | Whether to show the "✕" close button.                |
| **`backgroundColor`**     | `string`            | `#222222`   | Background color for Light Mode.                     |
| **`textColor`**           | `string`            | `#FFFFFF`   | Text color for Light Mode.                           |
| **`darkBackgroundColor`** | `string`            | `#444444`   | Background color for Dark Mode.                      |
| **`darkTextColor`**       | `string`            | `#FFFFFF`   | Text color for Dark Mode.                            |

📄 License
This project is licensed under the MIT License.

✉️ Contact
If you have any questions, feedback, or want to report a bug, please feel free to reach out.

Developer: kklamport

Email: kklamport@gmail.com

💡 Pro-Tip
After publishing, consider adding a GIF or Screenshot in the GitHub repository so users can see the animations in action!

Now that the README is ready, you can proceed with the final build (yarn prepare) and publish your library! Would you like me to help you with the final npm publish command again?
