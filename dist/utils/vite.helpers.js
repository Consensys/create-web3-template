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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import path from "path";
import { promises as fs } from "fs";
import { NPM_COMMAND, PNPM_COMMAND, YARN_COMMAND } from "../constants/index.js";
import { createWagmiConfigFile, execAsync, updatePackageJsonDependencies, } from "./index.js";
export var createReactApp = function (options_1) {
    var args_1 = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args_1[_i - 1] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([options_1], args_1, true), void 0, function (options, projectPath) {
        var projectName, packageManager, commands, command, error_1;
        if (projectPath === void 0) { projectPath = ""; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Creating React project...");
                    projectName = options.projectName, packageManager = options.packageManager;
                    commands = {
                        npm: NPM_COMMAND,
                        yarn: YARN_COMMAND,
                        pnpm: PNPM_COMMAND,
                    };
                    command = commands[packageManager];
                    if (!command) {
                        console.error("Unsupported package manager: ".concat(packageManager));
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 10, , 11]);
                    return [4 /*yield*/, execAsync(command(projectName, projectPath))];
                case 2:
                    _a.sent();
                    console.log("React project created successfully!");
                    return [4 /*yield*/, updatePackageJsonDependencies({
                            "@consensys/connect-button": "^1.0.2",
                            "@tanstack/react-query": "^5.51.23",
                            viem: "2.x",
                            wagmi: "^2.12.5",
                            postcss: "^8.4.41",
                            tailwindcss: "^3.4.10",
                            autoprefixer: "^10.4.20",
                        }, projectPath ? projectPath : projectName)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, createWagmiConfigFile(projectPath ? projectPath : projectName)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, updateMainFile(projectPath ? projectPath : projectName)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, updateAppFile(projectPath ? projectPath : projectName)];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, createClientProvider(projectPath ? projectPath : projectName)];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, createTalwindConfig(projectPath ? projectPath : projectName)];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, updateIndexCss(projectPath ? projectPath : projectName)];
                case 9:
                    _a.sent();
                    return [3 /*break*/, 11];
                case 10:
                    error_1 = _a.sent();
                    console.error("An error occurred during project creation:", error_1);
                    return [3 /*break*/, 11];
                case 11: return [2 /*return*/];
            }
        });
    });
};
var updateMainFile = function (projectPath) { return __awaiter(void 0, void 0, void 0, function () {
    var mainFilePath;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                mainFilePath = path.join(projectPath, "src", "main.tsx");
                return [4 /*yield*/, fs.writeFile(mainFilePath, "\n  import React from \"react\";\n  import ReactDOM from \"react-dom/client\";\n  import App from \"./App.tsx\";\n  import \"./index.css\";\n  import { WagmiProvider } from \"wagmi\";\n  import { QueryClient, QueryClientProvider } from \"@tanstack/react-query\";\n  import { config } from \"../wagmi.config.ts\";\n  \n  const queryClient = new QueryClient();\n  \n  ReactDOM.createRoot(document.getElementById(\"root\")!).render(\n    <React.StrictMode>\n      <WagmiProvider config={config}>\n        <QueryClientProvider client={queryClient}>\n          <App />\n        </QueryClientProvider>\n      </WagmiProvider>\n    </React.StrictMode>\n  );\n      ")];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var updateAppFile = function (projectPath) { return __awaiter(void 0, void 0, void 0, function () {
    var appFilePath;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                appFilePath = path.join(projectPath, "src", "App.tsx");
                return [4 /*yield*/, fs.writeFile(appFilePath, "\nimport { client } from \"./providers/client\";\nimport { useEffect, useState } from \"react\";\nimport { useAccount } from \"wagmi\";\nimport { ConnectButton } from \"@consensys/connect-button\";\n\nexport default function Home() {\n  const { isConnected, address } = useAccount();\n  const [blockNumber, setBlockNumber] = useState<bigint | null>(null);\n\n  useEffect(() => {\n    client.getBlockNumber().then((block) => {\n      setBlockNumber(block);\n    });\n  }, []);\n\n  return (\n    <main className=\"relative flex flex-col items-center gap-20 min-h-screen mx-auto md:p-24\">\n      <div className=\"flex justify-center pt-10 md:pt-0 z-10 max-w-5xl w-full lg:items-center lg:justify-between font-mono text-sm lg:flex\">\n        <div className=\"absolute bottom-0 left-0 flex w-full items-end justify-center lg:static lg:h-auto lg:w-auto lg:bg-none\">\n          <a\n            className=\"pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0\"\n            href=\"#\"\n            target=\"_blank\"\n            rel=\"noopener noreferrer\"\n          >\n            By RAD Team\n          </a>\n        </div>\n        <ConnectButton />\n      </div>\n\n      <div className=\"flex mt-52 flex-col items-center\">\n        <span className=\"text-3xl font-bold\">Web3 Starter template</span>\n        {isConnected && (\n          <span className=\"text-sm font-mono font-medium max-w-md text-center text-gray-500\">\n            Connected to: {address}\n          </span>\n        )}\n\n        <div className=\"text-sm font-mono font-medium max-w-md text-center text-gray-500\">\n          {!blockNumber ? (\n            \"Loading block number...\"\n          ) : (\n            <div>Linea block number: {Number(blockNumber)}</div>\n          )}\n        </div>\n      </div>\n    </main>\n  );\n}\n      ")];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var createClientProvider = function (projectPath) { return __awaiter(void 0, void 0, void 0, function () {
    var clientFilePath;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fs.mkdir(path.join(projectPath, "src", "providers"))];
            case 1:
                _a.sent();
                clientFilePath = path.join(projectPath, "src", "providers", "client.ts");
                return [4 /*yield*/, fs.writeFile(clientFilePath, "\nimport { createPublicClient, http } from \"viem\";\nimport { linea } from \"viem/chains\";\n\nexport const client = createPublicClient({\n  chain: linea,\n  transport: http(),\n});\n    ")];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var createTalwindConfig = function (projectPath) { return __awaiter(void 0, void 0, void 0, function () {
    var tailwindConfigPath;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                tailwindConfigPath = path.join(projectPath, "tailwind.config.js");
                return [4 /*yield*/, execAsync("cd ".concat(projectPath, " && npx tailwindcss init -p"))];
            case 1:
                _a.sent();
                return [4 /*yield*/, fs.writeFile(tailwindConfigPath, "\n/** @type {import('tailwindcss').Config} */\nexport default {\n  content: [\n    \"./index.html\",\n    \"./src/**/*.{js,ts,jsx,tsx}\",\n  ],\n  theme: {\n    extend: {},\n  },\n  plugins: [],\n}\n    ")];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var updateIndexCss = function (projectPath) { return __awaiter(void 0, void 0, void 0, function () {
    var indexCssPath;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                indexCssPath = path.join(projectPath, "src", "index.css");
                return [4 /*yield*/, fs.writeFile(indexCssPath, "\n@tailwind base;\n@tailwind components;\n@tailwind utilities;\n    \n")];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
