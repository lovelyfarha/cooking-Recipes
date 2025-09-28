
import React from 'react';
import { Tabs } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#f97316',
        tabBarInactiveTintColor: colors.text,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#e5e7eb',
          borderTopWidth: 1,
          paddingTop: 8,
          paddingBottom: 8,
          height: 88,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
        headerStyle: {
          backgroundColor: '#ffffff',
          borderBottomColor: '#e5e7eb',
          borderBottomWidth: 1,
        },
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: '700',
          color: '#111827',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Recipes',
          headerTitle: 'Discover Recipes',
          tabBarIcon: ({ color, size }) => (
            <IconSymbol name="book.closed" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: 'Saved',
          headerTitle: 'Saved Recipes',
          tabBarIcon: ({ color, size }) => (
            <IconSymbol name="heart.fill" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="timers"
        options={{
          title: 'Timers',
          headerTitle: 'Cooking Timers',
          tabBarIcon: ({ color, size }) => (
            <IconSymbol name="timer" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
