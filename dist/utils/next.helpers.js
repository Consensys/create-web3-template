var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import path from "path";
import { promises as fs } from "fs";
import { createWagmiConfigFile, execAsync, pathOrProjectName, updatePackageJsonDependencies, usePackageManager, } from "./index.js";
export var createNextApp = function (options, projectPath) { return __awaiter(void 0, void 0, void 0, function () {
    var projectName, packageManager, command, _a, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log("Creating Next.js project...");
                _b.label = 1;
            case 1:
                _b.trys.push([1, 12, , 13]);
                projectName = options.projectName, packageManager = options.packageManager;
                command = "npx create-next-app ".concat(pathOrProjectName(projectName, projectPath), " --ts --tailwind --eslint --app --src-dir --import-alias \"@/*\" ").concat(usePackageManager(packageManager));
                return [4 /*yield*/, execAsync(command)];
            case 2:
                _b.sent();
                return [4 /*yield*/, updatePackageJsonDependencies({
                        "@consensys/connect-button": "^1.0.3",
                        "@tanstack/react-query": "^5.51.23",
                        viem: "2.x",
                        wagmi: "^2.12.5",
                    }, pathOrProjectName(projectName, projectPath))];
            case 3:
                _b.sent();
                return [4 /*yield*/, updateLayoutFile(pathOrProjectName(projectName, projectPath))];
            case 4:
                _b.sent();
                return [4 /*yield*/, createProvider(pathOrProjectName(projectName, projectPath))];
            case 5:
                _b.sent();
                return [4 /*yield*/, createWagmiConfigFile(projectPath ? "".concat(projectPath, "/src") : "".concat(projectName, "/src"))];
            case 6:
                _b.sent();
                return [4 /*yield*/, updatePageFile(pathOrProjectName(projectName, projectPath))];
            case 7:
                _b.sent();
                if (!(packageManager === "npm" || packageManager === "pnpm")) return [3 /*break*/, 9];
                return [4 /*yield*/, execAsync("cd ".concat(projectName, " && ").concat(packageManager, " i"))];
            case 8:
                _a = _b.sent();
                return [3 /*break*/, 11];
            case 9: return [4 /*yield*/, execAsync("cd ".concat(projectName, " && ").concat(packageManager))];
            case 10:
                _a = _b.sent();
                _b.label = 11;
            case 11:
                _a;
                console.log("Next.js project created successfully!");
                return [3 /*break*/, 13];
            case 12:
                error_1 = _b.sent();
                console.error("An unexpected error occurred:", error_1);
                return [3 /*break*/, 13];
            case 13: return [2 /*return*/];
        }
    });
}); };
var updateLayoutFile = function (projectPath) { return __awaiter(void 0, void 0, void 0, function () {
    var layoutFilePath;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                layoutFilePath = path.join(projectPath, "src", "app", "layout.tsx");
                return [4 /*yield*/, fs.writeFile(layoutFilePath, "\n  \"use client\";\n\n  import { Inter } from \"next/font/google\";\n  import \"./globals.css\";\n  import Provider from \"@/providers/WagmiProvider\";\n  \n  const inter = Inter({ subsets: [\"latin\"] });\n  \n  export default function RootLayout({\n    children,\n  }: Readonly<{\n    children: React.ReactNode;\n  }>) {\n    return (\n      <Provider>\n        <html lang=\"en\">\n          <body className={inter.className}>{children}</body>\n        </html>\n      </Provider>\n    );\n  }\n    \n")];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var createProvider = function (projectPath) { return __awaiter(void 0, void 0, void 0, function () {
    var providerFilePath;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fs.mkdir(path.join(projectPath, "src", "providers"))];
            case 1:
                _a.sent();
                providerFilePath = path.join(projectPath, "src", "providers", "WagmiProvider.tsx");
                return [4 /*yield*/, fs.writeFile(providerFilePath, "\n\"use client\";\n\nimport { WagmiProvider } from \"wagmi\";\nimport { config } from \"@/wagmi.config\";\nimport { QueryClient, QueryClientProvider } from \"@tanstack/react-query\";\nimport { createPublicClient, http } from \"viem\";\nimport { linea } from \"viem/chains\";\n\nexport const client = createPublicClient({\n  chain: linea,\n  transport: http(),\n});\n\ninterface WagmiProviderProps {\n  children: React.ReactNode;\n}\n\nconst Provider: React.FC<WagmiProviderProps> = ({ children }) => {\n  const queryClient = new QueryClient();\n\n  return (\n    <WagmiProvider config={config}>\n      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>\n    </WagmiProvider>\n  );\n};\n\nexport default Provider;\n    ")];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var updatePageFile = function (projectPath) { return __awaiter(void 0, void 0, void 0, function () {
    var pageFilePath;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                pageFilePath = path.join(projectPath, "src", "app", "page.tsx");
                return [4 /*yield*/, fs.writeFile(pageFilePath, "\n\"use client\";\n\nimport { ConnectButton } from \"@consensys/connect-button\";\nimport { client } from \"@/providers/WagmiProvider\";\nimport { Suspense, useEffect, useState } from \"react\";\nimport { useAccount } from \"wagmi\";\n\nexport default function Home() {\n  const { isConnected, address } = useAccount();\n  const [blockNumber, setBlockNumber] = useState<bigint | null>(null);\n\n  useEffect(() => {\n    client.getBlockNumber().then((block) => {\n      setBlockNumber(block);\n    });\n  }, []);\n\n  return (\n    <main className=\"relative flex flex-col items-center gap-20 min-h-screen mx-auto md:p-24\">\n      <Suspense fallback={<div>Loading...</div>}>\n        <div className=\" flex justify-center pt-10 md:pt-0 z-10 max-w-5xl w-full lg:items-center lg:justify-between font-mono text-sm lg:flex\">\n          <div className=\"absolute bottom-0 left-0 flex w-full items-end justify-center lg:static lg:h-auto lg:w-auto lg:bg-none\">\n            <a\n              className=\"pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0\"\n              href=\"#\"\n              target=\"_blank\"\n              rel=\"noopener noreferrer\"\n            >\n              By RAD Team\n            </a>\n          </div>\n          <ConnectButton />\n        </div>\n\n        <div className=\"flex flex-col mt-52 items-center\">\n          <span className=\"text-3xl font-bold\">Web3 Starter template</span>\n          {isConnected && (\n            <span className=\"text-sm font-mono font-medium max-w-md text-center text-gray-500\">\n              Connected to: {address}\n            </span>\n          )}\n\n          <div className=\"text-sm font-mono font-medium max-w-md text-center text-gray-500\">\n            {!blockNumber ? (\n              \"Loading block number...\"\n            ) : (\n              <div>Linea block number: {Number(blockNumber)}</div>\n            )}\n          </div>\n        </div>\n      </Suspense>\n    </main>\n  );\n}\n    ")];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
