const badWords = [
  "spam",
  "scam",
  "hack",
  "bitcoin",
  "viagra",
  "casino"
];

function containsBadWords(text = "") {
  const lower = text.toLowerCase();
  return badWords.some(word => lower.includes(word));
}

module.exports=containsBadWords;
