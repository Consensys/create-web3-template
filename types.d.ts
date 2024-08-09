type Template = {
  id: string;
  name: string;
  repo_url: string;
  packageName: string;
};

type TemplateSelection = {
  title: string;
};

type ProjectOptions = {
  projectName: string;
  framework: "react" | "nextjs" | undefined;
  blockchain_tooling: "hardhat" | "foundry" | "none" | undefined;
  packageManager: "yarn" | "npm" | "pnpm";
};
