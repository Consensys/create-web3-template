// async function handleProjectCreation(args: string): Promise<void> {
//   try {
//     // Prompt user for project details if not provided
//     const projectName = await promptForProjectDetails(args);
export {};
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
