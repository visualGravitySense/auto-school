import React from 'react';

export const DecisionContext = React.createContext({
  decisionState: {
    stage: 'awareness',
    preferences: {},
    cognitiveLoad: 0,
    emotionalState: 'neutral',
    decisionConfidence: 0,
    timeSpent: 0,
    informationSeeking: {
      viewedSections: [],
      timePerSection: {},
      scrollDepth: 0
    },
    decisionFactors: {
      price: 0,
      quality: 0,
      convenience: 0,
      reputation: 0
    },
    decisionProgress: {
      alternativesConsidered: 0,
      comparisonsMade: 0,
      criteriaEvaluated: 0
    },
    userBehavior: {
      clicks: 0,
      hovers: 0,
      scrolls: 0,
      interactions: []
    }
  },
  updateCognitiveLoad: () => {},
  updateEmotionalState: () => {},
  updateDecisionConfidence: () => {},
  updatePreferences: () => {},
  trackInformationSeeking: () => {},
  updateDecisionFactors: () => {},
  trackDecisionProgress: () => {},
  trackUserBehavior: () => {},
  getDecisionInsights: () => {}
}); 