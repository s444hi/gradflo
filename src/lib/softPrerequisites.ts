
export const softPrerequisites: { from: string; to: string }[] = [
  // Programming Path
  { from: "CS22A", to: "CS46A" },
  { from: "CS46A", to: "CS46B" }, // This is also a hard prereq, but including for completeness
  { from: "CS46B", to: "CS146" }, // This is also a hard prereq, but including for completeness
  { from: "CS146", to: "ME1" },
  { from: "CS146", to: "ME2" },
  { from: "CS146", to: "ME3" },
  { from: "CS146", to: "ME4" },
  { from: "CS146", to: "ME5" },

  // Math Path
  { from: "MATH30", to: "MATH31" },
  { from: "MATH31", to: "MATH161A" },
  { from: "MATH42", to: "MATH39" },
  { from: "MATH42", to: "CS154" },
  { from: "MATH42", to: "CS156" },

  // Writing Path
  { from: "GE1A", to: "GE1B" },
  { from: "GE1B", to: "GE1C" },
  { from: "GE1C", to: "CS100W" },

  // General Education Path
  { from: "GE3A", to: "GEUD25" },
  { from: "GE3B", to: "GEUD25" },
  { from: "GE4", to: "GEUD4" },
  { from: "GE4_2", to: "GEUD4" },

  // Linguistics Progression
  { from: "LING101", to: "LING111" },
  { from: "LING101", to: "LING112" },
  { from: "LING101", to: "LING115" },
  { from: "LING111", to: "LING124" },
  { from: "LING112", to: "LING165" },

  // Optional soft paths for visual balance
  { from: "MATH30", to: "MATH39" },
  { from: "GE6", to: "PHIL134" },
  { from: "CS154", to: "CS156" },
  { from: "CS156", to: "CS171" },
];
