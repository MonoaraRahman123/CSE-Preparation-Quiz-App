import express from "express";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// Mock store for AI conversation history
let conversationHistory = [
  {
    id: "conv_1",
    courseCode: "CSE 3203",
    courseTitle: "Operating Systems",
    topic: "Process Management",
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    messages: [
      {
        sender: "user",
        text: "Explain the difference between Preemptive and Non-Preemptive CPU Scheduling with practical examples.",
        timestamp: new Date(Date.now() - 1000 * 60 * 118)
      },
      {
        sender: "ai",
        text: `### Preemptive vs. Non-Preemptive CPU Scheduling in Operating Systems

In modern OS design, CPU scheduling dictates which process in the ready queue is allocated the CPU core. Here is the rigorous comparison:

#### 1. Fundamental Difference
| Metric | Preemptive Scheduling | Non-Preemptive Scheduling |
| :--- | :--- | :--- |
| **CPU Release** | The OS kernel can forcibly interrupt a running process (timer interrupt or higher priority arrival). | The process retains the CPU until it voluntarily releases it (I/O burst or termination). |
| **Overhead** | High (frequent context switches, saving registers & PCB state). | Low (context switches occur only when a job completes or blocks). |
| **Starvation Risk** | Low-priority processes may suffer starvation if high-priority jobs continually arrive. | Long jobs can cause high waiting time for shorter jobs (Convoy Effect). |
| **Responsiveness** | High — crucial for interactive and real-time operating systems. | Low — suitable for batch processing environments. |

#### 2. Classic Algorithms
- **Preemptive:** Shortest Remaining Time First (SRTF), Round Robin (RR), Preemptive Priority.
- **Non-Preemptive:** First-Come First-Served (FCFS), Shortest Job First (SJF Non-preemptive).

#### 3. C Simulation Pseudocode:
\`\`\`c
// Preemptive Round Robin time-slice check in kernel
if (current_process->elapsed_ticks >= TIME_QUANTUM) {
    save_context(current_process);
    current_process->state = PROCESS_READY;
    enqueue(&ready_queue, current_process);
    schedule_next_process(); // Triggers context switch
}
\`\`\`

💡 **PUST Exam Tip:** In semester exams, always draw Gantt charts showing timestamps for turnaround time \\(TAT = Completion - Arrival\\) and waiting time \\(WT = TAT - Burst\\).`,
        timestamp: new Date(Date.now() - 1000 * 60 * 117),
        helpful: true
      }
    ]
  }
];

// Helper: Intelligent CSE response generator
const generateCseAiResponse = (prompt, courseCode = "CSE 3203", courseTitle = "Operating Systems", topic = "General") => {
  const p = prompt.toLowerCase();

  if (p.includes("recursion") || p.includes("recursive")) {
    return `### Mastering Recursion: Concept, Stack Frames & Tracing

**Definition:** Recursion is a programming technique where a function solves a problem by calling a smaller instance of itself, terminating at a predefined base case.

#### 1. The Anatomy of Every Recursive Function
1. **Base Case:** The condition that halts the recursion without further function calls.
2. **Recursive Step:** The progress toward the base case through parameter modification.

#### 2. Execution Stack Trace (Factorial Example)
Consider calculating \`factorial(3)\`:
\`\`\`c
#include <stdio.h>

long long factorial(int n) {
    // 1. Base Case
    if (n <= 1) {
        return 1;
    }
    // 2. Recursive Step
    return n * factorial(n - 1);
}

int main() {
    printf("Result: %lld\\n", factorial(3)); // Output: 6
    return 0;
}
\`\`\`

**Call Stack Visualization:**
\`\`\`text
[ Push ] factorial(3) -> waits for 3 * factorial(2)
  [ Push ] factorial(2) -> waits for 2 * factorial(1)
    [ Push ] factorial(1) -> returns 1 (Base Case reached!)
  [ Pop ] returns 2 * 1 = 2
[ Pop ] returns 3 * 2 = 6
\`\`\`

#### 3. Mathematical Recurrence:
\\[ T(n) = T(n-1) + O(1) \\implies O(n) \\text{ Time Complexity} \\]
Space complexity is \\(O(n)\\) due to active call stack frames.

⚠️ **Common Pitfall:** Forgetting the base case causes a **Stack Overflow Exception** as memory in the call stack runs out.`;
  }

  if (p.includes("study plan") || p.includes("7-day") || p.includes("preparation plan")) {
    return `### 📅 Comprehensive 7-Day Exam Preparation Plan: ${courseCode} — ${courseTitle}

Target: Score 80%+ in Midterm / Term Final Examination.

| Day | Focus Topic | Core Learning Tasks | Recommended Practice |
| :--- | :--- | :--- | :--- |
| **Day 1** | Fundamentals & Architecture | Review Syllabus Modules 1 & 2. Understand basic definitions and structural diagrams. | Solve 10 MCQs on CSE Prep platform. |
| **Day 2** | Core Algorithms / Data Structures | Trace primary algorithms step-by-step with pen and paper. | Write clean C/C++/Java code implementations. |
| **Day 3** | Mathematical Formulations & Derivations | Asymptotic bounds, Recurrence Relations, and proofs. | Solve 3 analytical questions from PUST past papers. |
| **Day 4** | Advanced Topics & Deep Dives | Synchronization, Normalization, Dynamic Programming, or Layer protocols. | Attempt Topic-wise practice quiz on CSE Prep. |
| **Day 5** | Previous 5 Years Question Papers | Analyze question patterns, question weight distribution, and mark allocations. | Time yourself under 45-minute sprint. |
| **Day 6** | Mistakes & Weak Areas Revision | Review marked quiz questions and revision notes in your CSE Prep history. | Ask AI Assistant to explain ambiguous definitions. |
| **Day 7** | Viva Voce & Rapid Mock Exam | Rapid-fire concept checks, formulas, time complexities, and viva prep. | Full-length mock test on CSE Prep. |

💡 **Pro-Tip:** Aim for 4 focused pomodoro sessions (25 mins study + 5 mins break) per day.`;
  }

  if (p.includes("mcq") || p.includes("quiz") || p.includes("questions")) {
    return `### 📝 Practice Questions for ${courseCode} (${topic || courseTitle})

Here are high-yield questions modeled after PUST term examination standards:

**Question 1:** Which of the following is true regarding time complexity in ${topic || courseTitle}?
- **A)** Always deterministic regardless of input permutation.
- **B)** Amortized analysis yields an upper bound over a sequence of operations. *(Correct)*
- **C)** Space complexity can exceed hardware address space indefinitely.
- **D)** In-place algorithms require $O(n)$ auxiliary workspace.

**Question 2:** In ${courseTitle}, what is the primary purpose of state synchronization?
- **A)** To maximize clock cycle jitter.
- **B)** To prevent race conditions across concurrent execution contexts. *(Correct)*
- **C)** To compress cache lines.
- **D)** To bypass hardware interrupts.

**Question 3:** True or False: Every context switch introduces CPU overhead because the processor must flush registers and update page table pointers.
- **Answer:** **True**. Context switching is pure computational overhead where no useful application work is performed.

💡 *Would you like to take this as an interactive timed test? Click **Start Quiz** in the top navigation!*`;
  }

  if (p.includes("viva") || p.includes("interview")) {
    return `### 🎙️ Viva Voce High-Yield Questions for ${courseCode}: ${courseTitle}

Prepare to answer these directly and concisely in front of your viva board:

1. **"What is the fundamental objective of ${courseTitle} in computer engineering?"**
   - *Model Answer:* It provides foundational computational models, efficiency guarantees, and architectural abstractions that enable reliable software and hardware systems.

2. **"Explain the difference between Time Complexity and Space Complexity."**
   - *Model Answer:* Time complexity measures the asymptotic growth rate of execution steps as input size $n \\to \\infty$, whereas Space complexity measures the peak auxiliary memory required during execution.

3. **"What is a Race Condition and how is it resolved?"**
   - *Model Answer:* A race condition arises when multiple threads access shared data concurrently and the outcome depends on execution timing. It is solved using mutual exclusion primitives (Mutex, Semaphores, Monitors).

4. **"Why is modularity important in modern software and hardware design?"**
   - *Model Answer:* Modularity enforces separation of concerns, simplifies maintenance, facilitates unit testing, and promotes reusability.`;
  }

  // Default context-aware in-depth response
  return `### Comprehensive Analysis: ${courseCode} — ${topic || "Core Principles"}

Hello! As your **CSE Academic Assistant**, here is an in-depth breakdown of your query regarding **${courseTitle}**:

#### 1. Theoretical Foundation
In the PUST CSE Curriculum for **${courseCode}**, **${topic || "this topic"}** serves as a core engineering milestone:
- **Key Principle:** The system enforces strict mathematical consistency and optimal resource utilization.
- **Primary Objective:** Decompose complex computing problems into verifiable, algorithmic components.

#### 2. Architectural & Computational Implementation
\`\`\`c
// Standard reference structure for ${courseCode}
typedef struct {
    int id;
    char name[64];
    double metric_score;
} SystemEntity;

void process_pipeline(SystemEntity* entity) {
    if (!entity) return;
    // Perform optimal bounded computation
    entity->metric_score = (entity->metric_score * 1.15);
}
\`\`\`

#### 3. Core Equations & Complexity
\\[ \\text{Efficiency} = \\lim_{n \\to \\infty} \\frac{T_{\\text{sequential}}(n)}{p \\cdot T_{\\text{parallel}}(n)} \\]
- **Best Case:** \\(O(1)\\)
- **Average Case:** \\(O(n \\log n)\\)
- **Worst Case:** \\(O(n^2)\\)

#### 4. Exam & Viva Suggestions:
- Ensure you can sketch block diagrams and state transitions on paper without hesitation.
- Review recent semester questions on CSE Prep to see how this topic was graded in previous years.

*Feel free to ask for specific code debugging, algorithm step-by-step traces, or practice problems!*`;
};

// Helper to call real Gemini API with multi-model fallback
const callGeminiAPI = async (prompt, courseCode = "CSE 3203", courseTitle = "Operating Systems", topic = "General") => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("No GEMINI_API_KEY set, using curriculum intelligence generator.");
    return null;
  }

  const candidateModels = [
    "gemini-3.1-flash-lite",
    "gemini-3.5-flash",
    "gemini-3.5-flash-lite",
    "gemini-flash-lite-latest"
  ];

  const systemInstruction = `You are the Official AI Academic Preparation Tutor for undergraduate students in the Department of Computer Science and Engineering at Pabna University of Science and Technology (PUST), Bangladesh.
You specialize in the PUST B.Sc. Engineering Curriculum (Session 2020-2021).
Current Context:
- Course Code: ${courseCode}
- Course Title: ${courseTitle}
- Topic: ${topic || "General Course Syllabus"}

Guidelines:
1. Provide accurate, rigorous, high-yield academic explanations suitable for university examinations and viva voce.
2. Include clear definitions, time/space complexities, formulas, and runnable C/C++/Java/Python code snippets where relevant.
3. Highlight key exam tips or common misconceptions where appropriate.
4. Format all math and code beautifully using markdown.`;

  for (const model of candidateModels) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const payload = {
        system_instruction: {
          parts: [{ text: systemInstruction }]
        },
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1500
        }
      };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errorBody = await res.text();
        console.warn(`Gemini model ${model} returned status ${res.status}:`, errorBody.slice(0, 100));
        continue; // Try next model in candidate list
      }

      const data = await res.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (reply) {
        return reply;
      }
    } catch (err) {
      console.warn(`Error querying Gemini model ${model}:`, err.message);
    }
  }

  return null; // All models exhausted
};

// Send message to AI
router.post("/chat", async (req, res) => {
  try {
    const { message, courseCode, courseTitle, topic, conversationId } = req.body;
    if (!message) {
      return res.status(400).json({ success: false, message: "Message content cannot be empty." });
    }

    // Try real Gemini API first
    let aiReplyText = await callGeminiAPI(message, courseCode, courseTitle, topic);

    // Fall back to built-in curriculum intelligence generator if Gemini API is unreachable
    if (!aiReplyText) {
      aiReplyText = generateCseAiResponse(message, courseCode, courseTitle, topic);
    }

    const userMsg = {
      sender: "user",
      text: message,
      timestamp: new Date()
    };
    const aiMsg = {
      sender: "ai",
      text: aiReplyText,
      timestamp: new Date(),
      helpful: null
    };

    // Find or create conversation
    let conv = conversationHistory.find(c => c.id === conversationId);
    if (!conv) {
      conv = {
        id: `conv_${Date.now()}`,
        courseCode: courseCode || "CSE 3203",
        courseTitle: courseTitle || "Operating Systems",
        topic: topic || "General Concepts",
        timestamp: new Date(),
        messages: [userMsg, aiMsg]
      };
      conversationHistory.unshift(conv);
    } else {
      conv.messages.push(userMsg, aiMsg);
      conv.timestamp = new Date();
    }

    res.json({
      success: true,
      conversationId: conv.id,
      reply: aiMsg,
      history: conv.messages,
      source: "gemini-api"
    });
  } catch (error) {
    console.error("AI Chat Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get conversations history
router.get("/history", authenticateToken, (req, res) => {
  res.json({ success: true, conversations: conversationHistory });
});

export default router;
