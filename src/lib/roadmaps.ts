
export interface Course {
  name: string;
  units: string;
  description?: string;
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
              { name: "CS 22A - Python for Everyone", units: "3 unit(s)", description: "GE Area 2" },
              { name: "MATH 42 - Discrete Mathematics", units: "3 unit(s)" },
              { name: "GE Area 1A", units: "3 unit(s)" },
              { name: "GE Area 3A", units: "3 unit(s)*" },
              { name: "GE Area 4 + US 1 or US 2-3", units: "3 unit(s)*" },
            ],
          },
          {
            name: "Spring Semester",
            totalUnits: "14 units",
            courses: [
              { name: "CS 46A - Introduction to Programming", units: "4 unit(s)" },
              { name: "GE Area 1B (Recommend LING 21)", units: "3 unit(s)" },
              { name: "GE Area 4 + US 1 or US 2-3", units: "3 unit(s)*" },
              { name: "MATH 30 - Calculus I (GE Area 2)", units: "3 unit(s)" },
              { name: "Physical Education", units: "1 unit*" },
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
              { name: "GE Area 1C", units: "3 unit(s)*" },
              { name: "GE Area 5A /5C", units: "3-4 unit(s)*" },
              { name: "CS 46B - Introduction to Data Structures", units: "4 unit(s)" },
              { name: "MATH 31 - Calculus II (GE Area 2)", units: "4 unit(s)" },
              { name: "Physical Education", units: "1 unit*" },
            ],
          },
          {
            name: "Spring Semester",
            totalUnits: "15-16 units",
            courses: [
              { name: "CS 146 - Data Structures and Algorithms", units: "3 unit(s)" },
              { name: "GE Area 3B", units: "3 unit(s)" },
              { name: "GE Area 5B / 5C", units: "3-4 unit(s)*" },
              { name: "GE Area 6", units: "3 unit(s)*" },
              { name: "LING 101 - Introduction to Linguistics", units: "3 unit(s)" },
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
              { name: "CS 100W OR LLD 100W - Writing Workshop (WID)", units: "3 unit(s)" },
              { name: "CS 154 - Formal Languages and Computability", units: "3 unit(s)" },
              { name: "LING 111 - Introduction to Linguistic Phonetics", units: "3 unit(s)" },
              { name: "MATH 39 - Linear Algebra I", units: "3 unit(s)" },
              { name: "Major elective (See list in MyPlanner)", units: "3 unit(s)" },
            ],
          },
          {
            name: "Spring Semester",
            totalUnits: "15 units",
            courses: [
              { name: "CS 156 - Introduction to Artificial Intelligence", units: "3 unit(s)" },
              { name: "LING 112 - Introduction to Syntax", units: "3 unit(s)" },
              { name: "LING 115 - Corpus Linguistics", units: "3 unit(s)" },
              { name: "MATH 161A - Applied Probability and Statistics I", units: "3 unit(s)" },
              { name: "PHIL 134 - Computers, Ethics and Society (GE Upper Division Area 3)", units: "3 unit(s)" },
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
              { name: "CS 171 - Introduction to Machine Learning", units: "3 unit(s)" },
              { name: "LING 124 - Introduction to Speech Technology", units: "3 unit(s)" },
              { name: "GE Upper Division Area 2/5 (Recommend LING 122)", units: "3 unit(s)*" },
              { name: "Major elective (See list in MyPlanner)", units: "3 unit(s)*" },
              { name: "Major elective (See list in MyPlanner)", units: "3 unit(s)*" },
            ],
          },
          {
            name: "Spring Semester",
            totalUnits: "15 units",
            courses: [
              { name: "GE Upper Division Area 4", units: "3 unit(s)*" },
              { name: "LING 165 - Introduction to Natural Language Processing", units: "3 unit(s)" },
              { name: "Major elective (See list in MyPlanner)", units: "3 unit(s)*" },
              { name: "Major elective (See a list in MyPlanner)", units: "3 unit(s)*" },
              { name: "Upper Division Linguistics Elective (See list in MyPlanner)", units: "3 unit(s)*" },
            ],
          },
        ],
      },
    ],
  },
];
