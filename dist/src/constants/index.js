export var FRAMEWORK_CHOICES = [
    {
        name: "React (with Vite)",
        value: "react",
    },
    {
        name: "Next.js",
        value: "nextjs",
    },
];
export var BLOCKCHAIN_TOOLING_CHOICES = [
    {
        name: "HardHat",
        value: "hardhat",
    },
    {
        name: "Foundry",
        value: "foundry",
    },
    {
        name: "None",
        value: "none",
    },
];
export var PACAKGE_MANAGER_CHOICES = [
    {
        name: "Yarn",
        value: "yarn",
    },
    {
        name: "NPM",
        value: "npm",
    },
    {
        name: "pnpm",
        value: "pnpm",
    },
];
export var NPM_COMMAND = function (projectName, path) {
    return path
        ? "cd ".concat(path, " && npm init vite@latest . -- --template react-ts")
        : "npm init vite@latest ".concat(projectName, " -- --template react-ts");
};
export var YARN_COMMAND = function (projectName, path) {
    return path
        ? "cd ".concat(path, " && yarn create vite . --template react-ts")
        : "yarn create vite ".concat(projectName, " --template react-ts");
};
export var PNPM_COMMAND = function (projectName, path) {
    return path
        ? "cd ".concat(path, " && pnpm create vite . --template react-ts")
        : "pnpm create vite ".concat(projectName, " --template react-ts");
};
