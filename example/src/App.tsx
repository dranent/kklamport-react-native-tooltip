import { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { Tooltip } from '../../src/index';

export default function App() {
  const [showTooltip, setShowTooltip] = useState(false);

  const scheme = useColorScheme();
  const isDarkMode = scheme === 'dark';

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#000000' : '#F8F9FA' },
      ]}
    >
      <View style={styles.content}>
        <Tooltip
          isVisible={showTooltip}
          onClose={() => setShowTooltip(false)}
          message="Hello world! ✨"
          position="top"
          autoHideDuration={10000}
          backgroundColor="#6200EE"
          textColor="#FFFFFF"
          darkBackgroundColor="#FFFFFF"
          darkTextColor="#000000"
          showArrow={true}
          showCloseButton={true}
        >
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: isDarkMode ? '#BB86FC' : '#03DAC6' },
            ]}
            onPress={() => setShowTooltip(!showTooltip)}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>
              {showTooltip ? 'Close Tooltip' : 'Show All Features!'}
            </Text>
          </TouchableOpacity>
        </Tooltip>

        <Text
          style={[styles.guideText, { color: isDarkMode ? '#AAA' : '#666' }]}
        >
          {isDarkMode
            ? 'currently in dark mode 🌙'
            : 'currently in light mode ☀️'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    elevation: 8,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  guideText: {
    marginTop: 40,
    fontSize: 14,
  },
});
