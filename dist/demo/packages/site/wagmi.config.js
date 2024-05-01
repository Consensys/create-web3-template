"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
var wagmi_1 = require("wagmi");
var chains_1 = require("wagmi/chains");
var connectors_1 = require("wagmi/connectors");
exports.config = (0, wagmi_1.createConfig)({
    chains: [chains_1.mainnet, chains_1.linea, chains_1.lineaTestnet],
    connectors: [(0, connectors_1.metaMask)()],
    transports: (_a = {},
        _a[chains_1.mainnet.id] = (0, wagmi_1.http)(),
        _a[chains_1.linea.id] = (0, wagmi_1.http)(),
        _a[chains_1.lineaTestnet.id] = (0, wagmi_1.http)(),
        _a),
});
