import { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native'; // useColorScheme 추가
// 💡 테스트를 위해 다시 상대 경로로 바꿔보세요 (확실한 반영을 위해)
import { Tooltip } from '../../src/index';

export default function App() {
  const [showTooltip, setShowTooltip] = useState(false);

  // 앱 자체에서도 다크모드 여부를 감지합니다.
  const scheme = useColorScheme();
  const isDarkMode = scheme === 'dark';

  return (
    // 배경색을 시스템 테마에 따라 변하게 합니다.
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
          // 여기서 지정한 색상들이 다크모드일 때 잘 나오는지 확인!
          backgroundColor="#6200EE"
          textColor="#FFFFFF"
          darkBackgroundColor="#FFFFFF" // 다크모드일 땐 반대로 흰 배경에
          darkTextColor="#000000" // 검은 글씨로 테스트해봅시다.
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
          {isDarkMode ? '현재 다크 모드입니다 🌙' : '현재 라이트 모드입니다 ☀️'}
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
