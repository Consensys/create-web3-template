"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
var wagmi_1 = require("wagmi");
var wagmi_config_1 = require("@/wagmi.config");
var react_query_1 = require("@tanstack/react-query");
var sdk_react_1 = require("@metamask/sdk-react");
var viem_1 = require("viem");
var chains_1 = require("viem/chains");
exports.client = (0, viem_1.createPublicClient)({
    chain: chains_1.linea,
    transport: (0, viem_1.http)(),
});
var queryClient = new react_query_1.QueryClient();
var Provider = function (_a) {
    var children = _a.children;
    var host = typeof window !== "undefined" ? window.location.host : "defaultHost";
    var sdkOptions = {
        logging: { developerMode: false },
        checkInstallationImmediately: false,
        dappMetadata: {
            name: "RAD Starter",
            url: host,
        },
    };
    return (<sdk_react_1.MetaMaskProvider debug={false} sdkOptions={sdkOptions}>
      <wagmi_1.WagmiProvider config={wagmi_config_1.config}>
        <react_query_1.QueryClientProvider client={queryClient}>
          {children}
        </react_query_1.QueryClientProvider>
      </wagmi_1.WagmiProvider>
    </sdk_react_1.MetaMaskProvider>);
};
exports.default = Provider;
