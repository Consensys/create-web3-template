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
import fs from "fs";
import { TEMPLATES } from "../templates.js";
var validateTemplateExists = function (input) {
    if (!input) {
        throw new Error("Template not found");
    }
    return true;
};
var cloneAndSetupTemplate = function (template, path) {
    validateTemplateExists(template.id);
    execSync("git clone ".concat(template.repo_url, " ").concat(path));
    var packageJsonPath = "".concat(path, "/package.json");
    var packageJson = fs.readFileSync(packageJsonPath, "utf-8");
    var newPackageJson = packageJson.replace(template.packageName, path.split("/")[0]);
    fs.writeFileSync(packageJsonPath, newPackageJson);
    removeGitFolder(path);
    setupGitRepository(path);
};
export function cloneTemplate(templateId, path) {
    return __awaiter(this, void 0, void 0, function () {
        var template;
        return __generator(this, function (_a) {
            template = TEMPLATES.find(function (t) { return t.id === templateId; });
            if (!template) {
                throw new Error("Template not found");
            }
            cloneAndSetupTemplate(template, path);
            return [2 /*return*/];
        });
    });
}
var removeGitFolder = function (projectName) {
    var gitPath = "".concat(projectName, "/.git");
    fs.rm(gitPath, { recursive: true }, function (err) {
        if (err) {
            console.error(err);
        }
    });
    console.log("Project created successfully.");
};
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
                                message: "Please specify a name for your project: ",
                                validate: function (input) {
                                    if (!input) {
                                        return "Project name cannot be empty";
                                    }
                                    return true;
                                },
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
    });
}
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
var setupGitRepository = function (path) {
    execSync("cd ".concat(path, " && git init && git add . && git commit -m \"Initial commit\""));
    console.log("Git repository initialized and first commit made.");
};
export var createMonorepo = function (projectName, template) { return __awaiter(void 0, void 0, void 0, function () {
    var nodeModulesPath, gitPath;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fs.mkdirSync(projectName);
                execSync("cd ".concat(projectName, " && npm init -y"));
                execSync("cd ".concat(projectName, " && npm init -w ./packages/blockchain -y"));
                execSync("cd ".concat(projectName, " && npm init -w ./packages/site -y"));
                // When we clone the repo we get a package.json file with all the dependencies, so these are not needed
                fs.rmSync("".concat(projectName, "/packages/blockchain/package.json"));
                fs.rmSync("".concat(projectName, "/packages/site/package.json"));
                nodeModulesPath = "".concat(projectName, "/node_modules");
                fs.rmSync(nodeModulesPath, { recursive: true });
                return [4 /*yield*/, cloneTemplate(template.id, "".concat(projectName, "/packages/site"))];
            case 1:
                _a.sent();
                createGitIgnore(projectName);
                execSync("git clone https://github.com/cxalem/hardhat-template.git ".concat(projectName, "/packages/blockchain"));
                gitPath = "".concat(projectName, "/packages/blockchain/.git");
                fs.rmSync(gitPath, { recursive: true });
                return [2 /*return*/];
        }
    });
}); };
var createGitIgnore = function (path) {
    var gitIgnorePath = "".concat(path, "/.gitignore");
    var gitIgnoreContent = "node_modules\n";
    fs.writeFile(gitIgnorePath, gitIgnoreContent, function (err) {
        if (err) {
            console.error(err);
        }
    });
};
