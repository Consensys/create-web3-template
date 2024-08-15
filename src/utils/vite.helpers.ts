import path from "path";
import { promises as fs } from "fs";
import { NPM_COMMAND, PNPM_COMMAND, YARN_COMMAND } from "../constants/index.js";
import {
  createWagmiConfigFile,
  execAsync,
  updatePackageJsonDependencies,
} from "./index.js";

export const createReactApp = async (
  options: ProjectOptions,
  projectPath: string = ""
): Promise<void> => {
  console.log("Creating React project...");

  const { projectName, packageManager } = options;

  const commands: Record<
    string,
    (projectName: string, path: string) => string
  > = {
    npm: NPM_COMMAND,
    yarn: YARN_COMMAND,
    pnpm: PNPM_COMMAND,
  };

  const command = commands[packageManager];

  if (!command) {
    console.error(`Unsupported package manager: ${packageManager}`);
    return;
  }

  try {
    await execAsync(command(projectName, projectPath));
    console.log("React project created successfully!");
    await updatePackageJsonDependencies(
      {
        "@consensys/connect-button": "^1.0.3",
        "@tanstack/react-query": "^5.51.23",
        viem: "2.x",
        wagmi: "^2.12.5",
        postcss: "^8.4.41",
        tailwindcss: "^3.4.10",
        autoprefixer: "^10.4.20",
      },
      projectPath ? projectPath : projectName
    );
    await createWagmiConfigFile(projectPath ? projectPath : projectName);
    await updateMainFile(projectPath ? projectPath : projectName);
    await updateAppFile(projectPath ? projectPath : projectName);
    await createClientProvider(projectPath ? projectPath : projectName);
    await createTalwindConfig(projectPath ? projectPath : projectName);
    await updateIndexCss(projectPath ? projectPath : projectName);
  } catch (error) {
    console.error("An error occurred during project creation:", error);
  }
};

const updateMainFile = async (projectPath: string) => {
  const mainFilePath = path.join(projectPath, "src", "main.tsx");
  await fs.writeFile(
    mainFilePath,
    `
  import React from "react";
  import ReactDOM from "react-dom/client";
  import App from "./App.tsx";
  import "./index.css";
  import { WagmiProvider } from "wagmi";
  import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
  import { config } from "../wagmi.config.ts";
  
  const queryClient = new QueryClient();
  
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </WagmiProvider>
    </React.StrictMode>
  );
      `
  );
};

const updateAppFile = async (projectPath: string) => {
  const appFilePath = path.join(projectPath, "src", "App.tsx");
  await fs.writeFile(
    appFilePath,
    `
import { client } from "./providers/client";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { ConnectButton } from "@consensys/connect-button";

export default function Home() {
  const { isConnected, address } = useAccount();
  const [blockNumber, setBlockNumber] = useState<bigint | null>(null);

  useEffect(() => {
    client.getBlockNumber().then((block) => {
      setBlockNumber(block);
    });
  }, []);

  return (
    <main className="relative flex flex-col items-center gap-20 min-h-screen mx-auto md:p-24">
      <div className="flex justify-center pt-10 md:pt-0 z-10 max-w-5xl w-full lg:items-center lg:justify-between font-mono text-sm lg:flex">
        <div className="absolute bottom-0 left-0 flex w-full items-end justify-center lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            By RAD Team
          </a>
        </div>
        <ConnectButton />
      </div>

      <div className="flex mt-52 flex-col items-center">
        <span className="text-3xl font-bold">Web3 Starter template</span>
        {isConnected && (
          <span className="text-sm font-mono font-medium max-w-md text-center text-gray-500">
            Connected to: {address}
          </span>
        )}

        <div className="text-sm font-mono font-medium max-w-md text-center text-gray-500">
          {!blockNumber ? (
            "Loading block number..."
          ) : (
            <div>Linea block number: {Number(blockNumber)}</div>
          )}
        </div>
      </div>
    </main>
  );
}
      `
  );
};

const createClientProvider = async (projectPath: string) => {
  await fs.mkdir(path.join(projectPath, "src", "providers"));
  const clientFilePath = path.join(
    projectPath,
    "src",
    "providers",
    "client.ts"
  );
  await fs.writeFile(
    clientFilePath,
    `
import { createPublicClient, http } from "viem";
import { linea } from "viem/chains";

export const client = createPublicClient({
  chain: linea,
  transport: http(),
});
    `
  );
};

const createTalwindConfig = async (projectPath: string) => {
  const tailwindConfigPath = path.join(projectPath, "tailwind.config.js");
  await execAsync(`cd ${projectPath} && npx tailwindcss init -p`);
  await fs.writeFile(
    tailwindConfigPath,
    `
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
    `
  );
};

const updateIndexCss = async (projectPath: string) => {
  const indexCssPath = path.join(projectPath, "src", "index.css");
  await fs.writeFile(
    indexCssPath,
    `
@tailwind base;
@tailwind components;
@tailwind utilities;   
`
  );
};
