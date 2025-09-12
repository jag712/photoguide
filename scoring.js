const synonyms = {
    photograph: ['photo', 'picture', 'image'],
    camera: ['cam'],
    autofocus: ['af', 'auto-focus']
};

function normalize(str) {
    return str
        .toLowerCase()
        .trim()
        .replace(/[^\p{L}\p{N}\s]/gu, '');
}

function applySynonyms(words) {
    return words.map(word => {
        for (const [canonical, list] of Object.entries(synonyms)) {
            if (word === canonical || list.includes(word)) {
                return canonical;
            }
        }
        return word;
    });
}

function levenshtein(a, b) {
    const alen = a.length;
    const blen = b.length;
    const dp = Array.from({ length: alen + 1 }, () => new Array(blen + 1).fill(0));
    for (let i = 0; i <= alen; i++) dp[i][0] = i;
    for (let j = 0; j <= blen; j++) dp[0][j] = j;
    for (let i = 1; i <= alen; i++) {
        for (let j = 1; j <= blen; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            dp[i][j] = Math.min(
                dp[i - 1][j] + 1,
                dp[i][j - 1] + 1,
                dp[i - 1][j - 1] + cost
            );
        }
    }
    return dp[alen][blen];
}

function calculateScore(userAnswer, correctAnswer) {
    const userNorm = applySynonyms(normalize(userAnswer).split(/\s+/)).join(' ');
    const correctNorm = applySynonyms(normalize(correctAnswer).split(/\s+/)).join(' ');
    const distance = levenshtein(userNorm, correctNorm);
    const maxLen = Math.max(userNorm.length, correctNorm.length);
    const similarity = maxLen === 0 ? 0 : 1 - distance / maxLen;
    return similarity >= 0.9
        ? 5
        : similarity >= 0.75
        ? 4
        : similarity >= 0.5
        ? 3
        : similarity >= 0.25
        ? 2
        : 1;
}

function getPracticeMessage(percentage) {
    if (percentage >= 90) return "대단해요!";
    if (percentage >= 70) return "좋은 성과예요!";
    if (percentage >= 50) return "조금만 더 힘내요!";
    return "시작이 반이에요!";
}

if (typeof module !== 'undefined') {
    module.exports = { calculateScore, getPracticeMessage };
}

if (typeof window !== 'undefined') {
    window.calculateScore = calculateScore;
    window.getPracticeMessage = getPracticeMessage;
}
