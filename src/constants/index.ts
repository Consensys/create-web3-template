export const FRAMEWORK_CHOICES = [
  {
    name: "React (with Vite)",
    value: "react",
  },
  {
    name: "Next.js",
    value: "nextjs",
  },
] as const;
export const BLOCKCHAIN_TOOLING_CHOICES = [
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
] as const;

export const PACAKGE_MANAGER_CHOICES = [
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
] as const;

export const NPM_COMMAND = (projectName: string, path: string) =>
  path
    ? `cd ${path} && npm init vite@latest . -- --template react-ts`
    : `npm init vite@latest ${projectName} -- --template react-ts`;

export const YARN_COMMAND = (projectName: string, path: string) =>
  path
    ? `cd ${path} && yarn create vite . --template react-ts`
    : `yarn create vite ${projectName} --template react-ts`;

export const PNPM_COMMAND = (projectName: string, path: string) =>
  path
    ? `cd ${path} && pnpm create vite . --template react-ts`
    : `pnpm create vite ${projectName} --template react-ts`;
