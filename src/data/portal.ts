export type Course = {
  id: string;
  title: string;
  teacher: string;
  subject: string;
  emoji: string;
  rating: number;
  students: number;
  lessons: number;
  duration: string;
  age: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  price: "Free" | "Premium";
  tint: string;
  progress?: number;
  nextLesson?: string;
};

export const learner = {
  name: "Emma",
  level: 12,
  xp: 4820,
  xpToNext: 6000,
  coins: 1340,
  streak: 17,
  avatar: "🦊",
};

export const stats = [
  { label: "Courses enrolled", value: "9", emoji: "📚", tint: "bg-primary-soft" },
  { label: "Lessons done", value: "184", emoji: "✅", tint: "bg-mint/25" },
  { label: "Weekly streak", value: "17d", emoji: "🔥", tint: "bg-sun/25" },
  { label: "Learning hours", value: "62h", emoji: "⏱️", tint: "bg-sky/25" },
];

export const continueLearning: Course[] = [
  {
    id: "python-quest",
    title: "Python Quest: Code Your First Game",
    teacher: "Mr. Rivera",
    subject: "Coding",
    emoji: "🐍",
    rating: 4.9,
    students: 12840,
    lessons: 32,
    duration: "6h 20m",
    age: "13-17",
    level: "Beginner",
    price: "Free",
    tint: "bg-mint/25",
    progress: 68,
    nextLesson: "Loops that never quit",
  },
  {
    id: "algebra-arcade",
    title: "Algebra Arcade: Equations Unlocked",
    teacher: "Ms. Chen",
    subject: "Math",
    emoji: "➗",
    rating: 4.7,
    students: 9310,
    lessons: 28,
    duration: "5h 05m",
    age: "12-16",
    level: "Intermediate",
    price: "Free",
    tint: "bg-sky/25",
    progress: 41,
    nextLesson: "Solving for two unknowns",
  },
  {
    id: "story-lab",
    title: "Story Lab: Write Like a Creator",
    teacher: "Ms. Okafor",
    subject: "English",
    emoji: "✍️",
    rating: 4.8,
    students: 7420,
    lessons: 21,
    duration: "3h 40m",
    age: "14-19",
    level: "Beginner",
    price: "Premium",
    tint: "bg-sun/25",
    progress: 87,
    nextLesson: "Plot twists that land",
  },
];

export const popularCourses: Course[] = [
  {
    id: "ai-basics",
    title: "AI for Teens: Build a Smart Chatbot",
    teacher: "Dr. Malhotra",
    subject: "Coding",
    emoji: "🤖",
    rating: 4.9,
    students: 21400,
    lessons: 26,
    duration: "4h 55m",
    age: "14-19",
    level: "Intermediate",
    price: "Premium",
    tint: "bg-primary-soft",
  },
  {
    id: "chem-lab",
    title: "Kitchen Chemistry Experiments",
    teacher: "Mr. Alvarez",
    subject: "Science",
    emoji: "🧪",
    rating: 4.6,
    students: 8890,
    lessons: 18,
    duration: "3h 10m",
    age: "12-16",
    level: "Beginner",
    price: "Free",
    tint: "bg-mint/25",
  },
  {
    id: "beat-maker",
    title: "Beat Maker: Music Production 101",
    teacher: "DJ Nova",
    subject: "Music",
    emoji: "🎧",
    rating: 4.8,
    students: 15320,
    lessons: 24,
    duration: "4h 30m",
    age: "13-19",
    level: "Beginner",
    price: "Premium",
    tint: "bg-sun/25",
  },
  {
    id: "robotics",
    title: "Robotics Club: Sensors & Motors",
    teacher: "Ms. Park",
    subject: "Robotics",
    emoji: "🦾",
    rating: 4.7,
    students: 6210,
    lessons: 30,
    duration: "7h 15m",
    age: "15-19",
    level: "Advanced",
    price: "Premium",
    tint: "bg-sky/25",
  },
  {
    id: "digital-art",
    title: "Digital Art: Character Design",
    teacher: "Ms. Ibarra",
    subject: "Art",
    emoji: "🎨",
    rating: 4.9,
    students: 18760,
    lessons: 22,
    duration: "4h 05m",
    age: "12-18",
    level: "Beginner",
    price: "Free",
    tint: "bg-primary-soft",
  },
  {
    id: "spanish-now",
    title: "Spanish Now: Talk in 30 Days",
    teacher: "Sr. Delgado",
    subject: "Languages",
    emoji: "🌎",
    rating: 4.5,
    students: 10230,
    lessons: 35,
    duration: "6h 45m",
    age: "13-19",
    level: "Beginner",
    price: "Free",
    tint: "bg-mint/25",
  },
];

export const allCourses: Course[] = [...continueLearning, ...popularCourses];

export const subjects = [
  { name: "Math", emoji: "➗", courses: 42, tint: "bg-sky/25" },
  { name: "Science", emoji: "🔬", courses: 38, tint: "bg-mint/25" },
  { name: "English", emoji: "📖", courses: 29, tint: "bg-sun/25" },
  { name: "Coding", emoji: "💻", courses: 51, tint: "bg-primary-soft" },
  { name: "Art", emoji: "🎨", courses: 24, tint: "bg-primary-soft" },
  { name: "Music", emoji: "🎵", courses: 19, tint: "bg-sun/25" },
  { name: "Robotics", emoji: "🦾", courses: 14, tint: "bg-sky/25" },
  { name: "Languages", emoji: "🗣️", courses: 33, tint: "bg-mint/25" },
  { name: "General Knowledge", emoji: "🧠", courses: 27, tint: "bg-primary-soft" },
];

export const learningPath = [
  { level: "Level 1 · Foundations", detail: "Variables, loops, first script", progress: 100 },
  { level: "Level 2 · Builder", detail: "Functions, lists, mini apps", progress: 100 },
  { level: "Level 3 · Creator", detail: "Game logic & sprites", progress: 62 },
  { level: "Final Challenge", detail: "Ship your own arcade game", progress: 0 },
  { level: "Certificate", detail: "Verified Python Creator", progress: 0 },
];

export const dailyChallenges = [
  { task: "Solve 5 math problems", xp: 50, done: true },
  { task: "Complete a reading story", xp: 40, done: true },
  { task: "Watch a science video", xp: 30, done: false },
  { task: "Finish the coding puzzle", xp: 60, done: false },
];

export const liveClasses = [
  { topic: "Fractions Face-Off", teacher: "Ms. Chen", time: "Today · 5:00 PM", countdown: "in 2h" },
  { topic: "Build a Discord Bot", teacher: "Mr. Rivera", time: "Tomorrow · 4:30 PM", countdown: "in 1d" },
  { topic: "Sketching Anime Eyes", teacher: "Ms. Ibarra", time: "Sat · 11:00 AM", countdown: "in 3d" },
];

export const badges = [
  { name: "Streak Star", emoji: "🔥", tier: "Gold", earned: true },
  { name: "Quiz Whiz", emoji: "🧠", tier: "Gold", earned: true },
  { name: "Code Ninja", emoji: "🥷", tier: "Silver", earned: true },
  { name: "Bookworm", emoji: "📚", tier: "Silver", earned: true },
  { name: "Lab Legend", emoji: "🧪", tier: "Bronze", earned: false },
  { name: "Art Icon", emoji: "🎨", tier: "Bronze", earned: false },
  { name: "Polyglot", emoji: "🌍", tier: "Gold", earned: false },
  { name: "Bot Builder", emoji: "🤖", tier: "Silver", earned: false },
];

export const leaderboard = [
  { rank: 1, name: "Zayn", avatar: "🐼", xp: 6120, badge: "Level 15" },
  { rank: 2, name: "Aisha", avatar: "🦄", xp: 5580, badge: "Level 14" },
  { rank: 3, name: "Emma", avatar: "🦊", xp: 4820, badge: "Level 12", you: true },
  { rank: 4, name: "Diego", avatar: "🐯", xp: 4410, badge: "Level 12" },
  { rank: 5, name: "Mei", avatar: "🐧", xp: 3980, badge: "Level 11" },
  { rank: 6, name: "Kofi", avatar: "🦁", xp: 3640, badge: "Level 10" },
  { rank: 7, name: "Luca", avatar: "🐨", xp: 3210, badge: "Level 9" },
];

export const quizzes = [
  { title: "Algebra Speed Round", subject: "Math", questions: 12, minutes: 8, best: 92, emoji: "➗" },
  { title: "Periodic Table Sprint", subject: "Science", questions: 15, minutes: 10, best: 78, emoji: "🧪" },
  { title: "Python Syntax Check", subject: "Coding", questions: 10, minutes: 6, best: 100, emoji: "🐍" },
  { title: "Grammar Glow-Up", subject: "English", questions: 14, minutes: 9, best: null, emoji: "📖" },
  { title: "World Capitals Blitz", subject: "GK", questions: 20, minutes: 12, best: 65, emoji: "🌍" },
  { title: "Music Theory Basics", subject: "Music", questions: 10, minutes: 7, best: null, emoji: "🎵" },
];

export const certificates = [
  { title: "Scratch Game Designer", date: "Mar 2026", grade: "A+" },
  { title: "Intro to Web Design", date: "Jan 2026", grade: "A" },
  { title: "Creative Writing Level 1", date: "Nov 2025", grade: "A" },
];
