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
import { beforeEach, expect, it, vi } from "vitest";
import { fs, vol } from "memfs";
import { removeGitFolder, createGitIgnore, cloneTemplate, updatePackageJson, } from "../utils/index.js";
import os from "os";
import path from "path";
var TEST_REPO_PATH = "/test-repo";
// Mock the node fs and fs/promises modules to use memfs
vi.mock("fs", function () { return fs; });
vi.mock("fs/promises", function () { return fs.promises; });
// Mocked functions
vi.fn().mockImplementation(removeGitFolder);
vi.fn().mockImplementation(createGitIgnore);
vi.fn().mockImplementation(cloneTemplate);
vi.fn().mockImplementation(updatePackageJson);
beforeEach(function () {
    // Reset the state of in-memory fs
    vol.reset();
});
it("Should remove the .git folder", function () { return __awaiter(void 0, void 0, void 0, function () {
    var isGitFolderRemoved;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fs.mkdirSync(TEST_REPO_PATH, { recursive: true });
                fs.writeFileSync("".concat(TEST_REPO_PATH, "/.git"), "node_modules");
                return [4 /*yield*/, removeGitFolder(TEST_REPO_PATH)];
            case 1:
                isGitFolderRemoved = _a.sent();
                expect(isGitFolderRemoved).toBe(true);
                return [2 /*return*/];
        }
    });
}); });
it("Should create a .gitignore file", function () { return __awaiter(void 0, void 0, void 0, function () {
    var gitIgnoreContent;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fs.mkdirSync(TEST_REPO_PATH, {
                    recursive: true,
                });
                return [4 /*yield*/, createGitIgnore(TEST_REPO_PATH)];
            case 1:
                _a.sent();
                gitIgnoreContent = fs.readFileSync("".concat(TEST_REPO_PATH, "/.gitignore"), "utf-8");
                expect(gitIgnoreContent).toBe("node_modules\n");
                return [2 /*return*/];
        }
    });
}); });
it("Should update the package.json file", function () { return __awaiter(void 0, void 0, void 0, function () {
    var packageJson, tempBaseDir, tempDir, updatedPackageJsonName;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                packageJson = {
                    name: "test-repo",
                    version: "1.0.0",
                    description: "A test repo",
                };
                tempBaseDir = os.tmpdir();
                if (!fs.existsSync(tempBaseDir)) {
                    fs.mkdirSync(tempBaseDir, { recursive: true });
                }
                tempDir = fs.mkdtempSync(path.join(tempBaseDir, "test-repo-"));
                fs.writeFileSync("/".concat(tempDir, "/package.json"), JSON.stringify(packageJson));
                return [4 /*yield*/, updatePackageJson(TEST_REPO_PATH, "test-repo-updated")];
            case 1:
                updatedPackageJsonName = _a.sent();
                expect(updatedPackageJsonName).toBe("asdas");
                return [2 /*return*/];
        }
    });
}); });
// it("Should clone a template to a directory", async () => {
//   const templateId = "react-web3-starter";
//   // Ensure the tmp directory is writable and exists
//   const tempBaseDir = os.tmpdir();
//   if (!fs.existsSync(tempBaseDir)) {
//     fs.mkdirSync(tempBaseDir, { recursive: true });
//   }
//   const tempDir = fs.mkdtempSync(path.join(tempBaseDir, "test-repo-")) as string;
//   await cloneTemplate(templateId, tempDir);
//   const files = fs.readdirSync(tempDir);
//   console.log("Files in the directory:", files);
//   expect(files).toContain("package.json");
//   // Clean up the temporary directory after the test
//   fs.rmSync(tempDir, { recursive: true, force: true });
// });
