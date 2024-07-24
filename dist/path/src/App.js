import { client } from "./providers/client";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { ConnectWalletButton } from "./components/ConnectButton";
export default function Home() {
    var _a = useAccount(), isConnected = _a.isConnected, address = _a.address;
    var _b = useState(null), blockNumber = _b[0], setBlockNumber = _b[1];
    useEffect(function () {
        client.getBlockNumber().then(function (block) {
            setBlockNumber(block);
        });
    }, []);
    return (<main className="relative flex flex-col items-center gap-20 min-h-screen mx-auto md:p-24">
      <div className="flex justify-center pt-10 md:pt-0 z-10 max-w-5xl w-full lg:items-center lg:justify-between font-mono text-sm lg:flex">
        <div className="absolute bottom-0 left-0 flex w-full items-end justify-center lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0" href="#" target="_blank" rel="noopener noreferrer">
            By RAD Team
          </a>
        </div>
        <ConnectWalletButton />
      </div>

      <div className="flex mt-52 flex-col items-center">
        <span className="text-3xl font-bold">Web3 Starter template</span>
        {isConnected && (<span className="text-sm font-mono font-medium max-w-md text-center text-gray-500">
            Connected to: {address}
          </span>)}

        <div className="text-sm font-mono font-medium max-w-md text-center text-gray-500">
          {!blockNumber ? ("Loading block number...") : (<div>Linea block number: {Number(blockNumber)}</div>)}
        </div>
      </div>
    </main>);
}
