
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Recipe } from '../types/Recipe';
import { sampleRecipes } from '../data/sampleRecipes';

const SAVED_RECIPES_KEY = 'saved_recipes';

export const useRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [savedRecipeIds, setSavedRecipeIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      console.log('Loading recipes data...');
      const savedIds = await AsyncStorage.getItem(SAVED_RECIPES_KEY);
      const parsedSavedIds = savedIds ? JSON.parse(savedIds) : [];
      setSavedRecipeIds(parsedSavedIds);
      
      // Mark recipes as saved
      const recipesWithSavedStatus = sampleRecipes.map(recipe => ({
        ...recipe,
        isSaved: parsedSavedIds.includes(recipe.id)
      }));
      
      setRecipes(recipesWithSavedStatus);
      console.log('Recipes loaded successfully');
    } catch (error) {
      console.error('Error loading recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSaveRecipe = async (recipeId: string) => {
    try {
      console.log('Toggling save for recipe:', recipeId);
      let newSavedIds: string[];
      
      if (savedRecipeIds.includes(recipeId)) {
        newSavedIds = savedRecipeIds.filter(id => id !== recipeId);
      } else {
        newSavedIds = [...savedRecipeIds, recipeId];
      }
      
      await AsyncStorage.setItem(SAVED_RECIPES_KEY, JSON.stringify(newSavedIds));
      setSavedRecipeIds(newSavedIds);
      
      // Update recipes with new saved status
      setRecipes(prevRecipes => 
        prevRecipes.map(recipe => ({
          ...recipe,
          isSaved: newSavedIds.includes(recipe.id)
        }))
      );
      
      console.log('Recipe save status updated');
    } catch (error) {
      console.error('Error toggling recipe save:', error);
    }
  };

  const getSavedRecipes = () => {
    return recipes.filter(recipe => recipe.isSaved);
  };

  const getRecipeById = (id: string) => {
    return recipes.find(recipe => recipe.id === id);
  };

  return {
    recipes,
    savedRecipeIds,
    loading,
    toggleSaveRecipe,
    getSavedRecipes,
    getRecipeById,
  };
};
