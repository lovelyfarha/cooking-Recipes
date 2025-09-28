
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TimerComponent } from '@/components/TimerComponent';
import { useTimer } from '@/hooks/useTimer';
import { IconSymbol } from '@/components/IconSymbol';

export default function TimersScreen() {
  const {
    timers,
    startTimer,
    pauseTimer,
    resetTimer,
    removeTimer,
    formatTime,
  } = useTimer();

  const activeTimers = timers.filter(timer => !timer.isCompleted);
  const completedTimers = timers.filter(timer => timer.isCompleted);

  if (timers.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <IconSymbol name="timer" size={64} color="#d1d5db" />
        <Text style={styles.emptyTitle}>No Active Timers</Text>
        <Text style={styles.emptySubtitle}>
          Start cooking a recipe to create timers for each step!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {activeTimers.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Active Timers ({activeTimers.length})
            </Text>
            {activeTimers.map((timer) => (
              <TimerComponent
                key={timer.id}
                timer={timer}
                onStart={startTimer}
                onPause={pauseTimer}
                onReset={resetTimer}
                onRemove={removeTimer}
                formatTime={formatTime}
              />
            ))}
          </View>
        )}

        {completedTimers.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Completed ({completedTimers.length})
            </Text>
            {completedTimers.map((timer) => (
              <TimerComponent
                key={timer.id}
                timer={timer}
                onStart={startTimer}
                onPause={pauseTimer}
                onReset={resetTimer}
                onRemove={removeTimer}
                formatTime={formatTime}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    paddingHorizontal: 32,
    gap: 16,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
    marginHorizontal: 16,
  },
});
