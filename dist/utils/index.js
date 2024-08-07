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
import { exec } from "child_process";
import { promises as fs } from "fs";
import { TEMPLATES } from "../templates.js";
import path from "path";
import util from "util";
var execAsync = util.promisify(exec);
var validateTemplateExists = function (input) {
    if (!input) {
        throw new Error("Template not found");
    }
};
export var updatePackageJson = function (projectPath, packageName) { return __awaiter(void 0, void 0, void 0, function () {
    var packageJsonPath, packageJson, newPackageJson;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                packageJsonPath = path.join(projectPath, "package.json");
                return [4 /*yield*/, fs.readFile(packageJsonPath, "utf-8")];
            case 1:
                packageJson = _a.sent();
                newPackageJson = packageJson.replace(packageName, path.basename(projectPath));
                return [4 /*yield*/, fs.writeFile(packageJsonPath, newPackageJson)];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
export var removeGitFolder = function (projectPath) { return __awaiter(void 0, void 0, void 0, function () {
    var gitPath, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                gitPath = path.join(projectPath, ".git");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, fs.rm(gitPath, { recursive: true })];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                console.error("Error removing .git folder:", err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
export var setupGitRepository = function (projectPath) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, execAsync("cd ".concat(projectPath, " && git init && git add . && git commit -m \"Initial commit\""))];
            case 1:
                _a.sent();
                console.log("Git repository initialized and first commit made.");
                return [2 /*return*/];
        }
    });
}); };
export var cloneAndSetupTemplate = function (template, projectPath) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                validateTemplateExists(template.id);
                return [4 /*yield*/, execAsync("git clone ".concat(template.repo_url, " ").concat(projectPath))];
            case 1:
                _a.sent();
                return [4 /*yield*/, updatePackageJson(projectPath, template.packageName)];
            case 2:
                _a.sent();
                return [4 /*yield*/, removeGitFolder(projectPath)];
            case 3:
                _a.sent();
                return [4 /*yield*/, setupGitRepository(projectPath)];
            case 4:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
export var cloneTemplate = function (templateId, projectPath) { return __awaiter(void 0, void 0, void 0, function () {
    var template;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                template = TEMPLATES.find(function (t) { return t.id === templateId; });
                if (!template) {
                    throw new Error("Template not found");
                }
                return [4 /*yield*/, cloneAndSetupTemplate(template, projectPath)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
export var promptForProjectDetails = function (args) { return __awaiter(void 0, void 0, void 0, function () {
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
export var promptForTemplate = function () { return __awaiter(void 0, void 0, void 0, function () {
    var template, selectedTemplate;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, inquirer.prompt([
                    {
                        type: "list",
                        name: "template",
                        message: "Please specify a template: ",
                        choices: TEMPLATES.map(function (template) { return template.name; }),
                    },
                ])];
            case 1:
                template = (_a.sent()).template;
                selectedTemplate = TEMPLATES.find(function (t) { return t.name === template; });
                console.log("Creating project with template:", selectedTemplate.name);
                return [2 /*return*/, selectedTemplate];
        }
    });
}); };
export var promptForMonorepo = function () { return __awaiter(void 0, void 0, void 0, function () {
    var monorepo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, inquirer.prompt([
                    {
                        type: "confirm",
                        name: "monorepo",
                        message: "Would you like to use a monorepo with HardHat?",
                    },
                ])];
            case 1:
                monorepo = (_a.sent()).monorepo;
                return [2 /*return*/, monorepo];
        }
    });
}); };
export var createMonorepo = function (projectName, template) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fs.mkdir(projectName)];
            case 1:
                _a.sent();
                return [4 /*yield*/, execAsync("cd ".concat(projectName, " && npm init -y"))];
            case 2:
                _a.sent();
                return [4 /*yield*/, execAsync("cd ".concat(projectName, " && npm init -w ./packages/blockchain -y"))];
            case 3:
                _a.sent();
                return [4 /*yield*/, execAsync("cd ".concat(projectName, " && npm init -w ./packages/site -y"))];
            case 4:
                _a.sent();
                return [4 /*yield*/, fs.rm(path.join(projectName, "packages", "blockchain", "package.json"))];
            case 5:
                _a.sent();
                return [4 /*yield*/, fs.rm(path.join(projectName, "packages", "site", "package.json"))];
            case 6:
                _a.sent();
                return [4 /*yield*/, fs.rm(path.join(projectName, "node_modules"), { recursive: true })];
            case 7:
                _a.sent();
                return [4 /*yield*/, cloneTemplate(template.id, path.join(projectName, "packages", "site"))];
            case 8:
                _a.sent();
                return [4 /*yield*/, createGitIgnore(projectName)];
            case 9:
                _a.sent();
                return [4 /*yield*/, execAsync("git clone https://github.com/cxalem/hardhat-template.git ".concat(path.join(projectName, "packages", "blockchain")))];
            case 10:
                _a.sent();
                return [4 /*yield*/, fs.rm(path.join(projectName, "packages", "blockchain", ".git"), {
                        recursive: true,
                    })];
            case 11:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
export var createGitIgnore = function (projectPath) { return __awaiter(void 0, void 0, void 0, function () {
    var gitIgnorePath, gitIgnoreContent, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                gitIgnorePath = path.join(projectPath, ".gitignore");
                gitIgnoreContent = "node_modules\n";
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, fs.writeFile(gitIgnorePath, gitIgnoreContent)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                console.error("Error creating .gitignore file:", err_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
