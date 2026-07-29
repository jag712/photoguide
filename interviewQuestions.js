const CATEGORY_LABELS = {
  structure: "장비 · 카메라 구조",
  exposure: "노출 · 측광",
  lens: "렌즈 · 광학",
  digital: "디지털 워크플로우",
  film: "필름 · 암실",
  lighting: "조명 · 촬영 기술",
  history: "사진사 · 이론",
};

const DEFAULT_CATEGORY_LABEL = "사진 면접";

function resolvePhotographyData() {
  if (typeof photographyData !== "undefined") {
    return photographyData;
  }
  if (typeof window !== "undefined" && window.photographyData) {
    return window.photographyData;
  }
  if (typeof require === "function") {
    try {
      return require("./photographyData.js");
    } catch (error) {
      return null;
    }
  }
  return null;
}

function cleanText(value) {
  if (!value || typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim();
}

function stripStars(text) {
  return cleanText(text).replace(/[★☆]+/g, "").trim();
}

function extractHighlight(description, limit = 120) {
  const cleaned = stripStars(description || "");
  if (!cleaned) return "";
  const sentences = cleaned
    .replace(/([.?!])\s+/g, "$1|")
    .split("|")
    .map((sentence) => sentence.trim())
    .filter(Boolean);
  const firstSentence = sentences.length ? sentences[0] : cleaned;
  if (firstSentence.length <= limit) {
    return firstSentence;
  }
  return `${firstSentence.slice(0, limit - 1).trim()}…`;
}

function countStars(description) {
  if (typeof description !== "string") return 0;
  const matches = description.match(/★/g);
  return matches ? matches.length : 0;
}

function getDifficultyLabel(starCount) {
  if (starCount >= 3) return "심화";
  if (starCount === 2) return "중간";
  return "기초";
}

function createConceptQuestions(concept) {
  const highlight = concept.highlight
    ? ` 자료에는 \"${concept.highlight}\"라고 정리되어 있습니다.`
    : "";
  return [
    {
      category: `${concept.categoryLabel} · 개념 정리`,
      question: `‘${concept.term}’에 대해${highlight} 면접 상황에서 핵심만 1분 이내로 설명해 보세요.`,
    },
    {
      category: `${concept.categoryLabel} · 적용`,
      question: `‘${concept.term}’이(가) 필요한 촬영 사례를 하나 선택하고, 어떤 설정과 판단으로 활용할지 구체적으로 말해 주세요.`,
    },
    {
      category: `${concept.categoryLabel} · 심화`,
      question: `${concept.difficultyLabel} 수준 개념으로 분류된 ‘${concept.term}’을 초보자에게 가르친다면 어떤 순서로 설명하겠습니까?`,
    },
  ];
}

function createComparisonQuestions(groupedConcepts) {
  const comparisons = [];
  Object.values(groupedConcepts).forEach((concepts) => {
    if (!Array.isArray(concepts) || concepts.length < 2) return;
    const limited = concepts.slice(0, Math.min(concepts.length, 6));
    for (let i = 0; i < limited.length - 1; i += 1) {
      const current = limited[i];
      const next = limited[i + 1];
      comparisons.push({
        category: `${current.categoryLabel} · 비교`,
        question: `‘${current.term}’과(와) ‘${next.term}’의 차이점과 각각이 적합한 촬영 상황을 설명해 보세요.`,
      });
    }
  });
  return comparisons;
}

function pushUniqueQuestion(list, seen, item) {
  if (!item || typeof item.question !== "string") return;
  const question = item.question.replace(/\s+/g, " ").trim();
  if (!question) return;
  if (seen.has(question)) return;
  seen.add(question);
  list.push({
    category: item.category || DEFAULT_CATEGORY_LABEL,
    question,
  });
}

function buildConceptsFromData(dataSource) {
  if (!dataSource || typeof dataSource !== "object") return [];
  const entries = Object.entries(dataSource).filter(([, items]) => Array.isArray(items));
  const concepts = [];
  entries.forEach(([categoryKey, items]) => {
    const categoryLabel = CATEGORY_LABELS[categoryKey] || DEFAULT_CATEGORY_LABEL;
    items.forEach((item, index) => {
      const term = cleanText(item && (item.q || item.term || item.question));
      const description = cleanText(item && (item.a || item.answer || item.description));
      if (!term) return;
      const highlight = extractHighlight(item && (item.a || item.answer || ""));
      const stars = countStars(item && (item.a || item.answer || ""));
      concepts.push({
        id: `${categoryKey}-${index}-${term.toLowerCase()}`,
        categoryKey,
        categoryLabel,
        term,
        description,
        highlight,
        stars,
        difficultyLabel: getDifficultyLabel(stars),
      });
    });
  });
  return concepts;
}

function generateInterviewQuestionBank() {
  const dataSource = resolvePhotographyData();
  const concepts = buildConceptsFromData(dataSource);
  if (!concepts.length) {
    return [];
  }
  const groupedByCategory = concepts.reduce((acc, concept) => {
    (acc[concept.categoryLabel] = acc[concept.categoryLabel] || []).push(concept);
    return acc;
  }, {});

  const questions = [];
  const seen = new Set();

  concepts.forEach((concept) => {
    createConceptQuestions(concept).forEach((question) => {
      pushUniqueQuestion(questions, seen, question);
    });
  });

  createComparisonQuestions(groupedByCategory).forEach((question) => {
    pushUniqueQuestion(questions, seen, question);
  });

  return questions;
}

const interviewQuestionBank = generateInterviewQuestionBank();

if (typeof window !== "undefined") {
  window.interviewQuestionBank = interviewQuestionBank;
  window.interviewQuestions = interviewQuestionBank;
}

if (typeof module !== "undefined") {
  module.exports = interviewQuestionBank;
}
