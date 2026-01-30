export interface Course {
  id: string;
  name: string;
  units: string;
  description?: string;
  prerequisites: string[];
  type?: "major" | "ge" | "science";
  position: { x: number; y: number };
  difficulty?: number; // 1-10 scale
  tags?: string[];
  pairsWith?: string[]; // IDs of courses that pair well
}

export interface Semester {
  name: string;
  totalUnits: string;
  courses: Course[];
}

export interface Year {
  name: string;
  semesters: Semester[];
}

export interface Roadmap {
  major: string;
  years: Year[];
}

export const roadmaps: Roadmap[] = [
  {
    major: "Computer Science and Linguistics, BS",
    years: [
      {
        name: "Year 1",
        semesters: [
          {
            name: "Fall Semester",
            totalUnits: "15 units",
            courses: [
              { id: "CS22A", name: "CS 22A - Python for Everyone", units: "3 unit(s)", description: "GE Area 2", prerequisites: [], type: "major", position: { x: 50, y: 50 }, difficulty: 3, tags: ["intro", "python"], pairsWith: ["MATH42"] },
              { id: "MATH42", name: "MATH 42 - Discrete Mathematics", units: "3 unit(s)", prerequisites: [], type: "major", position: { x: 50, y: 200 }, difficulty: 6, tags: ["math", "logic"] },
              { id: "GE1A", name: "GE Area 1A", units: "3 unit(s)", prerequisites: [], type: "ge", position: { x: 50, y: 350 }, difficulty: 4 },
              { id: "GE3A", name: "GE Area 3A", units: "3 unit(s)*", prerequisites: [], type: "ge", position: { x: 50, y: 500 }, difficulty: 3 },
              { id: "GE4", name: "GE Area 4 + US 1 or US 2-3", units: "3 unit(s)*", prerequisites: [], type: "ge", position: { x: 50, y: 650 }, difficulty: 3 },
            ],
          },
          {
            name: "Spring Semester",
            totalUnits: "14 units",
            courses: [
              { id: "CS46A", name: "CS 46A - Introduction to Programming", units: "4 unit(s)", prerequisites: [], type: "major", position: { x: 350, y: 50 }, difficulty: 5, tags: ["programming", "java"], pairsWith: ["MATH30"] },
              { id: "GE1B", name: "GE Area 1B (Recommend LING 21)", units: "3 unit(s)", prerequisites: [], type: "ge", position: { x: 350, y: 200 }, difficulty: 4 },
              { id: "GE4_2", name: "GE Area 4 + US 1 or US 2-3", units: "3 unit(s)*", prerequisites: [], type: "ge", position: { x: 350, y: 350 }, difficulty: 3 },
              { id: "MATH30", name: "MATH 30 - Calculus I (GE Area 2)", units: "3 unit(s)", prerequisites: [], type: "major", position: { x: 350, y: 500 }, difficulty: 7, tags: ["math", "calculus"] },
              { id: "PE", name: "Physical Education", units: "1 unit*", prerequisites: [], type: "ge", position: { x: 350, y: 650 }, difficulty: 1 },
            ],
          },
        ],
      },
      {
        name: "Year 2",
        semesters: [
          {
            name: "Fall Semester",
            totalUnits: "15-16 units",
            courses: [
              { id: "GE1C", name: "GE Area 1C", units: "3 unit(s)*", prerequisites: [], type: "ge", position: { x: 50, y: 50 }, difficulty: 4 },
              { id: "GE5A", name: "GE Area 5A /5C", units: "3-4 unit(s)*", prerequisites: [], type: "ge", position: { x: 50, y: 200 }, difficulty: 4 },
              { id: "CS46B", name: "CS 46B - Introduction to Data Structures", units: "4 unit(s)", prerequisites: ["CS46A"], type: "major", position: { x: 650, y: 50 }, difficulty: 7, tags: ["programming", "algorithms"], pairsWith: ["MATH31"] },
              { id: "MATH31", name: "MATH 31 - Calculus II (GE Area 2)", units: "4 unit(s)", prerequisites: [], type: "major", position: { x: 50, y: 350 }, difficulty: 8, tags: ["math", "calculus"] },
              { id: "PE2", name: "Physical Education", units: "1 unit*", prerequisites: [], type: "ge", position: { x: 50, y: 500 }, difficulty: 1 },
            ],
          },
          {
            name: "Spring Semester",
            totalUnits: "15-16 units",
            courses: [
              { id: "CS146", name: "CS 146 - Data Structures and Algorithms", units: "3 unit(s)", prerequisites: ["CS46B"], type: "major", position: { x: 950, y: 50 }, difficulty: 9, tags: ["algorithms", "core"], pairsWith: ["LING101"] },
              { id: "GE3B", name: "GE Area 3B", units: "3 unit(s)", prerequisites: [], type: "ge", position: { x: 350, y: 200 }, difficulty: 4 },
              { id: "GE5B", name: "GE Area 5B / 5C", units: "3-4 unit(s)*", prerequisites: [], type: "ge", position: { x: 350, y: 350 }, difficulty: 4 },
              { id: "GE6", name: "GE Area 6", units: "3 unit(s)*", prerequisites: [], type: "ge", position: { x: 350, y: 500 }, difficulty: 3 },
              { id: "LING101", name: "LING 101 - Introduction to Linguistics", units: "3 unit(s)", prerequisites: [], type: "major", position: { x: 350, y: 650 }, difficulty: 5, tags: ["linguistics", "theory"] },
            ],
          },
        ],
      },
      {
        name: "Year 3",
        semesters: [
          {
            name: "Fall Semester",
            totalUnits: "15 units",
            courses: [
              { id: "CS100W", name: "CS 100W OR LLD 100W - Writing Workshop (WID)", units: "3 unit(s)", prerequisites: [], type: "major", position: { x: 50, y: 50 }, difficulty: 6, tags: ["writing"] },
              { id: "CS154", name: "CS 154 - Formal Languages and Computability", units: "3 unit(s)", prerequisites: [], type: "major", position: { x: 50, y: 200 }, difficulty: 8, tags: ["theory"] },
              { id: "LING111", name: "LING 111 - Introduction to Linguistic Phonetics", units: "3 unit(s)", prerequisites: [], type: "major", position: { x: 50, y: 350 }, difficulty: 6, tags: ["linguistics"] },
              { id: "MATH39", name: "MATH 39 - Linear Algebra I", units: "3 unit(s)", prerequisites: [], type: "major", position: { x: 50, y: 500 }, difficulty: 7, tags: ["math"] },
              { id: "ME1", name: "Major elective (See list in MyPlanner)", units: "3 unit(s)", prerequisites: [], type: "major", position: { x: 50, y: 650 }, difficulty: 5 },
            ],
          },
          {
            name: "Spring Semester",
            totalUnits: "15 units",
            courses: [
              { id: "CS156", name: "CS 156 - Introduction to Artificial Intelligence", units: "3 unit(s)", prerequisites: [], type: "major", position: { x: 350, y: 50 }, difficulty: 8, tags: ["ai", "programming"], pairsWith: ["LING115"] },
              { id: "LING112", name: "LING 112 - Introduction to Syntax", units: "3 unit(s)", prerequisites: [], type: "major", position: { x: 350, y: 200 }, difficulty: 6, tags: ["linguistics"] },
              { id: "LING115", name: "LING 115 - Corpus Linguistics", units: "3 unit(s)", prerequisites: [], type: "major", position: { x: 350, y: 350 }, difficulty: 5, tags: ["linguistics", "data"] },
              { id: "MATH161A", name: "MATH 161A - Applied Probability and Statistics I", units: "3 unit(s)", prerequisites: [], type: "major", position: { x: 350, y: 500 }, difficulty: 7, tags: ["math", "stats"] },
              { id: "PHIL134", name: "PHIL 134 - Computers, Ethics and Society (GE Upper Division Area 3)", units: "3 unit(s)", prerequisites: [], type: "major", position: { x: 350, y: 650 }, difficulty: 4 },
            ],
          },
        ],
      },
      {
        name: "Year 4",
        semesters: [
          {
            name: "Fall Semester",
            totalUnits: "15 units",
            courses: [
              { id: "CS171", name: "CS 171 - Introduction to Machine Learning", units: "3 unit(s)", prerequisites: [], type: "major", position: { x: 50, y: 50 }, difficulty: 9, tags: ["ai", "ml", "math"] },
              { id: "LING124", name: "LING 124 - Introduction to Speech Technology", units: "3 unit(s)", prerequisites: [], type: "major", position: { x: 50, y: 200 }, difficulty: 7, tags: ["linguistics", "tech"] },
              { id: "GEUD25", name: "GE Upper Division Area 2/5 (Recommend LING 122)", units: "3 unit(s)*", prerequisites: [], type: "ge", position: { x: 50, y: 350 }, difficulty: 5 },
              { id: "ME2", name: "Major elective (See list in MyPlanner)", units: "3 unit(s)*", prerequisites: [], type: "major", position: { x: 50, y: 500 }, difficulty: 5 },
              { id: "ME3", name: "Major elective (See list in MyPlanner)", units: "3 unit(s)*", prerequisites: [], type: "major", position: { x: 50, y: 650 }, difficulty: 5 },
            ],
          },
          {
            name: "Spring Semester",
            totalUnits: "15 units",
            courses: [
              { id: "GEUD4", name: "GE Upper Division Area 4", units: "3 unit(s)*", prerequisites: [], type: "ge", position: { x: 350, y: 50 }, difficulty: 4 },
              { id: "LING165", name: "LING 165 - Introduction to Natural Language Processing", units: "3 unit(s)", prerequisites: [], type: "major", position: { x: 350, y: 200 }, difficulty: 8, tags: ["nlp", "ai"] },
              { id: "ME4", name: "Major elective (See list in MyPlanner)", units: "3 unit(s)*", prerequisites: [], type: "major", position: { x: 350, y: 350 }, difficulty: 5 },
              { id: "ME5", name: "Major elective (See a list in MyPlanner)", units: "3 unit(s)*", prerequisites: [], type: "major", position: { x: 350, y: 500 }, difficulty: 5 },
              { id: "UDLE", name: "Upper Division Linguistics Elective (See list in MyPlanner)", units: "3 unit(s)*", prerequisites: [], type: "major", position: { x: 350, y: 650 }, difficulty: 6 },
            ],
          },
        ],
      },
    ],
  },
];