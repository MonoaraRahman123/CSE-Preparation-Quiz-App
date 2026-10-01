import pypdf
import json
import re

def parse_syllabus(pdf_path):
    reader = pypdf.PdfReader(pdf_path)
    
    # Complete 8 terms matching official PUST 2020-2021 curriculum
    curriculum = [
        {
            "year": 1,
            "term": 1,
            "title": "1st Year, 1st Term",
            "totalCredits": 19.50,
            "theoryCredits": 15.0,
            "sessionalCredits": 3.75,
            "vivaCredits": 0.75,
            "courses": [
                {"code": "CSE 1101", "title": "Computer Fundamentals", "type": "Theory", "credit": 3.0, "contactHours": "3L+0P", "prerequisite": "None"},
                {"code": "CSE 1102", "title": "Computer Fundamentals Sessional", "type": "Sessional", "credit": 1.5, "contactHours": "0L+3P", "prerequisite": "None"},
                {"code": "CSE 1103", "title": "Structured Programming Language", "type": "Theory", "credit": 3.0, "contactHours": "3L+0P", "prerequisite": "None"},
                {"code": "CSE 1104", "title": "Structured Programming Language Sessional I", "type": "Sessional", "credit": 1.5, "contactHours": "0L+3P", "prerequisite": "None"},
                {"code": "MATH 1101", "title": "Differential Calculus and Co-ordinate Geometry", "type": "Theory", "credit": 3.0, "contactHours": "3L+0P", "prerequisite": "None"},
                {"code": "PHY 1101", "title": "Physics", "type": "Theory", "credit": 3.0, "contactHours": "3L+0P", "prerequisite": "None"},
                {"code": "HUM 1101", "title": "Communicative English", "type": "Theory", "credit": 3.0, "contactHours": "3L+0P", "prerequisite": "None"},
                {"code": "HUM 1102", "title": "Communicative English Sessional", "type": "Sessional", "credit": 0.75, "contactHours": "0L+1.5P", "prerequisite": "None"},
                {"code": "CSE 1150", "title": "Viva Voce", "type": "Viva", "credit": 0.75, "contactHours": "Viva", "prerequisite": "None"}
            ]
        },
        {
            "year": 1,
            "term": 2,
            "title": "1st Year, 2nd Term",
            "totalCredits": 19.50,
            "theoryCredits": 14.0,
            "sessionalCredits": 4.75,
            "vivaCredits": 0.75,
            "courses": [
                {"code": "ME 1200", "title": "Engineering Drawing", "type": "Sessional", "credit": 1.0, "contactHours": "0L+2P", "prerequisite": "None"},
                {"code": "CSE 1200", "title": "Structured Programming Language Sessional II", "type": "Sessional", "credit": 0.75, "contactHours": "0L+1.5P", "prerequisite": "CSE 1103"},
                {"code": "CSE 1201", "title": "Object Oriented Programming", "type": "Theory", "credit": 3.0, "contactHours": "3L+0P", "prerequisite": "CSE 1103"},
                {"code": "CSE 1202", "title": "Object Oriented Programming Sessional", "type": "Sessional", "credit": 1.5, "contactHours": "0L+3P", "prerequisite": "None"},
                {"code": "CSE 1203", "title": "Discrete Mathematics", "type": "Theory", "credit": 3.0, "contactHours": "3L+0P", "prerequisite": "None"},
                {"code": "EEE 1201", "title": "Basic Electrical Engineering", "type": "Theory", "credit": 3.0, "contactHours": "3L+0P", "prerequisite": "None"},
                {"code": "EEE 1202", "title": "Basic Electrical Engineering Sessional", "type": "Sessional", "credit": 1.5, "contactHours": "0L+3P", "prerequisite": "None"},
                {"code": "MATH 1201", "title": "Integral Calculus, Differential Equation and Series Solutions", "type": "Theory", "credit": 3.0, "contactHours": "3L+0P", "prerequisite": "None"},
                {"code": "HUM 1201", "title": "Economics", "type": "Theory", "credit": 2.0, "contactHours": "2L+0P", "prerequisite": "None"},
                {"code": "CSE 1250", "title": "Viva Voce", "type": "Viva", "credit": 0.75, "contactHours": "Viva", "prerequisite": "None"}
            ]
        },
        {
            "year": 2,
            "term": 1,
            "title": "2nd Year, 1st Term",
            "totalCredits": 20.25,
            "theoryCredits": 15.0,
            "sessionalCredits": 4.50,
            "vivaCredits": 0.75,
            "courses": [
                {"code": "CSE 2101", "title": "Data Structures", "type": "Theory", "credit": 3.0, "contactHours": "3L+0P", "prerequisite": "CSE 1103"},
                {"code": "CSE 2102", "title": "Data Structures Sessional", "type": "Sessional", "credit": 1.5, "contactHours": "0L+3P", "prerequisite": "None"},
                {"code": "CSE 2103", "title": "Design Pattern and Java Programming", "type": "Theory", "credit": 3.0, "contactHours": "3L+0P", "prerequisite": "CSE 1201"},
                {"code": "CSE 2104", "title": "Design Pattern and Java Programming Sessional", "type": "Sessional", "credit": 1.5, "contactHours": "0L+3P", "prerequisite": "None"},
                {"code": "EEE 2101", "title": "Electronic Devices and Circuits", "type": "Theory", "credit": 3.0, "contactHours": "3L+0P", "prerequisite": "None"},
                {"code": "EEE 2102", "title": "Electronic Devices and Circuits Sessional", "type": "Sessional", "credit": 1.5, "contactHours": "0L+3P", "prerequisite": "None"},
                {"code": "MATH 2101", "title": "Vector, Matrices and Linear Algebra", "type": "Theory", "credit": 3.0, "contactHours": "3L+0P", "prerequisite": "None"},
                {"code": "STAT 2101", "title": "Elementary Statistics and Probability", "type": "Theory", "credit": 3.0, "contactHours": "3L+0P", "prerequisite": "None"},
                {"code": "CSE 2150", "title": "Viva Voce", "type": "Viva", "credit": 0.75, "contactHours": "Viva", "prerequisite": "None"}
            ]
        },
        {
            "year": 2,
            "term": 2,
            "title": "2nd Year, 2nd Term",
            "totalCredits": 19.25,
            "theoryCredits": 14.0,
            "sessionalCredits": 4.50,
            "vivaCredits": 0.75,
            "courses": [
                {"code": "CSE 2200", "title": "Analytical Programming Sessional", "type": "Sessional", "credit": 1.5, "contactHours": "0L+3P", "prerequisite": "CSE 1103, CSE 1201"},
                {"code": "CSE 2201", "title": "Algorithms", "type": "Theory", "credit": 3.0, "contactHours": "3L+0P", "prerequisite": "CSE 2101"},
                {"code": "CSE 2202", "title": "Algorithms Sessional", "type": "Sessional", "credit": 1.5, "contactHours": "0L+3P", "prerequisite": "None"},
                {"code": "CSE 2203", "title": "Theory of Computation", "type": "Theory", "credit": 2.0, "contactHours": "2L+0P", "prerequisite": "None"},
                {"code": "CSE 2205", "title": "Digital Systems", "type": "Theory", "credit": 3.0, "contactHours": "3L+0P", "prerequisite": "None"},
                {"code": "CSE 2206", "title": "Digital Systems Sessional", "type": "Sessional", "credit": 1.5, "contactHours": "0L+3P", "prerequisite": "None"},
                {"code": "MATH 2201", "title": "Complex Analysis, Laplace and Fourier Transforms", "type": "Theory", "credit": 3.0, "contactHours": "3L+0P", "prerequisite": "None"},
                {"code": "STAT 2201", "title": "Theory of Statistics", "type": "Theory", "credit": 3.0, "contactHours": "3L+0P", "prerequisite": "None"},
                {"code": "CSE 2250", "title": "Viva Voce", "type": "Viva", "credit": 0.75, "contactHours": "Viva", "prerequisite": "None"}
            ]
        },
        {
            "year": 3,
            "term": 1,
            "title": "3rd Year, 1st Term",
            "totalCredits": 21.00,
            "theoryCredits": 15.0,
            "sessionalCredits": 5.25,
            "vivaCredits": 0.75,
            "courses": [
                {"code": "CSE 3101", "title": "Computer Architecture and Organization", "type": "Theory", "credit": 3.0, "contactHours": "3L+0P", "prerequisite": "CSE 2205"},
                {"code": "CSE 3103", "title": "Compiler Design", "type": "Theory", "credit": 3.0, "contactHours": "3L+0P", "prerequisite": "CSE 2203"},
                {"code": "CSE 3104", "title": "Compiler Design Sessional", "type": "Sessional", "credit": 1.5, "contactHours": "0L+3P", "prerequisite": "None"},
                {"code": "CSE 3105", "title": "Numerical Methods", "type": "Theory", "credit": 3.0, "contactHours": "3L+0P", "prerequisite": "None"},
                {"code": "CSE 3106", "title": "Numerical Methods Sessional", "type": "Sessional", "credit": 0.75, "contactHours": "0L+1.5P", "prerequisite": "None"},
                {"code": "CSE 3107", "title": "Database Management Systems", "type": "Theory", "credit": 3.0, "contactHours": "3L+0P", "prerequisite": "None"},
                {"code": "CSE 3108", "title": "Database Management Systems Sessional", "type": "Sessional", "credit": 1.5, "contactHours": "0L+3P", "prerequisite": "None"},
                {"code": "ECE 3101", "title": "Data Communication", "type": "Theory", "credit": 3.0, "contactHours": "3L+0P", "prerequisite": "None"},
                {"code": "ECE 3102", "title": "Data Communication Sessional", "type": "Sessional", "credit": 1.5, "contactHours": "0L+3P", "prerequisite": "None"},
                {"code": "CSE 3150", "title": "Viva Voce", "type": "Viva", "credit": 0.75, "contactHours": "Viva", "prerequisite": "None"}
            ]
        },
        {
            "year": 3,
            "term": 2,
            "title": "3rd Year, 2nd Term",
            "totalCredits": 22.00,
            "theoryCredits": 15.0,
            "sessionalCredits": 6.25,
            "vivaCredits": 0.75,
            "courses": [
                {"code": "CSE 3200", "title": "Project", "type": "Sessional", "credit": 1.0, "contactHours": "0L+2P", "prerequisite": "None"},
                {"code": "CSE 3201", "title": "System Analysis and Design", "type": "Theory", "credit": 3.0, "contactHours": "3L+0P", "prerequisite": "None"},
                {"code": "CSE 3203", "title": "Operating Systems", "type": "Theory", "credit": 3.0, "contactHours": "3L+0P", "prerequisite": "None"},
                {"code": "CSE 3204", "title": "Operating Systems Sessional", "type": "Sessional", "credit": 1.5, "contactHours": "0L+3P", "prerequisite": "None"},
                {"code": "CSE 3205", "title": "Web Engineering", "type": "Theory", "credit": 3.0, "contactHours": "3L+0P", "prerequisite": "None"},
                {"code": "CSE 3206", "title": "Web Engineering Sessional", "type": "Sessional", "credit": 1.5, "contactHours": "0L+3P", "prerequisite": "None"},
                {"code": "CSE 3207", "title": "Digital Signal Processing", "type": "Theory", "credit": 3.0, "contactHours": "3L+0P", "prerequisite": "MATH 2201"},
                {"code": "CSE 3208", "title": "Digital Signal Processing Sessional", "type": "Sessional", "credit": 0.75, "contactHours": "0L+1.5P", "prerequisite": "None"},
                {"code": "CSE 3209", "title": "Microprocessors and Assembly Language", "type": "Theory", "credit": 3.0, "contactHours": "3L+0P", "prerequisite": "CSE 3101"},
                {"code": "CSE 3210", "title": "Microprocessors and Assembly Language Sessional", "type": "Sessional", "credit": 1.5, "contactHours": "0L+3P", "prerequisite": "None"},
                {"code": "CSE 3250", "title": "Viva Voce", "type": "Viva", "credit": 0.75, "contactHours": "Viva", "prerequisite": "None"}
            ]
        },
        {
            "year": 4,
            "term": 1,
            "title": "4th Year, 1st Term",
            "totalCredits": 21.00,
            "theoryCredits": 15.0,
            "sessionalCredits": 5.25,
            "vivaCredits": 0.75,
            "courses": [
                {"code": "CSE 4100", "title": "Project / Thesis", "type": "Sessional", "credit": 1.5, "contactHours": "0L+3P", "prerequisite": "None"},
                {"code": "CSE 4101", "title": "Software Engineering", "type": "Theory", "credit": 3.0, "contactHours": "3L+0P", "prerequisite": "None"},
                {"code": "CSE 4102", "title": "Software Engineering Sessional", "type": "Sessional", "credit": 0.75, "contactHours": "0L+1.5P", "prerequisite": "None"},
                {"code": "CSE 4103", "title": "Artificial Intelligence", "type": "Theory", "credit": 3.0, "contactHours": "3L+0P", "prerequisite": "None"},
                {"code": "CSE 4104", "title": "Artificial Intelligence Sessional", "type": "Sessional", "credit": 1.5, "contactHours": "0L+3P", "prerequisite": "None"},
                {"code": "CSE 4105", "title": "Digital Image Processing", "type": "Theory", "credit": 3.0, "contactHours": "3L+0P", "prerequisite": "None"},
                {"code": "CSE 4106", "title": "Digital Image Processing Sessional", "type": "Sessional", "credit": 1.5, "contactHours": "0L+3P", "prerequisite": "None"},
                {"code": "CSE 4107", "title": "Computer Simulation and Modeling", "type": "Theory", "credit": 3.0, "contactHours": "3L+0P", "prerequisite": "None", "isOptional": True},
                {"code": "HUM 4101", "title": "Sociology and Bangladesh Studies", "type": "Theory", "credit": 3.0, "contactHours": "3L+0P", "prerequisite": "None"},
                {"code": "CSE 4150", "title": "Viva Voce", "type": "Viva", "credit": 0.75, "contactHours": "Viva", "prerequisite": "None"}
            ],
            "optionalCourses": [
                {"code": "CSE 4107", "title": "Computer Simulation and Modeling", "credit": 3.0},
                {"code": "CSE 4109", "title": "Multimedia Technology", "credit": 3.0},
                {"code": "CSE 4111", "title": "Basic Graph Theory", "credit": 3.0},
                {"code": "CSE 4113", "title": "Parallel and Distributed Processing", "credit": 3.0}
            ]
        },
        {
            "year": 4,
            "term": 2,
            "title": "4th Year, 2nd Term",
            "totalCredits": 22.50,
            "theoryCredits": 15.0,
            "sessionalCredits": 6.75,
            "vivaCredits": 0.75,
            "courses": [
                {"code": "CSE 4200", "title": "Project / Thesis", "type": "Sessional", "credit": 3.0, "contactHours": "0L+6P", "prerequisite": "CSE 4100"},
                {"code": "CSE 4201", "title": "Computer Networks", "type": "Theory", "credit": 3.0, "contactHours": "3L+0P", "prerequisite": "None"},
                {"code": "CSE 4202", "title": "Computer Networks Sessional", "type": "Sessional", "credit": 1.5, "contactHours": "0L+3P", "prerequisite": "None"},
                {"code": "CSE 4203", "title": "Computer Graphics", "type": "Theory", "credit": 3.0, "contactHours": "3L+0P", "prerequisite": "None"},
                {"code": "CSE 4204", "title": "Computer Graphics Sessional", "type": "Sessional", "credit": 1.5, "contactHours": "0L+3P", "prerequisite": "None"},
                {"code": "CSE 4205", "title": "Interfacing and Microcontrollers", "type": "Theory", "credit": 3.0, "contactHours": "3L+0P", "prerequisite": "CSE 3209"},
                {"code": "CSE 4206", "title": "Interfacing and Microcontrollers Sessional", "type": "Sessional", "credit": 0.75, "contactHours": "0L+1.5P", "prerequisite": "None"},
                {"code": "CSE 4207", "title": "Cryptography and Network Security", "type": "Theory", "credit": 3.0, "contactHours": "3L+0P", "prerequisite": "None", "isOptional": True},
                {"code": "HUM 4201", "title": "Industrial Management and Accounting", "type": "Theory", "credit": 3.0, "contactHours": "3L+0P", "prerequisite": "None"},
                {"code": "CSE 4250", "title": "Viva Voce", "type": "Viva", "credit": 0.75, "contactHours": "Viva", "prerequisite": "None"}
            ],
            "optionalCourses": [
                {"code": "CSE 4207", "title": "Cryptography and Network Security", "credit": 3.0},
                {"code": "CSE 4209", "title": "VLSI Design", "credit": 3.0},
                {"code": "CSE 4211", "title": "Wireless Communication", "credit": 3.0},
                {"code": "CSE 4213", "title": "Computational Geometry", "credit": 3.0}
            ]
        }
    ]

    # Calculate total credits
    total_credits = sum(t["totalCredits"] for t in curriculum)
    print(f"Total Curriculum Credits: {total_credits}")

    def generate_topics(code, title):
        code_upper = code.upper()
        if "1101" in code_upper:
            return [
                {"id": "t1", "name": "Introduction to Computers, Generations & Hardware Components", "difficulty": "Easy", "completion": 100, "quizAvailable": True, "hours": 4},
                {"id": "t2", "name": "Number Systems: Binary, Octal, Hexadecimal & Complements", "difficulty": "Easy", "completion": 100, "quizAvailable": True, "hours": 5},
                {"id": "t3", "name": "Computer Software, Operating Systems & Utility Programs", "difficulty": "Easy", "completion": 90, "quizAvailable": True, "hours": 4},
                {"id": "t4", "name": "Internet Fundamentals, Web Technologies & Cyber Ethics", "difficulty": "Medium", "completion": 80, "quizAvailable": True, "hours": 5},
                {"id": "t5", "name": "Office Productivity Applications & File Management", "difficulty": "Easy", "completion": 100, "quizAvailable": True, "hours": 4}
            ]
        elif "1103" in code_upper:
            return [
                {"id": "t1", "name": "C Fundamentals, Tokens & Compilation Pipeline", "difficulty": "Easy", "completion": 100, "quizAvailable": True, "hours": 4},
                {"id": "t2", "name": "Data Types, Operators & Expression Evaluation", "difficulty": "Easy", "completion": 95, "quizAvailable": True, "hours": 5},
                {"id": "t3", "name": "Control Structures: If-Else, Switch & Loops", "difficulty": "Medium", "completion": 85, "quizAvailable": True, "hours": 6},
                {"id": "t4", "name": "1D & 2D Arrays, String Manipulation Functions", "difficulty": "Medium", "completion": 70, "quizAvailable": True, "hours": 6},
                {"id": "t5", "name": "Functions, Call by Value/Reference & Recursion", "difficulty": "Hard", "completion": 50, "quizAvailable": True, "hours": 7},
                {"id": "t6", "name": "Pointers, Pointer Arithmetic & Dynamic Memory (malloc/free)", "difficulty": "Hard", "completion": 30, "quizAvailable": True, "hours": 8},
                {"id": "t7", "name": "Structures, Unions & File Input/Output", "difficulty": "Medium", "completion": 10, "quizAvailable": True, "hours": 6}
            ]
        elif "1201" in code_upper:
            return [
                {"id": "t1", "name": "OOP Paradigm: Encapsulation, Abstraction, Modularity", "difficulty": "Easy", "completion": 90, "quizAvailable": True, "hours": 4},
                {"id": "t2", "name": "Classes, Constructors, Destructors & this Pointer", "difficulty": "Medium", "completion": 85, "quizAvailable": True, "hours": 6},
                {"id": "t3", "name": "Inheritance: Single, Multiple, Hierarchical & Diamond Problem", "difficulty": "Medium", "completion": 70, "quizAvailable": True, "hours": 6},
                {"id": "t4", "name": "Polymorphism, Virtual Functions & Pure Virtual Classes", "difficulty": "Hard", "completion": 60, "quizAvailable": True, "hours": 7},
                {"id": "t5", "name": "Operator Overloading & Friend Functions", "difficulty": "Hard", "completion": 40, "quizAvailable": True, "hours": 5},
                {"id": "t6", "name": "Templates, Exception Handling & Standard Template Library (STL)", "difficulty": "Hard", "completion": 20, "quizAvailable": True, "hours": 7}
            ]
        elif "2101" in code_upper:
            return [
                {"id": "t1", "name": "Asymptotic Notations & Algorithm Complexity", "difficulty": "Medium", "completion": 90, "quizAvailable": True, "hours": 4},
                {"id": "t2", "name": "Arrays, Stacks, Queues & Circular Queues", "difficulty": "Easy", "completion": 85, "quizAvailable": True, "hours": 6},
                {"id": "t3", "name": "Singly, Doubly and Circular Linked Lists", "difficulty": "Medium", "completion": 80, "quizAvailable": True, "hours": 6},
                {"id": "t4", "name": "Binary Trees, Binary Search Trees (BST) & AVL Balancing", "difficulty": "Hard", "completion": 60, "quizAvailable": True, "hours": 8},
                {"id": "t5", "name": "Heaps, Priority Queues & HeapSort", "difficulty": "Medium", "completion": 45, "quizAvailable": True, "hours": 5},
                {"id": "t6", "name": "Graph Representation, BFS & DFS Traversal", "difficulty": "Hard", "completion": 30, "quizAvailable": True, "hours": 7},
                {"id": "t7", "name": "Hashing, Hash Functions & Collision Resolution", "difficulty": "Medium", "completion": 15, "quizAvailable": True, "hours": 5}
            ]
        elif "2201" in code_upper:
            return [
                {"id": "t1", "name": "Divide and Conquer (MergeSort, QuickSort, Closest Pair)", "difficulty": "Medium", "completion": 80, "quizAvailable": True, "hours": 6},
                {"id": "t2", "name": "Greedy Strategies (Activity Selection, Huffman Coding, Kruskal/Prim)", "difficulty": "Medium", "completion": 70, "quizAvailable": True, "hours": 7},
                {"id": "t3", "name": "Dynamic Programming (0/1 Knapsack, LCS, Matrix Chain)", "difficulty": "Hard", "completion": 50, "quizAvailable": True, "hours": 8},
                {"id": "t4", "name": "Shortest Paths: Dijkstra, Bellman-Ford, Floyd-Warshall", "difficulty": "Hard", "completion": 40, "quizAvailable": True, "hours": 8},
                {"id": "t5", "name": "Backtracking & Branch and Bound (N-Queens, Graph Coloring)", "difficulty": "Hard", "completion": 25, "quizAvailable": True, "hours": 6},
                {"id": "t6", "name": "P, NP, NP-Complete & NP-Hard Class Analysis", "difficulty": "Hard", "completion": 0, "quizAvailable": True, "hours": 6}
            ]
        elif "3107" in code_upper:
            return [
                {"id": "t1", "name": "Database System Concepts, 3-Schema Architecture & ER Modeling", "difficulty": "Easy", "completion": 90, "quizAvailable": True, "hours": 5},
                {"id": "t2", "name": "Relational Model, Constraints & Relational Algebra", "difficulty": "Medium", "completion": 85, "quizAvailable": True, "hours": 6},
                {"id": "t3", "name": "Advanced SQL: Joins, Aggregation, Subqueries & Triggers", "difficulty": "Medium", "completion": 80, "quizAvailable": True, "hours": 7},
                {"id": "t4", "name": "Functional Dependencies & Normalization (1NF to BCNF)", "difficulty": "Hard", "completion": 60, "quizAvailable": True, "hours": 8},
                {"id": "t5", "name": "Transaction Processing, ACID Properties & Concurrency Control", "difficulty": "Hard", "completion": 40, "quizAvailable": True, "hours": 6},
                {"id": "t6", "name": "Database Indexing: B+ Trees, Hashing & Query Optimization", "difficulty": "Hard", "completion": 20, "quizAvailable": True, "hours": 6}
            ]
        elif "3203" in code_upper:
            return [
                {"id": "t1", "name": "OS Architecture, Kernel Modes & System Calls", "difficulty": "Easy", "completion": 90, "quizAvailable": True, "hours": 4},
                {"id": "t2", "name": "Process Concept, PCB, Context Switch & Threads", "difficulty": "Medium", "completion": 85, "quizAvailable": True, "hours": 6},
                {"id": "t3", "name": "CPU Scheduling: FCFS, SJF, Priority, Round Robin, Multilevel", "difficulty": "Medium", "completion": 45, "quizAvailable": True, "hours": 7},
                {"id": "t4", "name": "Process Synchronization, Critical Section, Semaphores & Monitors", "difficulty": "Hard", "completion": 30, "quizAvailable": True, "hours": 8},
                {"id": "t5", "name": "Deadlocks: Necessary Conditions, Banker's Algorithm & Recovery", "difficulty": "Hard", "completion": 20, "quizAvailable": True, "hours": 6},
                {"id": "t6", "name": "Memory Management: Paging, Page Tables, TLB & Segmentation", "difficulty": "Hard", "completion": 15, "quizAvailable": True, "hours": 8},
                {"id": "t7", "name": "Virtual Memory, Page Replacement Algorithms & Disk Scheduling", "difficulty": "Medium", "completion": 0, "quizAvailable": True, "hours": 6}
            ]
        elif "4103" in code_upper:
            return [
                {"id": "t1", "name": "AI Foundations, PEAS Agent Framework & Environment Types", "difficulty": "Easy", "completion": 60, "quizAvailable": True, "hours": 4},
                {"id": "t2", "name": "State Space Search: BFS, DFS, UCS, Greedy & A* Search", "difficulty": "Medium", "completion": 50, "quizAvailable": True, "hours": 7},
                {"id": "t3", "name": "Adversarial Search: Minimax Algorithm & Alpha-Beta Pruning", "difficulty": "Hard", "completion": 40, "quizAvailable": True, "hours": 6},
                {"id": "t4", "name": "Knowledge Representation, Propositional & First-Order Logic", "difficulty": "Hard", "completion": 20, "quizAvailable": True, "hours": 7},
                {"id": "t5", "name": "Machine Learning Fundamentals, Supervised Models & Neural Nets", "difficulty": "Hard", "completion": 10, "quizAvailable": True, "hours": 8},
                {"id": "t6", "name": "Natural Language Processing, Computer Vision & Expert Systems", "difficulty": "Medium", "completion": 0, "quizAvailable": True, "hours": 5}
            ]
        elif "4201" in code_upper:
            return [
                {"id": "t1", "name": "Network Models: OSI 7-Layer Reference Model & TCP/IP Stack", "difficulty": "Easy", "completion": 70, "quizAvailable": True, "hours": 5},
                {"id": "t2", "name": "Physical Layer: Transmission Media, Bandwidth, Multiplexing", "difficulty": "Medium", "completion": 60, "quizAvailable": True, "hours": 5},
                {"id": "t3", "name": "Data Link Layer: Framing, CRC, Sliding Window, CSMA/CD, Ethernet", "difficulty": "Medium", "completion": 50, "quizAvailable": True, "hours": 7},
                {"id": "t4", "name": "Network Layer: IPv4/IPv6 Addressing, Subnetting, Routing Protocols", "difficulty": "Hard", "completion": 30, "quizAvailable": True, "hours": 9},
                {"id": "t5", "name": "Transport Layer: TCP Connection Management, Congestion Control & UDP", "difficulty": "Hard", "completion": 20, "quizAvailable": True, "hours": 8},
                {"id": "t6", "name": "Application Layer Protocols (DNS, HTTP/HTTPS, FTP) & Cryptography", "difficulty": "Medium", "completion": 10, "quizAvailable": True, "hours": 6}
            ]
        else:
            return [
                {"id": "t1", "name": f"Module 1: Principles and Foundational Theory of {title}", "difficulty": "Easy", "completion": 30, "quizAvailable": True, "hours": 5},
                {"id": "t2", "name": f"Module 2: Core Architecture & System Modeling", "difficulty": "Medium", "completion": 15, "quizAvailable": True, "hours": 6},
                {"id": "t3", "name": f"Module 3: Analytical Problem Solving & Implementation", "difficulty": "Medium", "completion": 0, "quizAvailable": True, "hours": 7},
                {"id": "t4", "name": f"Module 4: Practical Applications & Exam Focus", "difficulty": "Hard", "completion": 0, "quizAvailable": True, "hours": 6}
            ]

    # Populate course metadata
    for term in curriculum:
        for course in term["courses"]:
            course["year"] = term["year"]
            course["term"] = term["term"]
            course["topics"] = generate_topics(course["code"], course["title"])
            course["objectives"] = [
                f"Equip students with deep conceptual and practical knowledge in {course['title']}.",
                f"Develop algorithmic problem-solving and rigorous engineering methodologies.",
                f"Prepare undergraduate students for university semester exams, viva voce, and industry careers."
            ]
            course["outcomes"] = [
                f"CO1: Master the foundational theoretical principles of {course['title']}.",
                f"CO2: Apply mathematical, computational, or system modeling techniques to real engineering scenarios.",
                f"CO3: Analyze problem constraints and evaluate trade-offs in efficiency, security, and scalability.",
                f"CO4: Synthesize solutions and communicate engineering results effectively."
            ]
            course["books"] = [
                f"PUST CSE Prescribed Standard Textbook for {course['title']}",
                "Departmental Lecture Course Pack & University Reference Guides"
            ]
            course["materialCount"] = 5 + (len(course["title"]) % 4)
            course["quizCount"] = 3 + (len(course["code"]) % 3)
            # Realistic progress based on student being in Year 3 Term 2
            if course["year"] < 3 or (course["year"] == 3 and course["term"] == 1):
                course["progress"] = 92 if course["year"] == 1 else 84
                course["completedQuizzes"] = 3
            elif course["year"] == 3 and course["term"] == 2:
                course["progress"] = 68
                course["completedQuizzes"] = 2
            else:
                course["progress"] = 0
                course["completedQuizzes"] = 0

    with open("curriculum_full.json", "w", encoding="utf-8") as f:
        json.dump(curriculum, f, indent=2, ensure_ascii=False)
    print("Done! curriculum_full.json generated successfully.")

if __name__ == "__main__":
    parse_syllabus("Syllabus-B.Sc.Engg_CSE_2020_2021(13th).pdf")
