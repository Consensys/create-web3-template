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
import inquirer from "inquirer";
import { execSync } from "child_process";
var templates = [
    {
        title: "Next Web3 Starter",
        id: "next-web3-starter",
        repo_url: "https://github.com/Consensys/next-web3-starter.git",
    },
    { title: "Vite + Wagmi + Viem", id: "vite-wagmi-viem", repo_url: "" },
];
export function cloneTemplate(templateId, projectName) {
    return __awaiter(this, void 0, void 0, function () {
        var template;
        return __generator(this, function (_a) {
            template = templates.find(function (t) { return t.id === templateId; });
            if (!template) {
                throw new Error("Template not found");
            }
            switch (template.id) {
                case "next-web3-starter":
                    if (!template.repo_url)
                        throw new Error("Repository URL not defined for RAD Starter");
                    execSync("git clone ".concat(template.repo_url, " ").concat(projectName));
                    console.log("Project created successfully.");
                    break;
                case "vite-wagmi-viem":
                    console.log("Creating a Vite + Wagmi + Viem project");
                    // TO-DO: Implement the logic for cloning or setting up this project
                    break;
                default:
                    throw new Error("Unhandled template type");
            }
            return [2 /*return*/];
        });
    });
}
export function promptForProjectDetails(args) {
    return __awaiter(this, void 0, void 0, function () {
        var projectName;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!args) return [3 /*break*/, 2];
                    return [4 /*yield*/, inquirer.prompt([
                            {
                                type: "input",
                                name: "projectName",
                                message: "Please specify a project name: ",
                            },
                        ])];
                case 1:
                    projectName = (_a.sent()).projectName;
                    console.log("Creating project with name:", projectName);
                    return [2 /*return*/, projectName];
                case 2: return [2 /*return*/, args];
            }
        });
    });
}
export function promptForTemplate() {
    return __awaiter(this, void 0, void 0, function () {
        var template;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, inquirer.prompt([
                        {
                            type: "list",
                            name: "template",
                            message: "Please specify a template: ",
                            choices: templates.map(function (template) { return template.title; }),
                        },
                    ])];
                case 1:
                    template = (_a.sent()).template;
                    console.log("Creating project with template:", template);
                    return [2 /*return*/, templates.find(function (t) { return t.title === template; })];
            }
        });
    });
}
