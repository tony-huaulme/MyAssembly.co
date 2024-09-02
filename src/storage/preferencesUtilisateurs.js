// src/storage/preferencesUtilisateurs.js
import { defineStore } from 'pinia';

export const usePreferencesAffichage = defineStore('preferences-affichage-tableau', {
  state: () => ({
    preference: 'pages', // Default value
  }),
  actions: {
    basculerLaPreference() {
      this.preference = this.preference === 'pages' ? 'défilement' : 'pages';
      console.log('La préférence a été basculée à', this.preference);
    },
  },
});
