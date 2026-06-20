const badWords = [
  "spam",
  "scam",
  "hack",
  "bitcoin",
  "viagra",
  "casino"
];

function containsBadWords(text) {
  if (typeof text !== "string") return false;

  const lower = text.toLowerCase();
  return badWords.some(word => lower.includes(word));
}


module.exports=containsBadWords;
