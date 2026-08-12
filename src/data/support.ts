export const supportChannels = [
  {
    id: "chat",
    title: "Live chat",
    emoji: "💬",
    detail: "Chat with a helper now",
    meta: "Avg. reply 2 min",
    tint: "bg-mint/30",
    to: "/support/chat",
  },
  {
    id: "ticket",
    title: "Raise a ticket",
    emoji: "🎫",
    detail: "Describe your problem in detail",
    meta: "Answer within 24h",
    tint: "bg-sun/30",
    to: "/support/new",
  },
  {
    id: "tickets",
    title: "My requests",
    emoji: "📬",
    detail: "Track everything you've asked",
    meta: "3 open",
    tint: "bg-sky/30",
    to: "/support/tickets",
  },
] as const;

export const supportTopics = [
  { name: "Account & login", emoji: "🔐", articles: 12 },
  { name: "Courses & lessons", emoji: "📚", articles: 24 },
  { name: "Live classes", emoji: "🎥", articles: 9 },
  { name: "Quizzes & XP", emoji: "🧠", articles: 15 },
  { name: "Certificates", emoji: "📜", articles: 7 },
  { name: "Payments & plans", emoji: "💳", articles: 11 },
];

export const supportFaqs = [
  {
    q: "I forgot my password — how do I get back in?",
    a: "Tap 'Forgot password' on the login screen and we'll email a reset link to your parent's address. The link stays valid for 30 minutes.",
  },
  {
    q: "My live class video won't load. What should I try?",
    a: "Refresh the class page, check your internet, and allow camera/mic permissions. If it still fails, join from the class replay link — replays appear within 15 minutes.",
  },
  {
    q: "Why didn't my quiz XP get added?",
    a: "XP syncs a few seconds after you submit. If your streak or XP looks wrong after 5 minutes, raise a ticket with the quiz name and we'll add it manually.",
  },
  {
    q: "How do I download my certificate?",
    a: "Go to Certificates, open the one you finished, and hit Download PDF. Certificates unlock once every lesson and the final quiz are complete.",
  },
  {
    q: "Can a parent change my learning plan?",
    a: "Yes. Parents can switch plans anytime from Profile → Plan & billing. Progress, badges and XP always carry over.",
  },
];

export type TicketStatus = "Open" | "In progress" | "Waiting on you" | "Resolved";

export const tickets = [
  {
    id: "KZ-2481",
    subject: "Quiz XP missing for Python Syntax Check",
    category: "Quizzes & XP",
    status: "In progress" as TicketStatus,
    priority: "High",
    updated: "10 min ago",
    agent: { name: "Riya", avatar: "🦊" },
    messages: [
      {
        from: "you" as const,
        name: "Emma",
        time: "Today · 9:12 AM",
        body: "I scored 100 on Python Syntax Check but my XP didn't go up and my streak reset.",
      },
      {
        from: "agent" as const,
        name: "Riya",
        time: "Today · 9:20 AM",
        body: "Thanks Emma! I can see the quiz attempt. I'm re-syncing your XP now — it should appear within 10 minutes.",
      },
    ],
  },
  {
    id: "KZ-2477",
    subject: "Can't join Fractions Face-Off live class",
    category: "Live classes",
    status: "Waiting on you" as TicketStatus,
    priority: "Medium",
    updated: "2 hours ago",
    agent: { name: "Sam", avatar: "🐼" },
    messages: [
      {
        from: "you" as const,
        name: "Emma",
        time: "Yesterday · 5:02 PM",
        body: "The join button just spins and nothing happens.",
      },
      {
        from: "agent" as const,
        name: "Sam",
        time: "Today · 7:40 AM",
        body: "Could you tell me which browser and device you're using? A screenshot of the spinner helps too.",
      },
    ],
  },
  {
    id: "KZ-2460",
    subject: "Certificate name spelled wrong",
    category: "Certificates",
    status: "Open" as TicketStatus,
    priority: "Low",
    updated: "1 day ago",
    agent: { name: "Noor", avatar: "🐧" },
    messages: [
      {
        from: "you" as const,
        name: "Emma",
        time: "Mon · 11:15 AM",
        body: "My web design certificate says 'Ema' instead of 'Emma'.",
      },
    ],
  },
  {
    id: "KZ-2402",
    subject: "Switch plan to yearly",
    category: "Payments & plans",
    status: "Resolved" as TicketStatus,
    priority: "Low",
    updated: "5 days ago",
    agent: { name: "Riya", avatar: "🦊" },
    messages: [
      {
        from: "you" as const,
        name: "Emma",
        time: "Last Fri · 3:00 PM",
        body: "Mum wants to move us to the yearly plan.",
      },
      {
        from: "agent" as const,
        name: "Riya",
        time: "Last Fri · 3:26 PM",
        body: "All done — you're on the yearly plan and two months were credited back. 🎉",
      },
    ],
  },
];

export const chatTranscript = [
  {
    from: "agent" as const,
    name: "Riya",
    time: "9:31 AM",
    body: "Hi Emma! 👋 I'm Riya from the Kidzy help crew. What can I help you with today?",
  },
  {
    from: "you" as const,
    name: "Emma",
    time: "9:32 AM",
    body: "My badge for Code Ninja disappeared from my profile.",
  },
  {
    from: "agent" as const,
    name: "Riya",
    time: "9:33 AM",
    body: "Ah, that badge is showing as Silver on our side. Let me refresh your profile cache — give it about a minute.",
  },
  {
    from: "you" as const,
    name: "Emma",
    time: "9:34 AM",
    body: "Thank you! Also, will my streak be safe if I miss tomorrow?",
  },
  {
    from: "agent" as const,
    name: "Riya",
    time: "9:35 AM",
    body: "You have one streak freeze left this month, so yes — one missed day won't break it. 🔥",
  },
];

export const quickReplies = [
  "My XP is missing",
  "Live class won't load",
  "Reset my password",
  "Talk to a human",
];

export const supportContacts = [
  { label: "Email us", value: "help@kidzy.app", emoji: "✉️", note: "Replies within 24 hours" },
  { label: "Parent helpline", value: "+1 (555) 012-9080", emoji: "📞", note: "Mon–Sat, 9am–7pm" },
  { label: "Safety concerns", value: "safety@kidzy.app", emoji: "🛡️", note: "Priority within 2 hours" },
];

export const statusFilters: (TicketStatus | "All")[] = [
  "All",
  "Open",
  "In progress",
  "Waiting on you",
  "Resolved",
];
