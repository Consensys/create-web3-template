# Create Web3 Template CLI

This is a CLI tool that scaffolds Next.js and React projects with a focus on Web3 development.

## Features

- **Framework Options**: Choose between [Next.js](https://nextjs.org/) and [React with Vite](https://vitejs.dev/) for your frontend application.
- **Blockchain Tooling**: Select either [Hardhat](https://hardhat.org/) or [Foundry](https://getfoundry.sh/) for smart contract development.
- **Package Manager Choice**: Use your preferred package manager: **npm**, **yarn**, or **pnpm**.
- **TypeScript Support**: Write strongly-typed code with built-in TypeScript support.
- **Tailwind CSS**: Style your application with utility-first CSS.
- **Viem and Wagmi**: Integrate with Ethereum using [Viem](https://viem.sh/) and [Wagmi](https://wagmi.sh/) libraries.
- **Monorepo Setup**: Organize your frontend and smart contracts in a monorepo structure.

## Getting Started

### Installation

To create a new project using the Web3 Template CLI, run one of the following commands:

Using **pnpm**:

```bash
pnpm create @consensys/create-web3-template [project-name]
```

Using **npx**:

```bash
npx @consensys/create-web3-template [project-name]
```

### Interactive Setup

After running the command, the CLI will guide you through the setup process with the following prompts:

1. **Project Name**: Specify a name for your project if not provided in the command.
2. **Framework Selection**: Choose between **Next.js** and **React (Vite)**.
3. **Blockchain Tooling**: Select **Hardhat** or **Foundry** for smart contract development.
4. **Package Manager**: Choose your preferred package manager: **npm**, **yarn**, or **pnpm**.

### Example

```bash
npx @consensys/create-web3-template my-web3-project
```

## Project Structure

The generated project will have the following structure:

```
my-web3-project/
├── packages/
│   ├── blockchain/    # Smart contracts and blockchain tooling
│   └── site/          # Frontend application (Next.js or React)
├── pnpm-workspace.yaml (if using pnpm)
├── package.json
└── .gitignore
```

- **packages/blockchain**: Contains your smart contracts and related tooling.
- **packages/site**: Contains your frontend application.

## Installing Dependencies

Navigate to your project directory and install the dependencies:

```bash
cd my-web3-project

# If you chose pnpm
pnpm install

# If you chose npm
npm install

# If you chose yarn
yarn install
```

## Running the Application

### Backend (Smart Contracts)

Navigate to the `blockchain` package to work on your smart contracts.

```bash
cd packages/blockchain
```

- **Hardhat Users**: Refer to the [Hardhat documentation](https://hardhat.org/getting-started/) for commands to compile, test, and deploy your contracts.
- **Foundry Users**: Refer to the [Foundry Book](https://book.getfoundry.sh/) for instructions on using Foundry.

### Frontend Application

Navigate to the `site` package to run your frontend application.

```bash
cd packages/site

# Start the development server
# Using pnpm
pnpm run dev

# Using npm
npm run dev

# Using yarn
yarn dev
```

The development server will start, and you can view your application in the browser.

## Wagmi Configuration

The project includes a default **Wagmi** configuration for connecting to the Linea Testnet. You can find this configuration in the `wagmi.config.ts` file in your frontend application:

```
import { http, createConfig } from "wagmi";
import { lineaTestnet } from "wagmi/chains";
import { metaMask } from "wagmi/connectors";

export const config = createConfig({
  chains: [lineaTestnet],
  connectors: [metaMask()],
  transports: {
    [lineaTestnet.id]: http(),
  },
});
```

Feel free to modify this configuration to connect to different networks or use different connectors.

## Monorepo Management

This project uses a monorepo structure to keep your frontend and backend code organized and in sync.

- **Package Management**: If you selected **pnpm**, a `pnpm-workspace.yaml` file is included to manage the monorepo packages.
- **Scripts**: Each package (`blockchain` and `site`) can have its own scripts. Navigate into each package directory to run and manage scripts specific to that package.

## Customization

After project creation, you can customize the setup according to your needs:

- **Add Dependencies**: Install additional npm packages as required.
- **Modify Configurations**: Update Tailwind CSS, TypeScript, or other configurations.
- **Update Smart Contracts**: Write and deploy your own smart contracts using Hardhat or Foundry.

## Contributing

Contributions are welcome! If you have suggestions or find issues, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

---
