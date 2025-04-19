import React, { createContext, useState, useEffect } from 'react';

export const DecisionContext = createContext();

export const DecisionProvider = ({ children }) => {
  const [decisionState, setDecisionState] = useState({
    cognitiveLoad: 0,
    emotionalState: 'neutral',
    decisionConfidence: 0,
    informationSeeking: [],
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
    userBehavior: []
  });

  const updateCognitiveLoad = (increment) => {
    setDecisionState(prev => ({
      ...prev,
      cognitiveLoad: Math.min(Math.max(prev.cognitiveLoad + increment, 0), 1)
    }));
  };

  const updateEmotionalState = (state) => {
    setDecisionState(prev => ({
      ...prev,
      emotionalState: state
    }));
  };

  const updateDecisionConfidence = (increment) => {
    setDecisionState(prev => ({
      ...prev,
      decisionConfidence: Math.min(Math.max(prev.decisionConfidence + increment, 0), 1)
    }));
  };

  const trackInformationSeeking = (data) => {
    setDecisionState(prev => ({
      ...prev,
      informationSeeking: [...prev.informationSeeking, {
        ...data,
        timestamp: Date.now()
      }]
    }));
  };

  const updateDecisionFactors = (factors) => {
    setDecisionState(prev => ({
      ...prev,
      decisionFactors: {
        ...prev.decisionFactors,
        ...factors
      }
    }));
  };

  const trackDecisionProgress = (progress) => {
    setDecisionState(prev => ({
      ...prev,
      decisionProgress: {
        ...prev.decisionProgress,
        ...progress
      }
    }));
  };

  const trackUserBehavior = (behavior) => {
    setDecisionState(prev => ({
      ...prev,
      userBehavior: [...prev.userBehavior, {
        ...behavior,
        timestamp: Date.now()
      }]
    }));
  };

  // Analyze decision-making patterns
  useEffect(() => {
    const analyzeDecisionMaking = () => {
      const { userBehavior, informationSeeking, decisionProgress } = decisionState;
      
      // Calculate engagement score
      const engagementScore = calculateEngagementScore(userBehavior);
      
      // Analyze information seeking patterns
      const seekingPatterns = analyzeInformationSeeking(informationSeeking);
      
      // Evaluate decision progress
      const progressMetrics = evaluateProgress(decisionProgress);
      
      // Update cognitive load based on analysis
      const newCognitiveLoad = calculateCognitiveLoad(
        engagementScore,
        seekingPatterns,
        progressMetrics
      );
      
      updateCognitiveLoad(newCognitiveLoad - decisionState.cognitiveLoad);
    };

    const analysisInterval = setInterval(analyzeDecisionMaking, 5000);
    return () => clearInterval(analysisInterval);
  }, [decisionState]);

  // Helper functions for decision analysis
  const calculateEngagementScore = (behavior) => {
    const recentBehavior = behavior.filter(
      b => Date.now() - b.timestamp < 300000 // Last 5 minutes
    );
    
    return Math.min(recentBehavior.length / 20, 1);
  };

  const analyzeInformationSeeking = (seeking) => {
    const recentSeeking = seeking.filter(
      s => Date.now() - s.timestamp < 600000 // Last 10 minutes
    );
    
    return {
      intensity: recentSeeking.length / 30,
      depth: Math.max(...recentSeeking.map(s => s.scrollDepth || 0))
    };
  };

  const evaluateProgress = (progress) => {
    const { alternativesConsidered, comparisonsMade, criteriaEvaluated } = progress;
    
    return {
      completeness: (
        (alternativesConsidered / 3) +
        (comparisonsMade / 5) +
        (criteriaEvaluated / 5)
      ) / 3,
      quality: Math.min(
        (alternativesConsidered * comparisonsMade * criteriaEvaluated) / 50,
        1
      )
    };
  };

  const calculateCognitiveLoad = (engagement, seeking, progress) => {
    return (
      (engagement * 0.3) +
      (seeking.intensity * 0.3) +
      (progress.completeness * 0.2) +
      (progress.quality * 0.2)
    );
  };

  return (
    <DecisionContext.Provider
      value={{
        decisionState,
        updateCognitiveLoad,
        updateEmotionalState,
        updateDecisionConfidence,
        trackInformationSeeking,
        updateDecisionFactors,
        trackDecisionProgress,
        trackUserBehavior
      }}
    >
      {children}
    </DecisionContext.Provider>
  );
}; 