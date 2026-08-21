// src/utils/dummyChartData.js

// Shared standard color palette matching Zabe tokens
export const CHART_COLORS = {
  primary: '#005fb0',   // brand blue
  secondary: '#ff5a1f', // brand orange
  tertiary: '#12B76A',  // emerald
  quaternary: '#8B5CF6',// purple
  quinary: '#F59E0B',   // amber
  neutral: '#9CA3AF',   // gray
};

const generateRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const getVoteTrendsData = () => {
  const data = [];
  const startHour = 8;
  let candidateA = 10000;
  let candidateB = 9500;
  for (let i = 0; i < 8; i++) {
    candidateA += generateRandomInt(1000, 5000);
    candidateB += generateRandomInt(1200, 4800);
    data.push({
      time: `${startHour + i}:00`,
      CandidateA: candidateA,
      CandidateB: candidateB,
    });
  }
  return data;
};

export const getTurnoutByRegionData = () => {
  return [
    { name: 'North West', turnout: generateRandomInt(40000, 80000) },
    { name: 'South West', turnout: generateRandomInt(35000, 75000) },
    { name: 'North Central', turnout: generateRandomInt(30000, 60000) },
    { name: 'South South', turnout: generateRandomInt(25000, 55000) },
    { name: 'North East', turnout: generateRandomInt(20000, 50000) },
  ].sort((a, b) => b.turnout - a.turnout);
};

export const getWinProbabilityData = () => {
  const winPct = generateRandomInt(45, 65);
  return [
    { name: 'Win', value: winPct, fill: CHART_COLORS.primary },
    { name: 'Remaining', value: 100 - winPct, fill: '#E5E7EB' },
  ];
};

export const getSentimentAnalysisData = () => {
  return [
    { name: 'Positive', value: generateRandomInt(40, 60), fill: CHART_COLORS.tertiary },
    { name: 'Neutral', value: generateRandomInt(20, 30), fill: CHART_COLORS.neutral },
    { name: 'Negative', value: generateRandomInt(10, 25), fill: '#EF4444' }, // Red for negative
  ];
};

export const getPollingUnitIssuesData = () => {
  return [
    { name: 'BVAS Failure', count: generateRandomInt(200, 500) },
    { name: 'Late Arrival', count: generateRandomInt(150, 400) },
    { name: 'Violence', count: generateRandomInt(50, 150) },
    { name: 'Missing Materials', count: generateRandomInt(100, 300) },
  ].sort((a, b) => b.count - a.count);
};
