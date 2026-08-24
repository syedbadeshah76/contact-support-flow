export type QuizQuestion = {
  prompt: string;
  options: string[];
  answer: number;
};

export const quizQuestions: Record<string, QuizQuestion[]> = {
  "Algebra Speed Round": [
    { prompt: "Solve: 3x = 12", options: ["x = 3", "x = 4", "x = 6", "x = 9"], answer: 1 },
    { prompt: "Simplify: 2(x + 5)", options: ["2x + 5", "2x + 10", "x + 10", "2x"], answer: 1 },
    { prompt: "If y = 2x + 1 and x = 3, y = ?", options: ["5", "6", "7", "8"], answer: 2 },
  ],
  "Periodic Table Sprint": [
    { prompt: "Symbol for sodium?", options: ["So", "Na", "Sd", "Nm"], answer: 1 },
    { prompt: "Which gas do plants absorb?", options: ["Oxygen", "Nitrogen", "CO₂", "Helium"], answer: 2 },
    { prompt: "Atomic number of carbon?", options: ["4", "6", "8", "12"], answer: 1 },
  ],
  "Python Syntax Check": [
    { prompt: "Which prints text?", options: ["echo()", "print()", "say()", "log()"], answer: 1 },
    { prompt: "How do you start a loop over a list?", options: ["for i in list:", "loop list:", "each list", "while list"], answer: 0 },
    { prompt: "Which is a list?", options: ["(1, 2)", "{1: 2}", "[1, 2]", "\"1,2\""], answer: 2 },
  ],
  "Grammar Glow-Up": [
    { prompt: "Pick the correct one.", options: ["Their going home", "They're going home", "There going home", "Theyre going home"], answer: 1 },
    { prompt: "Which word is an adverb?", options: ["quick", "quickly", "quickness", "quicken"], answer: 1 },
    { prompt: "Plural of 'child'?", options: ["childs", "childrens", "children", "childes"], answer: 2 },
  ],
  "World Capitals Blitz": [
    { prompt: "Capital of Japan?", options: ["Osaka", "Kyoto", "Tokyo", "Nagoya"], answer: 2 },
    { prompt: "Capital of Brazil?", options: ["Rio de Janeiro", "Brasília", "São Paulo", "Salvador"], answer: 1 },
    { prompt: "Capital of Canada?", options: ["Toronto", "Vancouver", "Ottawa", "Montreal"], answer: 2 },
  ],
  "Music Theory Basics": [
    { prompt: "How many beats in a half note?", options: ["1", "2", "3", "4"], answer: 1 },
    { prompt: "Notes in a major triad?", options: ["2", "3", "4", "5"], answer: 1 },
    { prompt: "Which clef is for higher notes?", options: ["Bass", "Treble", "Alto", "Tenor"], answer: 1 },
  ],
};

export const fallbackQuestions: QuizQuestion[] = [
  { prompt: "Ready to learn something new today?", options: ["Yes!", "Definitely", "Always", "All of these"], answer: 3 },
];
