This is a CLI tool which scaffolds Next.js and React projects with a focus on web3 development.

# Create Web3 Template CLI

To create a new project using the Web3 Template CLI, run the following command:

```bash
pnpm create @consensys/create-web3-template [project-name]
```
or
```bash
npx @consensys/create-web3-template [project-name]
```

This will create a new directory with the specified project name and scaffold a new project with the following features:

- Next.js or React (Vite)
- Foundry or Hardhat
- TypeScript
- Tailwind CSS
- Viem
- Wagmi

After the project is created, you can navigate to the new directory and run the following commands:

```bash
pnpm install || npm install
```
and

```bash
pnpm run dev || npm run dev
```
