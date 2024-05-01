"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var modules_1 = require("@nomicfoundation/hardhat-ignition/modules");
var JAN_1ST_2030 = 1893456000;
var ONE_GWEI = 1000000000n;
var LockModule = (0, modules_1.buildModule)("LockModule", function (m) {
    var unlockTime = m.getParameter("unlockTime", JAN_1ST_2030);
    var lockedAmount = m.getParameter("lockedAmount", ONE_GWEI);
    var lock = m.contract("Lock", [unlockTime], {
        value: lockedAmount,
    });
    return { lock: lock };
});
exports.default = LockModule;
