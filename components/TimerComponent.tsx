
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Timer } from '../types/Recipe';
import { IconSymbol } from './IconSymbol';
import * as Haptics from 'expo-haptics';

interface TimerComponentProps {
  timer: Timer;
  onStart: (id: string) => void;
  onPause: (id: string) => void;
  onReset: (id: string) => void;
  onRemove: (id: string) => void;
  formatTime: (seconds: number) => string;
}

export const TimerComponent: React.FC<TimerComponentProps> = ({
  timer,
  onStart,
  onPause,
  onReset,
  onRemove,
  formatTime,
}) => {
  const handlePlayPause = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (timer.isActive) {
      onPause(timer.id);
    } else {
      onStart(timer.id);
    }
  };

  const handleReset = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onReset(timer.id);
  };

  const handleRemove = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    onRemove(timer.id);
  };

  const getProgressPercentage = () => {
    return ((timer.duration - timer.remainingTime) / timer.duration) * 100;
  };

  const getTimerColor = () => {
    if (timer.isCompleted) return '#22c55e';
    if (timer.remainingTime <= 60) return '#ef4444';
    if (timer.remainingTime <= 300) return '#f59e0b';
    return '#3b82f6';
  };

  return (
    <View style={[styles.container, timer.isCompleted && styles.completedContainer]}>
      <View style={styles.header}>
        <Text style={styles.name} numberOfLines={1}>
          {timer.name}
        </Text>
        <Pressable onPress={handleRemove} style={styles.removeButton}>
          <IconSymbol name="xmark" size={16} color="#6b7280" />
        </Pressable>
      </View>

      <View style={styles.timerDisplay}>
        <Text style={[styles.timeText, { color: getTimerColor() }]}>
          {formatTime(timer.remainingTime)}
        </Text>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressBackground}>
            <View 
              style={[
                styles.progressFill, 
                { 
                  width: `${getProgressPercentage()}%`,
                  backgroundColor: getTimerColor()
                }
              ]} 
            />
          </View>
        </View>
      </View>

      <View style={styles.controls}>
        <Pressable 
          onPress={handlePlayPause} 
          style={[styles.controlButton, styles.playButton]}
          disabled={timer.isCompleted}
        >
          <IconSymbol
            name={timer.isActive ? 'pause.fill' : 'play.fill'}
            size={20}
            color="#ffffff"
          />
        </Pressable>

        <Pressable onPress={handleReset} style={styles.controlButton}>
          <IconSymbol name="arrow.clockwise" size={18} color="#6b7280" />
        </Pressable>
      </View>

      {timer.isCompleted && (
        <View style={styles.completedBadge}>
          <IconSymbol name="checkmark.circle.fill" size={16} color="#22c55e" />
          <Text style={styles.completedText}>Completed!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  completedContainer: {
    backgroundColor: '#f0fdf4',
    borderColor: '#22c55e',
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  removeButton: {
    padding: 4,
  },
  timerDisplay: {
    alignItems: 'center',
    marginBottom: 16,
  },
  timeText: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
  },
  progressContainer: {
    width: '100%',
  },
  progressBackground: {
    height: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  controlButton: {
    backgroundColor: '#f3f4f6',
    borderRadius: 24,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    backgroundColor: '#3b82f6',
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    gap: 6,
  },
  completedText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#22c55e',
  },
});
