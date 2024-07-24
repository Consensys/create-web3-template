import { createPublicClient, http } from "viem";
import { linea } from "viem/chains";
export var client = createPublicClient({
    chain: linea,
    transport: http(),
});
