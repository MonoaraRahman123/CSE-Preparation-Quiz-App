import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const curriculumRaw = fs.readFileSync(path.join(__dirname, "curriculum.json"), "utf8");
export const curriculumData = JSON.parse(curriculumRaw);

// Extract flat courses list
export const allCourses = [];
curriculumData.forEach(term => {
  term.courses.forEach(c => {
    allCourses.push({
      ...c,
      year: term.year,
      term: term.term,
      termTitle: term.title
    });
  });
});

export const demoUsers = [
  {
    _id: "u_student_1",
    fullName: "MD. Tanvir Hasan",
    studentId: "200615",
    email: "tanvir.cse@pust.ac.bd",
    password: "$2a$10$demohashedpassword123456789", // plain is password123
    department: "Computer Science and Engineering",
    year: 3,
    term: 2,
    role: "student",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    points: 1245,
    streak: 7,
    preferences: {
      darkMode: false,
      notifications: true,
      favoriteCourses: ["CSE 3203", "CSE 3205", "CSE 2101"]
    }
  },
  {
    _id: "u_admin_1",
    fullName: "Prof. Dr. Kamrul Hasan",
    studentId: "FACULTY_001",
    email: "admin.cse@pust.ac.bd",
    password: "$2a$10$demohashedpasswordadmin1234", // plain is adminpassword
    department: "Computer Science and Engineering",
    year: 4,
    term: 2,
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    points: 5000,
    streak: 30,
    preferences: {
      darkMode: false,
      notifications: true,
      favoriteCourses: []
    }
  }
];

export const demoQuestions = [
  // CSE 3203 - Operating Systems
  {
    _id: "q_os_1",
    courseCode: "CSE 3203",
    courseTitle: "Operating Systems",
    topic: "CPU Scheduling Algorithms (FCFS, SJF, RR, Priority)",
    question: "Which of the following CPU scheduling algorithms is guaranteed to provide the minimum average waiting time for a given set of processes?",
    questionType: "MCQ",
    options: [
      "First-Come, First-Served (FCFS)",
      "Shortest Job First (SJF / SRTF)",
      "Round Robin (RR) with small quantum",
      "Multilevel Feedback Queue"
    ],
    correctAnswer: "Shortest Job First (SJF / SRTF)",
    explanation: "Shortest Job First (SJF) is provably optimal in terms of minimizing the average waiting time because scheduling a short process before a long process reduces the waiting time of the short process more than it increases that of the long process.",
    difficulty: "Medium",
    marks: 1
  },
  {
    _id: "q_os_2",
    courseCode: "CSE 3203",
    courseTitle: "Operating Systems",
    topic: "Deadlocks: Necessary Conditions, Banker's Algorithm & Recovery",
    question: "Which of the following conditions is NOT one of Coffman's four necessary conditions for a deadlock to occur?",
    questionType: "MCQ",
    options: [
      "Mutual Exclusion",
      "Hold and Wait",
      "Preemption Allowed",
      "Circular Wait"
    ],
    correctAnswer: "Preemption Allowed",
    explanation: "The condition required for a deadlock is 'No Preemption' (resources cannot be preempted forcibly). If preemption is allowed, deadlocks can easily be broken.",
    difficulty: "Easy",
    marks: 1
  },
  {
    _id: "q_os_3",
    courseCode: "CSE 3203",
    courseTitle: "Operating Systems",
    topic: "Process Synchronization, Critical Section, Semaphores & Monitors",
    question: "A binary semaphore initialized to 1 behaves identically to a Mutex lock.",
    questionType: "True/False",
    options: ["True", "False"],
    correctAnswer: "True",
    explanation: "True. A binary semaphore has only two states: 0 and 1, functioning as a mutual exclusion lock (mutex) to guard a critical section.",
    difficulty: "Easy",
    marks: 1
  },
  {
    _id: "q_os_4",
    courseCode: "CSE 3203",
    courseTitle: "Operating Systems",
    topic: "Memory Management: Paging, Page Tables, TLB & Segmentation",
    question: "Which of the following phenomena occurs when excessive paging activity causes the CPU to spend more time swapping pages in and out than executing instructions?",
    questionType: "MCQ",
    options: [
      "Segmentation Fault",
      "Thrashing",
      "Belady's Anomaly",
      "Internal Fragmentation"
    ],
    correctAnswer: "Thrashing",
    explanation: "Thrashing occurs when the system is starved of memory pages and spends virtually all of its time servicing page faults and moving blocks between RAM and swap storage.",
    difficulty: "Medium",
    marks: 1
  },
  {
    _id: "q_os_5",
    courseCode: "CSE 3203",
    courseTitle: "Operating Systems",
    topic: "Process Management, PCB & Context Switching",
    question: "Select all pieces of state stored within a Process Control Block (PCB):",
    questionType: "Multiple Select",
    options: [
      "Program Counter (PC)",
      "CPU Registers & Flags",
      "Process State (Ready/Running/Waiting)",
      "Entire Hard Disk Master Boot Record"
    ],
    correctAnswer: [
      "Program Counter (PC)",
      "CPU Registers & Flags",
      "Process State (Ready/Running/Waiting)"
    ],
    explanation: "A PCB stores the process identifier, state, program counter, CPU registers, CPU scheduling info, and memory-management pointers. The MBR is part of physical disk storage, not individual process state.",
    difficulty: "Hard",
    marks: 2
  },

  // CSE 2101 - Data Structures
  {
    _id: "q_ds_1",
    courseCode: "CSE 2101",
    courseTitle: "Data Structures",
    topic: "Binary Trees, Binary Search Trees (BST) & AVL Balancing",
    question: "What is the worst-case time complexity of searching for an element in an unbalanced Binary Search Tree of n nodes?",
    questionType: "MCQ",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    correctAnswer: "O(n)",
    explanation: "When elements are inserted in already sorted order, a standard BST degenerates into a skewed linear linked list with height n, leading to O(n) search time.",
    difficulty: "Medium",
    marks: 1
  },
  {
    _id: "q_ds_2",
    courseCode: "CSE 2101",
    courseTitle: "Data Structures",
    topic: "Arrays, Stacks, Queues & Circular Queues",
    question: "Which data structure is primarily used to evaluate postfix arithmetic expressions and check for balanced parentheses?",
    questionType: "MCQ",
    options: ["Queue", "Stack", "Priority Queue", "Circular Linked List"],
    correctAnswer: "Stack",
    explanation: "A Stack's LIFO (Last-In First-Out) characteristic matches the nested parsing required for brackets and postfix operand evaluation.",
    difficulty: "Easy",
    marks: 1
  },
  {
    _id: "q_ds_3",
    courseCode: "CSE 2101",
    courseTitle: "Data Structures",
    topic: "Graph Representation, BFS & DFS Traversal",
    question: "Breadth-First Search (BFS) in an unweighted graph guarantees finding the shortest path in terms of number of edges.",
    questionType: "True/False",
    options: ["True", "False"],
    correctAnswer: "True",
    explanation: "True. Because BFS explores nodes level by level (edge distance 1, then 2, etc.), the first time a target vertex is reached is along the shortest path.",
    difficulty: "Easy",
    marks: 1
  },
  {
    _id: "q_ds_4",
    courseCode: "CSE 2101",
    courseTitle: "Data Structures",
    topic: "Hashing, Hash Functions & Collision Resolution",
    question: "Which of the following techniques is used for open addressing collision resolution in Hash Tables?",
    questionType: "MCQ",
    options: [
      "Linear Probing",
      "Separate Chaining",
      "AVL Tree balancing",
      "Depth-First Search"
    ],
    correctAnswer: "Linear Probing",
    explanation: "Linear probing, quadratic probing, and double hashing are open addressing strategies where collisions are resolved by searching for the next empty bucket in the table itself.",
    difficulty: "Medium",
    marks: 1
  },

  // CSE 2201 - Algorithms
  {
    _id: "q_algo_1",
    courseCode: "CSE 2201",
    courseTitle: "Algorithms",
    topic: "Divide and Conquer (MergeSort, QuickSort, Closest Pair)",
    question: "What is the tight worst-case time complexity of QuickSort when the pivot is always chosen as the minimum or maximum element?",
    questionType: "MCQ",
    options: ["O(n log n)", "O(n²)", "O(n)", "O(2^n)"],
    correctAnswer: "O(n²)",
    explanation: "When partitions are maximally unbalanced (0 and n-1 elements), the recurrence becomes T(n) = T(n-1) + O(n), which solves to O(n²).",
    difficulty: "Medium",
    marks: 1
  },
  {
    _id: "q_algo_2",
    courseCode: "CSE 2201",
    courseTitle: "Algorithms",
    topic: "Shortest Paths: Dijkstra, Bellman-Ford, Floyd-Warshall",
    question: "Dijkstra's algorithm works correctly even if the graph contains edges with negative weights, as long as there are no negative cycles.",
    questionType: "True/False",
    options: ["True", "False"],
    correctAnswer: "False",
    explanation: "False. Dijkstra's greedy property fails with negative edge weights. Bellman-Ford or Johnson's algorithm must be used instead.",
    difficulty: "Medium",
    marks: 1
  },
  {
    _id: "q_algo_3",
    courseCode: "CSE 2201",
    courseTitle: "Algorithms",
    topic: "Dynamic Programming (0/1 Knapsack, LCS, Matrix Chain)",
    question: "What are the two foundational properties a problem must possess to be effectively solved by Dynamic Programming?",
    questionType: "Multiple Select",
    options: [
      "Optimal Substructure",
      "Overlapping Subproblems",
      "Strict Linearity",
      "NP-Completeness"
    ],
    correctAnswer: ["Optimal Substructure", "Overlapping Subproblems"],
    explanation: "Optimal substructure means optimal solution of the problem contains optimal solutions to subproblems. Overlapping subproblems allows memoization/tabulation without recomputation.",
    difficulty: "Hard",
    marks: 2
  },

  // CSE 3107 - DBMS
  {
    _id: "q_dbms_1",
    courseCode: "CSE 3107",
    courseTitle: "Database Management Systems",
    topic: "Functional Dependencies & Normalization (1NF to BCNF)",
    question: "A relation is in Boyce-Codd Normal Form (BCNF) if and only if for every non-trivial functional dependency X -> Y:",
    questionType: "MCQ",
    options: [
      "Y is a prime attribute",
      "X is a superkey",
      "X is a foreign key",
      "There are no transitive dependencies"
    ],
    correctAnswer: "X is a superkey",
    explanation: "BCNF strictly requires the determinant X of any non-trivial functional dependency X -> Y to be a superkey of the table.",
    difficulty: "Hard",
    marks: 1
  },
  {
    _id: "q_dbms_2",
    courseCode: "CSE 3107",
    courseTitle: "Database Management Systems",
    topic: "Transaction Processing, ACID Properties & Concurrency Control",
    question: "Which ACID property guarantees that all operations within a database transaction either complete fully or have no effect at all?",
    questionType: "MCQ",
    options: ["Atomicity", "Consistency", "Isolation", "Durability"],
    correctAnswer: "Atomicity",
    explanation: "Atomicity ensures the 'all-or-nothing' execution guarantee through commit and rollback protocols.",
    difficulty: "Easy",
    marks: 1
  },

  // CSE 1103 - Structured Programming Language
  {
    _id: "q_c_1",
    courseCode: "CSE 1103",
    courseTitle: "Structured Programming Language",
    topic: "Pointers, Pointer Arithmetic & Dynamic Memory (malloc/free)",
    question: "In C, if ptr is an integer pointer pointing to address 2000 on a 64-bit system where sizeof(int) == 4, what is the value of (ptr + 2)?",
    questionType: "MCQ",
    options: ["2002", "2004", "2008", "2016"],
    correctAnswer: "2008",
    explanation: "Pointer arithmetic scales by the size of the referenced type. Address = 2000 + (2 * 4 bytes) = 2008.",
    difficulty: "Medium",
    marks: 1
  },

  // CSE 4201 - Computer Networks
  {
    _id: "q_net_1",
    courseCode: "CSE 4201",
    courseTitle: "Computer Networks",
    topic: "Network Models: OSI 7-Layer Reference Model & TCP/IP Stack",
    question: "Which layer of the OSI model is responsible for end-to-end process-to-process communication, port addressing, and congestion control?",
    questionType: "MCQ",
    options: ["Network Layer", "Transport Layer", "Data Link Layer", "Session Layer"],
    correctAnswer: "Transport Layer",
    explanation: "The Transport Layer (Layer 4) provides logical process-to-process communication, port assignment, flow control, and reliability (e.g. TCP).",
    difficulty: "Easy",
    marks: 1
  }
];

export const demoStudyMaterials = [
  {
    _id: "mat_os_1",
    title: "Operating Systems Lecture Slides: CPU Scheduling & Process Control",
    courseCode: "CSE 3203",
    courseTitle: "Operating Systems",
    year: 3,
    term: 2,
    category: "Lecture Slides",
    fileType: "PDF",
    fileSize: "4.8 MB",
    downloadUrl: "#",
    description: "Detailed course presentation covering FCFS, SJF, Round Robin, Multilevel Feedback, and context switching timing diagrams.",
    uploadedBy: "Dept of CSE, PUST",
    pages: 58
  },
  {
    _id: "mat_os_2",
    title: "Operating Systems Comprehensive Lecture Notes: Deadlock & Memory Management",
    courseCode: "CSE 3203",
    courseTitle: "Operating Systems",
    year: 3,
    term: 2,
    category: "Course Notes",
    fileType: "PDF",
    fileSize: "3.2 MB",
    downloadUrl: "#",
    description: "In-depth handwritten and digitized notes on Banker's algorithm, resource allocation graphs, TLB caching, and paging schemes.",
    uploadedBy: "Prof. CSE Coordinator",
    pages: 44
  },
  {
    _id: "mat_os_3",
    title: "PUST Previous Year Term Final Question Bank (2018-2023)",
    courseCode: "CSE 3203",
    courseTitle: "Operating Systems",
    year: 3,
    term: 2,
    category: "Previous Questions",
    fileType: "PDF",
    fileSize: "2.1 MB",
    downloadUrl: "#",
    description: "Collection of term final exam papers with mark distribution and sample solution guidelines.",
    uploadedBy: "CSE Academic Committee",
    pages: 28
  },
  {
    _id: "mat_os_4",
    title: "Operating Systems Lab Manual & Sessional Guide",
    courseCode: "CSE 3204",
    courseTitle: "Operating Systems Sessional",
    year: 3,
    term: 2,
    category: "Lab Materials",
    fileType: "PDF",
    fileSize: "5.5 MB",
    downloadUrl: "#",
    description: "Linux system calls (fork, exec, wait, pipe), POSIX threads (pthread), semaphores, and shell scripting lab experiments.",
    uploadedBy: "Lab Instructor",
    pages: 62
  },
  {
    _id: "mat_ds_1",
    title: "Data Structures Handouts: Trees, AVL Rotations & Heaps",
    courseCode: "CSE 2101",
    courseTitle: "Data Structures",
    year: 2,
    term: 1,
    category: "Course Notes",
    fileType: "PDF",
    fileSize: "6.1 MB",
    downloadUrl: "#",
    description: "Visual proofs and step-by-step tree rebalancing diagrams for AVL LL, RR, LR, and RL rotations.",
    uploadedBy: "Dept of CSE, PUST",
    pages: 72
  },
  {
    _id: "mat_c_1",
    title: "C Programming Language Sessional Practice Manual",
    courseCode: "CSE 1104",
    courseTitle: "Structured Programming Language Sessional I",
    year: 1,
    term: 1,
    category: "Lab Materials",
    fileType: "PDF",
    fileSize: "3.9 MB",
    downloadUrl: "#",
    description: "60 progressive programming assignments ranging from fundamental loops to dynamic data structures.",
    uploadedBy: "Dept of CSE, PUST",
    pages: 50
  }
];

export const demoLeaderboard = [
  {
    rank: 1,
    studentName: "Sadia Afrin",
    studentId: "200601",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    points: 1890,
    quizzesCompleted: 42,
    averageScore: 94.2,
    badges: ["Quiz Master", "Top Performer", "30-Day Streak", "Course Champion"],
    year: 3,
    term: 2
  },
  {
    rank: 2,
    studentName: "Nahidul Islam",
    studentId: "200608",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    points: 1740,
    quizzesCompleted: 38,
    averageScore: 91.5,
    badges: ["Top Performer", "Consistent Learner", "7-Day Streak"],
    year: 3,
    term: 2
  },
  {
    rank: 3,
    studentName: "Fariha Tasnim",
    studentId: "200619",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80",
    points: 1610,
    quizzesCompleted: 35,
    averageScore: 88.0,
    badges: ["Quiz Master", "7-Day Streak"],
    year: 3,
    term: 2
  },
  {
    rank: 4,
    studentName: "Rafiul Alam",
    studentId: "200627",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    points: 1450,
    quizzesCompleted: 31,
    averageScore: 86.4,
    badges: ["Consistent Learner"],
    year: 3,
    term: 2
  },
  {
    rank: 5,
    studentName: "MD. Tanvir Hasan (You)",
    studentId: "200615",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    points: 1245,
    quizzesCompleted: 24,
    averageScore: 82.5,
    badges: ["Consistent Learner", "7-Day Streak"],
    year: 3,
    term: 2,
    isCurrentStudent: true
  },
  {
    rank: 6,
    studentName: "Ashikur Rahman",
    studentId: "200633",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    points: 1120,
    quizzesCompleted: 22,
    averageScore: 79.8,
    badges: ["7-Day Streak"],
    year: 3,
    term: 2
  }
];

export const demoNotifications = [
  {
    _id: "notif_1",
    title: "New Quiz Available",
    message: "A new practice quiz for 'Process Synchronization & Semaphores' in Operating Systems has been published.",
    type: "quiz",
    link: "/quiz",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 45) // 45 min ago
  },
  {
    _id: "notif_2",
    title: "Performance Milestone! 🎯",
    message: "You completed 5 quizzes this week! Your average score improved by 12%. Keep going!",
    type: "success",
    link: "/progress",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3) // 3 hrs ago
  },
  {
    _id: "notif_3",
    title: "Study Material Uploaded",
    message: "Dr. Kamrul Hasan uploaded 'Previous 5 Years Question Bank with Hints' for Operating Systems.",
    type: "material",
    link: "/materials",
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 day ago
  },
  {
    _id: "notif_4",
    title: "Recommended Revision",
    message: "Your score in 'Process Scheduling Algorithms' is below your 82% average. Revise this topic with the AI Assistant.",
    type: "warning",
    link: "/ai",
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48) // 2 days ago
  }
];

export const demoQuizAttempts = [
  {
    _id: "att_1",
    courseCode: "CSE 3203",
    courseTitle: "Operating Systems",
    topic: "CPU Scheduling & Synchronization",
    score: 8,
    totalQuestions: 10,
    correctAnswers: 8,
    wrongAnswers: 2,
    unanswered: 0,
    percentage: 80,
    timeTakenSeconds: 520,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
    strongTopics: ["OS Structures & Kernel", "Deadlocks & Banker's Algorithm"],
    weakTopics: ["CPU Scheduling Algorithms", "Process Synchronization"],
    recommendations: ["Review SJF vs SRTF preemptive scheduling Gantt charts", "Practice Peterson's solution for critical sections"]
  },
  {
    _id: "att_2",
    courseCode: "CSE 2101",
    courseTitle: "Data Structures",
    topic: "Trees & Balanced BSTs",
    score: 9,
    totalQuestions: 10,
    correctAnswers: 9,
    wrongAnswers: 1,
    unanswered: 0,
    percentage: 90,
    timeTakenSeconds: 460,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 28),
    strongTopics: ["Binary Tree Traversals", "Stack and Queue applications"],
    weakTopics: ["AVL Double Rotations"],
    recommendations: ["Review RL and LR rotation node pointer swaps"]
  },
  {
    _id: "att_3",
    courseCode: "CSE 1103",
    courseTitle: "Structured Programming Language",
    topic: "Pointers & Dynamic Memory",
    score: 10,
    totalQuestions: 10,
    correctAnswers: 10,
    wrongAnswers: 0,
    unanswered: 0,
    percentage: 100,
    timeTakenSeconds: 380,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72),
    strongTopics: ["Pointers", "Arrays & Strings", "Recursion"],
    weakTopics: [],
    recommendations: ["Excellent performance! Ready for Advanced Pointer concepts."]
  }
];

export const demoAchievements = [
  { id: "ach_1", title: "First Quiz", description: "Completed your first CSE preparation quiz", icon: "Award", points: 50, unlocked: true },
  { id: "ach_2", title: "10 Quizzes", description: "Successfully passed 10 quizzes", icon: "BookOpen", points: 100, unlocked: true },
  { id: "ach_3", title: "50 Quizzes", description: "Mastered 50 comprehensive course quizzes", icon: "CheckCircle", points: 300, unlocked: false },
  { id: "ach_4", title: "7-Day Streak", description: "Practiced 7 days continuously without missing", icon: "Flame", points: 150, unlocked: true },
  { id: "ach_5", title: "30-Day Streak", description: "Practiced an entire month consistently", icon: "Zap", points: 500, unlocked: false },
  { id: "ach_6", title: "Quiz Master", description: "Achieved score >= 90% in 5 consecutive quizzes", icon: "Crown", points: 250, unlocked: true },
  { id: "ach_7", title: "Perfect Score", description: "Scored 100% on a full-length course mock test", icon: "Star", points: 200, unlocked: true },
  { id: "ach_8", title: "Course Champion", description: "Completed all topic quizzes in a single course", icon: "Trophy", points: 350, unlocked: false }
];
