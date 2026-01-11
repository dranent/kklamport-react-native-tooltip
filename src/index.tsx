import React, { useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';

export interface TooltipProps {
  isVisible: boolean;
  message: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom';
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

  return (
    <View style={styles.container}>
      {children}
      {isVisible && (
        <Animated.View
          style={[
            styles.tooltipContainer,
            position === 'top' ? { bottom: '110%' } : { top: '110%' },
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  tooltipContainer: {
    position: 'absolute',
    alignItems: 'center',
    width: 250,
    zIndex: 9999,
  },
  bubble: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    minHeight: 36,
    justifyContent: 'center',
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
