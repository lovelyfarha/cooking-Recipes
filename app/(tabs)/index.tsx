
import React from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { RecipeCard } from '@/components/RecipeCard';
import { useRecipes } from '@/hooks/useRecipes';
import { IconSymbol } from '@/components/IconSymbol';

export default function RecipesScreen() {
  const { recipes, loading, toggleSaveRecipe } = useRecipes();

  const onRefresh = () => {
    console.log('Refreshing recipes...');
    // In a real app, this would fetch new recipes from an API
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <IconSymbol name="clock" size={32} color="#f97316" />
        <Text style={styles.loadingText}>Loading delicious recipes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.appTitle}>Recipe Master</Text>
          <Text style={styles.subtitle}>
            Discover amazing recipes and cook with confidence
          </Text>
        </View>

        <View style={styles.recipesContainer}>
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onToggleSave={toggleSaveRecipe}
            />
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            More recipes coming soon! 👨‍🍳
          </Text>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  header: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
  },
  appTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#111827',
    marginVertical: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  recipesContainer: {
    gap: 8,
  },
  footer: {
    padding: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#9ca3af',
    fontStyle: 'italic',
  },
});
