import path from "path";
import { promises as fs } from "fs";
import {
  createWagmiConfigFile,
  execAsync,
  pathOrProjectName,
  updatePackageJsonDependencies,
  usePackageManager,
} from "./index.js";

export const createNextApp = async (
  options: ProjectOptions,
  projectPath?: string
) => {
  console.log("Creating Next.js project...");
  try {
    const { projectName, packageManager } = options;

    const command = `npx create-next-app ${pathOrProjectName(
      projectName,
      projectPath
    )} --ts --tailwind --eslint --app --src-dir --import-alias "@/*" ${usePackageManager(
      packageManager
    )}`;

    await execAsync(command);

    await updatePackageJsonDependencies(
      {
        "@consensys/connect-button": "^1.0.3",
        "@tanstack/react-query": "^5.51.23",
        viem: "2.x",
        wagmi: "^2.12.5",
      },
      pathOrProjectName(projectName, projectPath)
    );

    await updateLayoutFile(pathOrProjectName(projectName, projectPath));
    await createProvider(pathOrProjectName(projectName, projectPath));
    await createWagmiConfigFile(
      projectPath ? `${projectPath}/src` : `${projectName}/src`
    );
    await updatePageFile(pathOrProjectName(projectName, projectPath));

    packageManager === "npm" || packageManager === "pnpm"
      ? await execAsync(`cd ${projectName} && ${packageManager} i`)
      : await execAsync(`cd ${projectName} && ${packageManager}`);

    console.log("Next.js project created successfully!");
  } catch (error) {
    console.error("An unexpected error occurred:", error);
  }
};

const updateLayoutFile = async (projectPath: string) => {
  const layoutFilePath = path.join(projectPath, "src", "app", "layout.tsx");
  await fs.writeFile(
    layoutFilePath,
    `
  "use client";

  import { Inter } from "next/font/google";
  import "./globals.css";
  import Provider from "@/providers/WagmiProvider";
  
  const inter = Inter({ subsets: ["latin"] });
  
  export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <Provider>
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
      </Provider>
    );
  }
    
`
  );
};

const createProvider = async (projectPath: string) => {
  await fs.mkdir(path.join(projectPath, "src", "providers"));
  const providerFilePath = path.join(
    projectPath,
    "src",
    "providers",
    "WagmiProvider.tsx"
  );
  await fs.writeFile(
    providerFilePath,
    `
"use client";

import { WagmiProvider } from "wagmi";
import { config } from "@/wagmi.config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createPublicClient, http } from "viem";
import { linea } from "viem/chains";

export const client = createPublicClient({
  chain: linea,
  transport: http(),
});

interface WagmiProviderProps {
  children: React.ReactNode;
}

const Provider: React.FC<WagmiProviderProps> = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
};

export default Provider;
    `
  );
};

const updatePageFile = async (projectPath: string) => {
  const pageFilePath = path.join(projectPath, "src", "app", "page.tsx");

  await fs.writeFile(
    pageFilePath,
    `
"use client";

import { ConnectButton } from "@consensys/connect-button";
import { client } from "@/providers/WagmiProvider";
import { Suspense, useEffect, useState } from "react";
import { useAccount } from "wagmi";

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
      <Suspense fallback={<div>Loading...</div>}>
        <div className=" flex justify-center pt-10 md:pt-0 z-10 max-w-5xl w-full lg:items-center lg:justify-between font-mono text-sm lg:flex">
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

        <div className="flex flex-col mt-52 items-center">
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
      </Suspense>
    </main>
  );
}
    `
  );
};
