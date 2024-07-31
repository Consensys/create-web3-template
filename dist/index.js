#!/usr/bin/env node
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
import { Command } from "commander";
import inquirer from "inquirer";
import fs from "fs";
import { promptForProjectDetails } from "./utils/index.js";
var FRAMEWORK_CHOICES = [
    {
        name: "React (with Vite)",
        value: "react",
    },
    {
        name: "Next.js",
        value: "nextjs",
    },
];
var BLOCKCHAIN_TOOLING_CHOICES = [
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
var PACAKGE_MANAGER_CHOICES = [
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
function promptForFramework() {
    return __awaiter(this, void 0, void 0, function () {
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
    });
}
function promptForTooling() {
    return __awaiter(this, void 0, void 0, function () {
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
    });
}
function promptForPackageManager() {
    return __awaiter(this, void 0, void 0, function () {
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
    });
}
// async function handleProjectCreation(args: string): Promise<void> {
//   try {
//     // Prompt user for project details if not provided
//     const projectName = await promptForProjectDetails(args);
//     // Prompt user for framework selection
//     const framework = await promptForFramework();
//     console.log(`Selected framework: ${framework}`);
//     // Prompt user for tooling selection
//     const tooling = await promptForTooling(framework);
//     console.log(`Selected tooling: ${tooling}`);
//     // Determine the template ID based on the framework and tooling
//     let templateId: string;
//     if (framework === "React (with Vite)" && tooling === "Foundry") {
//       templateId = "foundry-starter";
//     } else {
//       templateId =
//         framework === "React (with Vite)"
//           ? "react-web3-starter"
//           : "next-web3-starter";
//     }
//     const template = TEMPLATES.find((t) => t.id === templateId);
//     if (!template) {
//       throw new Error("Template not found");
//     }
//     // Proceed based on the selected tooling
//     if (tooling === "HardHat") {
//       await createMonorepo(projectName, template);
//     } else if (tooling === "Foundry") {
//       await cloneTemplate(template.id, projectName);
//     } else {
//       await cloneTemplate(template.id, projectName);
//     }
//   } catch (error) {
//     console.error("An error occurred while creating the project:", error);
//   }
// }
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
                fs.mkdirSync("".concat(process.cwd(), "/").concat(projectName));
                fs.writeFileSync("".concat(process.cwd(), "/").concat(projectName, "/web3-template.config.json"), JSON.stringify(options, null, 2));
                console.log("Options:", options);
                return [2 /*return*/];
        }
    });
}); };
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var program;
        return __generator(this, function (_a) {
            program = new Command()
                .name("create-web3-template")
                .description("Web3 starter template CLI tool.")
                .arguments("[project-name]")
                .action(function (args) { return promptForOptions(args); })
                .version("0.0.2");
            program.parse(process.argv);
            return [2 /*return*/];
        });
    });
}
main().catch(function (error) {
    console.error("An unexpected error occurred:", error);
});
