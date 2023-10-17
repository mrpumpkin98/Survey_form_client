module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(tsx|ts)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node", "mjs"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx|mjs)$": "babel-jest",
  },
};
