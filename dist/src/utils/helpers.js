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
import { exec } from "child_process";
import util from "util";
import { BLOCKCHAIN_TOOLING_CHOICES, FRAMEWORK_CHOICES, PACAKGE_MANAGER_CHOICES, } from "../constants/index.js";
import { promises as fs } from "fs";
import inquirer from "inquirer";
import path from "path";
var execAsync = util.promisify(exec);
var promptForFramework = function () { return __awaiter(void 0, void 0, void 0, function () {
    var frameworkChoice, framework;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                frameworkChoice = FRAMEWORK_CHOICES.map(function (choice) { return choice.name; });
                return [4 /*yield*/, inquirer.prompt([
                        {
                            type: "list",
                            name: "framework",
                            message: "Please select the framework you want to use:",
                            choices: frameworkChoice,
                        },
                    ])];
            case 1:
                framework = (_a.sent()).framework;
                console.log("Selected framework: ".concat(framework));
                return [2 /*return*/, framework];
        }
    });
}); };
var promptForTooling = function () { return __awaiter(void 0, void 0, void 0, function () {
    var toolingChoice, tooling;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                toolingChoice = BLOCKCHAIN_TOOLING_CHOICES.map(function (choice) { return choice.name; });
                return [4 /*yield*/, inquirer.prompt([
                        {
                            type: "list",
                            name: "tooling",
                            message: "Would you like to use HardHat or Foundry?",
                            choices: toolingChoice,
                        },
                    ])];
            case 1:
                tooling = (_a.sent()).tooling;
                console.log("Selected tooling: ".concat(tooling));
                return [2 /*return*/, tooling];
        }
    });
}); };
var promptForPackageManager = function () { return __awaiter(void 0, void 0, void 0, function () {
    var packageManagerChoice, packageManager;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                packageManagerChoice = PACAKGE_MANAGER_CHOICES.map(function (choice) { return choice.name; });
                return [4 /*yield*/, inquirer.prompt([
                        {
                            type: "list",
                            name: "packageManager",
                            message: "Please select the package manager you want to use:",
                            choices: packageManagerChoice,
                        },
                    ])];
            case 1:
                packageManager = (_a.sent()).packageManager;
                console.log("Selected package manager: ".concat(packageManager));
                return [2 /*return*/, packageManager];
        }
    });
}); };
var usePackageManager = function (packageManager) {
    switch (packageManager) {
        case "npm":
            return "--use-npm";
        case "yarn":
            return "--use-yarn";
        case "pnpm":
            return "--use-pnpm";
        default:
            return "--use-npm";
    }
};
var promptForProjectDetails = function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var projectName;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!!args) return [3 /*break*/, 2];
                return [4 /*yield*/, inquirer.prompt([
                        {
                            type: "input",
                            name: "projectName",
                            message: "Please specify a name for your project: ",
                            validate: function (input) { return (input ? true : "Project name cannot be empty"); },
                        },
                    ])];
            case 1:
                projectName = (_a.sent()).projectName;
                console.log("Creating project with name:", projectName);
                return [2 /*return*/, projectName];
            case 2: return [2 /*return*/, args];
        }
    });
}); };
var createDirectory = function (projectName) { return __awaiter(void 0, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, fs.mkdir(projectName)];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error("An unexpected error occurred:", error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var pathOrProjectName = function (projectName, path) {
    return path ? path : projectName;
};
var createNextApp = function (options, path) { return __awaiter(void 0, void 0, void 0, function () {
    var projectName, packageManager, command, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Creating Next.js project...");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                projectName = options.projectName, packageManager = options.packageManager;
                command = "npx create-next-app ".concat(pathOrProjectName(projectName, path), " --ts --tailwind --eslint --app --src-dir --import-alias \"@/*\" ").concat(usePackageManager(packageManager));
                return [4 /*yield*/, execAsync(command)];
            case 2:
                _a.sent();
                console.log("Next.js project created successfully!");
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.error("An unexpected error occurred:", error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var createReactApp = function (options, path) { return __awaiter(void 0, void 0, void 0, function () {
    var projectName, packageManager, _a, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log("Creating React project...");
                _b.label = 1;
            case 1:
                _b.trys.push([1, 17, , 18]);
                projectName = options.projectName, packageManager = options.packageManager;
                _a = packageManager;
                switch (_a) {
                    case "npm": return [3 /*break*/, 2];
                    case "yarn": return [3 /*break*/, 7];
                    case "pnpm": return [3 /*break*/, 12];
                }
                return [3 /*break*/, 15];
            case 2:
                console.log("Creating project with npm");
                if (!path) return [3 /*break*/, 4];
                return [4 /*yield*/, execAsync("cd ".concat(path, " && npm init vite@latest . -- --template react-ts"))];
            case 3:
                _b.sent();
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, execAsync("npm init vite@latest ".concat(projectName, " -- --template react-ts"))];
            case 5:
                _b.sent();
                _b.label = 6;
            case 6: return [3 /*break*/, 16];
            case 7:
                console.log("Creating project with yarn");
                if (!path) return [3 /*break*/, 9];
                return [4 /*yield*/, execAsync("cd ".concat(path, " && yarn create vite . --template react-ts"))];
            case 8:
                _b.sent();
                return [3 /*break*/, 11];
            case 9: return [4 /*yield*/, execAsync("yarn create vite ".concat(projectName, " --template react-ts"))];
            case 10:
                _b.sent();
                _b.label = 11;
            case 11: return [3 /*break*/, 16];
            case 12:
                console.log("Creating project with pnpm");
                if (!path) return [3 /*break*/, 14];
                return [4 /*yield*/, execAsync("cd ".concat(path, " && pnpm create vite . --template react-ts"))];
            case 13:
                _b.sent();
                _b.label = 14;
            case 14: return [3 /*break*/, 16];
            case 15: return [3 /*break*/, 16];
            case 16:
                console.log("React project created successfully!");
                return [3 /*break*/, 18];
            case 17:
                error_3 = _b.sent();
                console.error("An unexpected error occurred:", error_3);
                return [3 /*break*/, 18];
            case 18: return [2 /*return*/];
        }
    });
}); };
var promptForOptions = function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var projectName, framework, tooling, packageManager, options;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, promptForProjectDetails(args)];
            case 1:
                projectName = _d.sent();
                return [4 /*yield*/, promptForFramework()];
            case 2:
                framework = _d.sent();
                return [4 /*yield*/, promptForTooling()];
            case 3:
                tooling = _d.sent();
                return [4 /*yield*/, promptForPackageManager()];
            case 4:
                packageManager = _d.sent();
                options = {
                    projectName: projectName,
                    framework: (_a = FRAMEWORK_CHOICES.find(function (choice) { return choice.name === framework; })) === null || _a === void 0 ? void 0 : _a.value,
                    blockchain_tooling: (_b = BLOCKCHAIN_TOOLING_CHOICES.find(function (choice) { return choice.name === tooling; })) === null || _b === void 0 ? void 0 : _b.value,
                    packageManager: (_c = PACAKGE_MANAGER_CHOICES.find(function (choice) { return choice.name === packageManager; })) === null || _c === void 0 ? void 0 : _c.value,
                };
                return [2 /*return*/, options];
        }
    });
}); };
var initializeMonorepo = function (options) { return __awaiter(void 0, void 0, void 0, function () {
    var projectName, packageManager;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                projectName = options.projectName, packageManager = options.packageManager;
                console.log("Initializing monorepo...");
                if (!(packageManager === "pnpm")) return [3 /*break*/, 2];
                return [4 /*yield*/, fs.writeFile(path.join(projectName, "pnpm-workspace.yaml"), "packages:\n        - 'packages/*'")];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2: return [4 /*yield*/, fs.writeFile(path.join(projectName, ".gitignore"), "node_modules")];
            case 3:
                _a.sent();
                return [4 /*yield*/, execAsync("cd ".concat(projectName, " && npm init -y"))];
            case 4:
                _a.sent();
                return [4 /*yield*/, execAsync("cd ".concat(projectName, " && npm init -w ./packages/blockchain -y"))];
            case 5:
                _a.sent();
                return [4 /*yield*/, execAsync("cd ".concat(projectName, " && npm init -w ./packages/site -y"))];
            case 6:
                _a.sent();
                return [4 /*yield*/, fs.rm(path.join(projectName, "packages", "blockchain", "package.json"))];
            case 7:
                _a.sent();
                return [4 /*yield*/, fs.rm(path.join(projectName, "packages", "site", "package.json"))];
            case 8:
                _a.sent();
                return [4 /*yield*/, fs.rm(path.join(projectName, "node_modules"), { recursive: true })];
            case 9:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var createHardhatProject = function (options) { return __awaiter(void 0, void 0, void 0, function () {
    var projectName, framework;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                projectName = options.projectName, framework = options.framework;
                return [4 /*yield*/, fs.mkdir(projectName)];
            case 1:
                _a.sent();
                console.log("Creating a project with HardHat...");
                return [4 /*yield*/, initializeMonorepo(options)];
            case 2:
                _a.sent();
                return [4 /*yield*/, execAsync("git clone https://github.com/cxalem/hardhat-template.git ".concat(path.join(projectName, "packages", "blockchain")))];
            case 3:
                _a.sent();
                if (!(framework === "nextjs")) return [3 /*break*/, 5];
                return [4 /*yield*/, createNextApp(options, path.join(projectName, "packages", "site"))];
            case 4:
                _a.sent();
                return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, createReactApp(options, path.join(projectName, "packages", "site"))];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7: return [2 /*return*/];
        }
    });
}); };
var createFoundryProject = function (options) { return __awaiter(void 0, void 0, void 0, function () {
    var projectName, framework;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                projectName = options.projectName, framework = options.framework;
                return [4 /*yield*/, fs.mkdir(projectName)];
            case 1:
                _a.sent();
                console.log("Creating a project with Foundry...");
                return [4 /*yield*/, initializeMonorepo(options)];
            case 2:
                _a.sent();
                if (!(framework === "nextjs")) return [3 /*break*/, 4];
                return [4 /*yield*/, createNextApp(options, path.join(projectName, "packages", "site"))];
            case 3:
                _a.sent();
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, createReactApp(options, path.join(projectName, "packages", "site"))];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6: return [4 /*yield*/, execAsync("\n    cd ".concat(projectName, "/packages/blockchain && forge init . --no-commit\n    "))];
            case 7:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
export var createProject = function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var options, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, promptForOptions(args)];
            case 1:
                options = _b.sent();
                if (options.blockchain_tooling === "hardhat") {
                    createHardhatProject(options);
                    return [2 /*return*/];
                }
                if (options.blockchain_tooling === "foundry") {
                    createFoundryProject(options);
                    return [2 /*return*/];
                }
                _a = options.framework;
                switch (_a) {
                    case "nextjs": return [3 /*break*/, 2];
                    case "react": return [3 /*break*/, 4];
                }
                return [3 /*break*/, 6];
            case 2: return [4 /*yield*/, createNextApp(options)];
            case 3:
                _b.sent();
                return [3 /*break*/, 7];
            case 4: return [4 /*yield*/, createReactApp(options)];
            case 5:
                _b.sent();
                return [3 /*break*/, 7];
            case 6: return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
