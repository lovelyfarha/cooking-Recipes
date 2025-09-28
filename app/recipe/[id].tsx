
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  Alert,
} from 'react-native';
import { useLocalSearchParams, router, Stack } from 'expo-router';
import { useRecipes } from '@/hooks/useRecipes';
import { useTimer } from '@/hooks/useTimer';
import { IconSymbol } from '@/components/IconSymbol';
import { Button } from '@/components/button';
import * as Haptics from 'expo-haptics';

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getRecipeById, toggleSaveRecipe } = useRecipes();
  const { createTimer, startTimer } = useTimer();
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const recipe = getRecipeById(id!);

  if (!recipe) {
    return (
      <View style={styles.errorContainer}>
        <IconSymbol name="exclamationmark.triangle" size={48} color="#ef4444" />
        <Text style={styles.errorTitle}>Recipe Not Found</Text>
        <Text style={styles.errorSubtitle}>
          The recipe you&apos;re looking for doesn&apos;t exist.
        </Text>
        <Button onPress={() => router.back()} style={styles.backButton}>
          Go Back
        </Button>
      </View>
    );
  }

  const handleSaveRecipe = () => {
    console.log('Toggling save for recipe:', recipe.title);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    toggleSaveRecipe(recipe.id);
  };

  const handleStartTimer = (stepId: string, stepName: string, duration: number) => {
    console.log('Starting timer for step:', stepName);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    const timerId = createTimer(`${recipe.title} - ${stepName}`, duration);
    startTimer(timerId);
    
    Alert.alert(
      'Timer Started',
      `${duration} minute timer started for "${stepName}"`,
      [
        {
          text: 'View Timers',
          onPress: () => router.push('/(tabs)/timers'),
        },
        { text: 'Continue Cooking', style: 'cancel' },
      ]
    );
  };

  const handleStepPress = (stepNumber: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setActiveStep(activeStep === stepNumber ? null : stepNumber);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return '#22c55e';
      case 'Medium': return '#f59e0b';
      case 'Hard': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: recipe.title,
          headerRight: () => (
            <Pressable onPress={handleSaveRecipe} style={styles.headerButton}>
              <IconSymbol
                name={recipe.isSaved ? 'heart.fill' : 'heart'}
                size={24}
                color={recipe.isSaved ? '#ef4444' : '#111827'}
              />
            </Pressable>
          ),
        }}
      />
      
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Image source={{ uri: recipe.image }} style={styles.heroImage} />
        
        <View style={styles.content}>
          <Text style={styles.title}>{recipe.title}</Text>
          <Text style={styles.description}>{recipe.description}</Text>

          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <IconSymbol name="clock" size={20} color="#6b7280" />
              <Text style={styles.metaText}>
                {recipe.prepTime + recipe.cookTime} min
              </Text>
            </View>

            <View style={styles.metaItem}>
              <IconSymbol name="person.2" size={20} color="#6b7280" />
              <Text style={styles.metaText}>
                {recipe.servings} servings
              </Text>
            </View>

            <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(recipe.difficulty) }]}>
              <Text style={styles.difficultyText}>
                {recipe.difficulty}
              </Text>
            </View>
          </View>

          <View style={styles.tagsContainer}>
            {recipe.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            <View style={styles.ingredientsList}>
              {recipe.ingredients.map((ingredient) => (
                <View key={ingredient.id} style={styles.ingredientItem}>
                  <View style={styles.ingredientBullet} />
                  <Text style={styles.ingredientText}>
                    <Text style={styles.ingredientAmount}>
                      {ingredient.amount} {ingredient.unit}
                    </Text>
                    {' '}
                    {ingredient.name}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Instructions</Text>
            <View style={styles.stepsList}>
              {recipe.steps.map((step) => (
                <Pressable
                  key={step.id}
                  style={[
                    styles.stepItem,
                    activeStep === step.stepNumber && styles.activeStepItem
                  ]}
                  onPress={() => handleStepPress(step.stepNumber)}
                >
                  <View style={styles.stepHeader}>
                    <View style={[
                      styles.stepNumber,
                      activeStep === step.stepNumber && styles.activeStepNumber
                    ]}>
                      <Text style={[
                        styles.stepNumberText,
                        activeStep === step.stepNumber && styles.activeStepNumberText
                      ]}>
                        {step.stepNumber}
                      </Text>
                    </View>
                    
                    <Text style={[
                      styles.stepInstruction,
                      activeStep === step.stepNumber && styles.activeStepInstruction
                    ]}>
                      {step.instruction}
                    </Text>
                  </View>

                  {step.duration && (
                    <View style={styles.timerContainer}>
                      <Pressable
                        style={styles.timerButton}
                        onPress={() => handleStartTimer(
                          step.id,
                          `Step ${step.stepNumber}`,
                          step.duration!
                        )}
                      >
                        <IconSymbol name="timer" size={16} color="#f97316" />
                        <Text style={styles.timerButtonText}>
                          Start {step.duration} min timer
                        </Text>
                      </Pressable>
                    </View>
                  )}
                </Pressable>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    paddingHorizontal: 32,
    gap: 16,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
  },
  errorSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  backButton: {
    marginTop: 16,
  },
  headerButton: {
    padding: 8,
  },
  heroImage: {
    width: '100%',
    height: 300,
    backgroundColor: '#f3f4f6',
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
    lineHeight: 34,
  },
  description: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 20,
    lineHeight: 24,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 20,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginLeft: 'auto',
  },
  difficultyText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '600',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 32,
  },
  tag: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  tagText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  ingredientsList: {
    gap: 12,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  ingredientBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#f97316',
    marginTop: 8,
  },
  ingredientText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    flex: 1,
  },
  ingredientAmount: {
    fontWeight: '600',
    color: '#111827',
  },
  stepsList: {
    gap: 16,
  },
  stepItem: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  activeStepItem: {
    backgroundColor: '#fef3e2',
    borderColor: '#f97316',
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeStepNumber: {
    backgroundColor: '#f97316',
  },
  stepNumberText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#374151',
  },
  activeStepNumberText: {
    color: '#ffffff',
  },
  stepInstruction: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    flex: 1,
  },
  activeStepInstruction: {
    color: '#111827',
    fontWeight: '500',
  },
  timerContainer: {
    marginTop: 12,
    marginLeft: 48,
  },
  timerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 8,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#f97316',
  },
  timerButtonText: {
    fontSize: 14,
    color: '#f97316',
    fontWeight: '600',
  },
});
