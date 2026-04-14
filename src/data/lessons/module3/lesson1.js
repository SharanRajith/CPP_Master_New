// Quick lesson stubs for all other modules
const makeLesson = (id, title, module, lessonNumber) => ({
  id, title, module, lessonNumber, xpReward: 10, isStub: true,
  leetcodeProblems: [],
  content: `# ${title}\n\nThis lesson is coming soon! Complete earlier lessons to prepare.\n\n> 🚧 Under Construction — Check back soon!`,
  starterCode: `// ${title}\n// Coming soon...\n\nint main() {\n    return 0;\n}\n`,
  modelAnswer: '', testCases: [], hints: [],
  complexity: { time: 'N/A', space: 'N/A' },
});

export default makeLesson('m3-l1', 'vector Internals & Amortized Complexity', 3, 1);
