import React, { useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  useColorScheme,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export interface TooltipProps {
  isVisible: boolean;
  message: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom';
  align?: 'left' | 'center' | 'right';
  backgroundColor?: string;
  textColor?: string;
  darkBackgroundColor?: string;
  darkTextColor?: string;
  autoHideDuration?: number;
  onClose?: () => void;
  showArrow?: boolean;
  showCloseButton?: boolean;
}

const Tooltip = ({
  isVisible,
  message,
  children,
  position = 'top',
  align = 'center',
  backgroundColor,
  textColor,
  darkBackgroundColor,
  darkTextColor,
  autoHideDuration,
  onClose,
  showArrow = true,
  showCloseButton = true,
}: TooltipProps) => {
  const scheme = useColorScheme();
  const isDarkMode = scheme === 'dark';

  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(
    new Animated.Value(position === 'top' ? 10 : -10)
  ).current;

  const finalBgColor = isDarkMode
    ? darkBackgroundColor || '#444444'
    : backgroundColor || '#222222';

  const finalTextColor = isDarkMode
    ? darkTextColor || '#FFFFFF'
    : textColor || '#FFFFFF';

  const handleClose = useCallback(() => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      if (onClose) onClose();
    });
  }, [onClose, opacity]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isVisible) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: 0,
          friction: 5,
          useNativeDriver: true,
        }),
      ]).start();

      if (autoHideDuration && autoHideDuration > 0) {
        timer = setTimeout(handleClose, autoHideDuration);
      }
    } else {
      handleClose();
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isVisible, autoHideDuration, handleClose, opacity, translateY]);

  const getAlignmentStyle = () => {
    switch (align) {
      case 'left':
        return { left: 0, alignItems: 'flex-start' as const };
      case 'right':
        return { right: 0, alignItems: 'flex-end' as const };
      default:
        return { alignSelf: 'center' as const, alignItems: 'center' as const };
    }
  };

  return (
    <View style={styles.container}>
      {children}
      {isVisible && (
        <Animated.View
          style={[
            styles.tooltipContainer,
            position === 'top' ? { bottom: '110%' } : { top: '110%' },
            getAlignmentStyle(),
            { opacity, transform: [{ translateY }] },
          ]}
        >
          <View style={[styles.bubble, { backgroundColor: finalBgColor }]}>
            <View style={styles.contentRow}>
              <Text style={[styles.text, { color: finalTextColor }]}>
                {message}
              </Text>

              {showCloseButton && (
                <TouchableOpacity
                  onPress={handleClose}
                  style={styles.closeButton}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Text style={[styles.closeText, { color: finalTextColor }]}>
                    ✕
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {showArrow && (
            <View
              style={[
                styles.arrow,
                position === 'top' ? styles.arrowBottom : styles.arrowTop,
                align === 'left'
                  ? { left: 15 }
                  : align === 'right'
                    ? { right: 15 }
                    : { alignSelf: 'center' },
                {
                  borderTopColor:
                    position === 'top' ? finalBgColor : 'transparent',
                },
                {
                  borderBottomColor:
                    position === 'bottom' ? finalBgColor : 'transparent',
                },
              ]}
            />
          )}
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 999,
  },
  tooltipContainer: {
    position: 'absolute',
    maxWidth: SCREEN_WIDTH * 0.7,
    minWidth: 150,
    zIndex: 9999,
  },
  bubble: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    flexShrink: 1,
    marginRight: 6,
  },
  closeButton: {
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  arrow: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 8,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  arrowBottom: {
    borderBottomWidth: 0,
    marginTop: -1,
  },
  arrowTop: {
    borderTopWidth: 0,
    marginBottom: -1,
  },
});

export { Tooltip };
