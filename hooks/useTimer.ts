
import { useState, useEffect, useRef } from 'react';
import { Timer } from '../types/Recipe';
import * as Haptics from 'expo-haptics';

export const useTimer = () => {
  const [timers, setTimers] = useState<Timer[]>([]);
  const intervalRefs = useRef<{ [key: string]: NodeJS.Timeout }>({});

  const createTimer = (name: string, duration: number): string => {
    const id = Date.now().toString();
    const newTimer: Timer = {
      id,
      name,
      duration: duration * 60, // convert minutes to seconds
      remainingTime: duration * 60,
      isActive: false,
      isCompleted: false,
    };
    
    console.log('Creating timer:', name, 'for', duration, 'minutes');
    setTimers(prev => [...prev, newTimer]);
    return id;
  };

  const startTimer = (id: string) => {
    console.log('Starting timer:', id);
    setTimers(prev => 
      prev.map(timer => 
        timer.id === id ? { ...timer, isActive: true } : timer
      )
    );

    intervalRefs.current[id] = setInterval(() => {
      setTimers(prev => 
        prev.map(timer => {
          if (timer.id === id && timer.isActive) {
            const newRemainingTime = timer.remainingTime - 1;
            
            if (newRemainingTime <= 0) {
              // Timer completed
              console.log('Timer completed:', timer.name);
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
              clearInterval(intervalRefs.current[id]);
              delete intervalRefs.current[id];
              
              return {
                ...timer,
                remainingTime: 0,
                isActive: false,
                isCompleted: true,
              };
            }
            
            return {
              ...timer,
              remainingTime: newRemainingTime,
            };
          }
          return timer;
        })
      );
    }, 1000);
  };

  const pauseTimer = (id: string) => {
    console.log('Pausing timer:', id);
    setTimers(prev => 
      prev.map(timer => 
        timer.id === id ? { ...timer, isActive: false } : timer
      )
    );
    
    if (intervalRefs.current[id]) {
      clearInterval(intervalRefs.current[id]);
      delete intervalRefs.current[id];
    }
  };

  const resetTimer = (id: string) => {
    console.log('Resetting timer:', id);
    if (intervalRefs.current[id]) {
      clearInterval(intervalRefs.current[id]);
      delete intervalRefs.current[id];
    }
    
    setTimers(prev => 
      prev.map(timer => 
        timer.id === id 
          ? { 
              ...timer, 
              remainingTime: timer.duration, 
              isActive: false, 
              isCompleted: false 
            } 
          : timer
      )
    );
  };

  const removeTimer = (id: string) => {
    console.log('Removing timer:', id);
    if (intervalRefs.current[id]) {
      clearInterval(intervalRefs.current[id]);
      delete intervalRefs.current[id];
    }
    
    setTimers(prev => prev.filter(timer => timer.id !== id));
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      Object.values(intervalRefs.current).forEach(interval => {
        clearInterval(interval);
      });
    };
  }, []);

  return {
    timers,
    createTimer,
    startTimer,
    pauseTimer,
    resetTimer,
    removeTimer,
    formatTime,
  };
};
