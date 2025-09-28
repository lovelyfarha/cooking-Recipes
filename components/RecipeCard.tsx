
import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { Recipe } from '../types/Recipe';
import { IconSymbol } from './IconSymbol';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';

interface RecipeCardProps {
  recipe: Recipe;
  onToggleSave: (recipeId: string) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onToggleSave }) => {
  const handlePress = () => {
    console.log('Recipe card pressed:', recipe.title);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push(`/recipe/${recipe.id}`);
  };

  const handleSavePress = () => {
    console.log('Save button pressed for recipe:', recipe.title);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onToggleSave(recipe.id);
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
    <Pressable style={styles.card} onPress={handlePress}>
      <Image source={{ uri: recipe.image }} style={styles.image} />
      
      <Pressable 
        style={styles.saveButton} 
        onPress={handleSavePress}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <IconSymbol
          name={recipe.isSaved ? 'heart.fill' : 'heart'}
          size={24}
          color={recipe.isSaved ? '#ef4444' : '#ffffff'}
        />
      </Pressable>

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {recipe.title}
        </Text>
        
        <Text style={styles.description} numberOfLines={2}>
          {recipe.description}
        </Text>

        <View style={styles.metaContainer}>
          <View style={styles.timeContainer}>
            <IconSymbol name="clock" size={16} color="#6b7280" />
            <Text style={styles.timeText}>
              {recipe.prepTime + recipe.cookTime} min
            </Text>
          </View>

          <View style={styles.servingsContainer}>
            <IconSymbol name="person.2" size={16} color="#6b7280" />
            <Text style={styles.servingsText}>
              {recipe.servings}
            </Text>
          </View>

          <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(recipe.difficulty) }]}>
            <Text style={styles.difficultyText}>
              {recipe.difficulty}
            </Text>
          </View>
        </View>

        <View style={styles.tagsContainer}>
          {recipe.tags.slice(0, 3).map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>
                {tag}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: '#f3f4f6',
  },
  saveButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    padding: 8,
    zIndex: 1,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
    lineHeight: 24,
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
    lineHeight: 20,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 16,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  servingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  servingsText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
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
  },
  tag: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
  },
});
