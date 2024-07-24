import { beforeEach, expect, it, vi } from "vitest";
import { fs, vol } from "memfs";
import {
  removeGitFolder,
  createGitIgnore,
  cloneTemplate,
  updatePackageJson,
} from "../utils/index.js";
import os from "os";
import path from "path";

const TEST_REPO_PATH = "/test-repo";

// Mock the node fs and fs/promises modules to use memfs
vi.mock("fs", () => fs);
vi.mock("fs/promises", () => fs.promises);

// Mocked functions
vi.fn().mockImplementation(removeGitFolder);
vi.fn().mockImplementation(createGitIgnore);
vi.fn().mockImplementation(cloneTemplate);
vi.fn().mockImplementation(updatePackageJson);

beforeEach(() => {
  // Reset the state of in-memory fs
  vol.reset();
});

it("Should remove the .git folder", async () => {
  fs.mkdirSync(TEST_REPO_PATH, { recursive: true });
  fs.writeFileSync(`${TEST_REPO_PATH}/.git`, "node_modules");

  const isGitFolderRemoved = await removeGitFolder(TEST_REPO_PATH);

  expect(isGitFolderRemoved).toBe(true);
});

it("Should create a .gitignore file", async () => {
  fs.mkdirSync(TEST_REPO_PATH, {
    recursive: true,
  });

  await createGitIgnore(TEST_REPO_PATH);
  const gitIgnoreContent = fs.readFileSync(
    `${TEST_REPO_PATH}/.gitignore`,
    "utf-8"
  );

  expect(gitIgnoreContent).toBe("node_modules\n");
});

it("Should update the package.json file", async () => {
  const packageJson = {
    name: "test-repo",
    version: "1.0.0",
    description: "A test repo",
  };

  const tempBaseDir = os.tmpdir();
  if (!fs.existsSync(tempBaseDir)) {
    fs.mkdirSync(tempBaseDir, { recursive: true });
  }

  const tempDir = fs.mkdtempSync(path.join(tempBaseDir, "test-repo-")) as string;

  fs.writeFileSync(
    `/${tempDir}/package.json`,
    JSON.stringify(packageJson)
  );

  const updatedPackageJsonName = await updatePackageJson(
    TEST_REPO_PATH,
    "test-repo-updated"
  );

  expect(updatedPackageJsonName).toBe("asdas");
});

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
