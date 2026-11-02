// Simple WEAT implementation in Node.js
// WEAT: Word Embedding Association Test

const cosineSimilarity = (a, b) => {
  const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dotProduct / (magA * magB);
};

// Mock embeddings for demonstration purposes
const mockEmbeddings = {
  // Target 1: Science
  science: [0.1, 0.9, 0.2, 0.5],
  technology: [0.2, 0.8, 0.1, 0.6],
  physics: [0.1, 0.9, 0.3, 0.4],
  chemistry: [0.2, 0.8, 0.2, 0.5],
  // Target 2: Arts
  art: [0.8, 0.1, 0.9, 0.2],
  poetry: [0.9, 0.2, 0.8, 0.1],
  dance: [0.7, 0.1, 0.9, 0.3],
  literature: [0.8, 0.2, 0.7, 0.2],
  // Attribute 1: Male
  man: [0.5, 0.5, 0.4, 0.8],
  male: [0.4, 0.6, 0.5, 0.7],
  boy: [0.4, 0.5, 0.6, 0.7],
  brother: [0.3, 0.6, 0.4, 0.8],
  // Attribute 2: Female
  woman: [0.5, 0.5, 0.8, 0.4],
  female: [0.6, 0.4, 0.7, 0.5],
  girl: [0.4, 0.4, 0.9, 0.4],
  sister: [0.5, 0.3, 0.8, 0.5],
};

const getWordVector = (word) => {
  return mockEmbeddings[word.toLowerCase()] || Array.from({ length: 4 }, () => Math.random());
};

const calculateWEAT = (targetsA, targetsB, attributesX, attributesY) => {
  const meanSimilarity = (target, attributes) => {
    return attributes.reduce((sum, attr) => sum + cosineSimilarity(getWordVector(target), getWordVector(attr)), 0) / attributes.length;
  };

  const diffSimilarity = (target, attributesX, attributesY) => {
    return meanSimilarity(target, attributesX) - meanSimilarity(target, attributesY);
  };

  const scoreA = targetsA.reduce((sum, target) => sum + diffSimilarity(target, attributesX, attributesY), 0);
  const scoreB = targetsB.reduce((sum, target) => sum + diffSimilarity(target, attributesX, attributesY), 0);

  // Simplified score: difference in means
  const rawScore = (scoreA / targetsA.length) - (scoreB / targetsB.length);
  return rawScore;
};

module.exports = { calculateWEAT };
