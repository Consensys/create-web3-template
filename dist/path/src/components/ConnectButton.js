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
import { useState } from "react";
import { useChainId, useConnect, useDisconnect, useAccount } from "wagmi";
export function ConnectWalletButton() {
    var _this = this;
    var chainId = useChainId();
    var _a = useDisconnect(), disconnect = _a.disconnect, isDisconnecting = _a.isPending;
    var _b = useConnect(), connectors = _b.connectors, connect = _b.connect, isConnecting = _b.isPending, connectError = _b.error;
    var _c = useAccount(), address = _c.address, isConnected = _c.isConnected;
    var _d = useState(null), error = _d[0], setError = _d[1];
    var handleDisconnect = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                setError(null);
                disconnect();
            }
            catch (err) {
                setError("Failed to disconnect");
            }
            return [2 /*return*/];
        });
    }); };
    return (<div className="flex flex-col items-center p-4">
      {isConnected ? (<div className="flex gap-4 items-center">
          <div className="w-40 truncate" title={address}>
            {address}
          </div>
          <button className={"bg-red-800 text-red-100 px-4 py-2 rounded-md shadow-md duration-150 ".concat(isDisconnecting
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-opacity-80 hover:shadow-lg")} onClick={handleDisconnect} type="button" disabled={isDisconnecting}>
            {isDisconnecting ? "Disconnecting..." : "Disconnect"}
          </button>
        </div>) : (<div className="flex flex-col items-center">
          {connectors.map(function (connector) { return (<button key={connector.id} onClick={function () { return connect({ connector: connector, chainId: chainId }); }} type="button" className={"bg-gray-800 text-white px-4 py-2 rounded-md mt-2 ".concat(isConnecting
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-opacity-80")} disabled={isConnecting}>
              {isConnecting
                    ? "Connecting..."
                    : "Connect with ".concat(connector.name)}
            </button>); })}
        </div>)}
      {(error || connectError) && (<div className="text-red-500 mt-2">
          {error || (connectError === null || connectError === void 0 ? void 0 : connectError.message)}
        </div>)}
    </div>);
}
