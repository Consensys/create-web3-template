var _a;
import { http, createConfig } from "wagmi";
import { mainnet, sepolia, lineaTestnet } from "wagmi/chains";
import { metaMask } from "wagmi/connectors";
export var config = createConfig({
    chains: [lineaTestnet],
    connectors: [metaMask()],
    transports: (_a = {},
        _a[mainnet.id] = http(),
        _a[sepolia.id] = http(),
        _a[lineaTestnet.id] = http(),
        _a),
});
