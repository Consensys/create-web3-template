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
import { cloneTemplate, promptForMonorepo, promptForProjectDetails, promptForTemplate, } from "./commands/create.js";
import fs from "fs";
import { execSync } from "child_process";
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var program;
        var _this = this;
        return __generator(this, function (_a) {
            program = new Command()
                .name("create-web3-template")
                .description("Web3 starter template CLI tool.")
                .arguments("[project-name]")
                .action(function (args) { return __awaiter(_this, void 0, void 0, function () {
                var projectName, template, isMonorepo, nodeModulesPath, gitPath, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 8, , 9]);
                            return [4 /*yield*/, promptForProjectDetails(args)];
                        case 1:
                            projectName = _a.sent();
                            return [4 /*yield*/, promptForTemplate()];
                        case 2:
                            template = _a.sent();
                            if (!template)
                                throw new Error("Template not found");
                            return [4 /*yield*/, promptForMonorepo()];
                        case 3:
                            isMonorepo = _a.sent();
                            if (!isMonorepo) return [3 /*break*/, 5];
                            fs.mkdirSync(projectName);
                            execSync("cd ".concat(projectName, " && npm init -y"));
                            execSync("cd ".concat(projectName, " && npm init -w ./packages/blockchain -y"));
                            execSync("cd ".concat(projectName, " && npm init -w ./packages/site -y"));
                            // When we clone the repo we get a package.json file with all the dependencies, so these are not needed
                            fs.rmSync("".concat(projectName, "/packages/blockchain/package.json"));
                            fs.rmSync("".concat(projectName, "/packages/site/package.json"));
                            nodeModulesPath = "".concat(projectName, "/node_modules");
                            fs.rmSync(nodeModulesPath, { recursive: true });
                            execSync("git clone https://github.com/cxalem/hardhat-template.git ".concat(projectName, "/packages/blockchain"));
                            gitPath = "".concat(projectName, "/packages/blockchain/.git");
                            fs.rmSync(gitPath, { recursive: true });
                            return [4 /*yield*/, cloneTemplate(template.id, "".concat(projectName, "/packages/site"))];
                        case 4:
                            _a.sent();
                            return [3 /*break*/, 7];
                        case 5: return [4 /*yield*/, cloneTemplate(template.id, projectName)];
                        case 6:
                            _a.sent();
                            _a.label = 7;
                        case 7: return [3 /*break*/, 9];
                        case 8:
                            error_1 = _a.sent();
                            console.error("An error occurred while creating the project:", error_1);
                            return [3 /*break*/, 9];
                        case 9: return [2 /*return*/];
                    }
                });
            }); })
                .version("0.0.2");
            program.parse(process.argv);
            return [2 /*return*/];
        });
    });
}
main();
