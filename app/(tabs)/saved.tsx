
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RecipeCard } from '@/components/RecipeCard';
import { useRecipes } from '@/hooks/useRecipes';
import { IconSymbol } from '@/components/IconSymbol';

export default function SavedRecipesScreen() {
  const { getSavedRecipes, toggleSaveRecipe, loading } = useRecipes();
  const savedRecipes = getSavedRecipes();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <IconSymbol name="heart" size={32} color="#f97316" />
        <Text style={styles.loadingText}>Loading saved recipes...</Text>
      </View>
    );
  }

  if (savedRecipes.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <IconSymbol name="heart" size={64} color="#d1d5db" />
        <Text style={styles.emptyTitle}>No Saved Recipes</Text>
        <Text style={styles.emptySubtitle}>
          Start exploring recipes and save your favorites to see them here!
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
        <View style={styles.header}>
          <Text style={styles.countText}>
            {savedRecipes.length} saved recipe{savedRecipes.length !== 1 ? 's' : ''}
          </Text>
        </View>

        <View style={styles.recipesContainer}>
          {savedRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onToggleSave={toggleSaveRecipe}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    gap: 16,
  },
  loadingText: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
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
  header: {
    padding: 24,
    backgroundColor: '#ffffff',
    marginBottom: 16,
  },
  countText: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '600',
    textAlign: 'center',
  },
  recipesContainer: {
    gap: 8,
  },
});
