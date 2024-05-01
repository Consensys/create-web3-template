"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var network_helpers_1 = require("@nomicfoundation/hardhat-toolbox/network-helpers");
var withArgs_1 = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
var chai_1 = require("chai");
var hardhat_1 = __importDefault(require("hardhat"));
describe("Lock", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    function deployOneYearLockFixture() {
        return __awaiter(this, void 0, void 0, function () {
            var ONE_YEAR_IN_SECS, ONE_GWEI, lockedAmount, unlockTime, _a, owner, otherAccount, Lock, lock;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
                        ONE_GWEI = 1000000000;
                        lockedAmount = ONE_GWEI;
                        return [4 /*yield*/, network_helpers_1.time.latest()];
                    case 1:
                        unlockTime = (_b.sent()) + ONE_YEAR_IN_SECS;
                        return [4 /*yield*/, hardhat_1.default.ethers.getSigners()];
                    case 2:
                        _a = _b.sent(), owner = _a[0], otherAccount = _a[1];
                        return [4 /*yield*/, hardhat_1.default.ethers.getContractFactory("Lock")];
                    case 3:
                        Lock = _b.sent();
                        return [4 /*yield*/, Lock.deploy(unlockTime, { value: lockedAmount })];
                    case 4:
                        lock = _b.sent();
                        return [2 /*return*/, { lock: lock, unlockTime: unlockTime, lockedAmount: lockedAmount, owner: owner, otherAccount: otherAccount }];
                }
            });
        });
    }
    describe("Deployment", function () {
        it("Should set the right unlockTime", function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, lock, unlockTime, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, (0, network_helpers_1.loadFixture)(deployOneYearLockFixture)];
                        case 1:
                            _a = _c.sent(), lock = _a.lock, unlockTime = _a.unlockTime;
                            _b = chai_1.expect;
                            return [4 /*yield*/, lock.unlockTime()];
                        case 2:
                            _b.apply(void 0, [_c.sent()]).to.equal(unlockTime);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it("Should set the right owner", function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, lock, owner, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, (0, network_helpers_1.loadFixture)(deployOneYearLockFixture)];
                        case 1:
                            _a = _c.sent(), lock = _a.lock, owner = _a.owner;
                            _b = chai_1.expect;
                            return [4 /*yield*/, lock.owner()];
                        case 2:
                            _b.apply(void 0, [_c.sent()]).to.equal(owner.address);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it("Should receive and store the funds to lock", function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, lock, lockedAmount, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, (0, network_helpers_1.loadFixture)(deployOneYearLockFixture)];
                        case 1:
                            _a = _c.sent(), lock = _a.lock, lockedAmount = _a.lockedAmount;
                            _b = chai_1.expect;
                            return [4 /*yield*/, hardhat_1.default.ethers.provider.getBalance(lock.target)];
                        case 2:
                            _b.apply(void 0, [_c.sent()]).to.equal(lockedAmount);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it("Should fail if the unlockTime is not in the future", function () {
            return __awaiter(this, void 0, void 0, function () {
                var latestTime, Lock;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, network_helpers_1.time.latest()];
                        case 1:
                            latestTime = _a.sent();
                            return [4 /*yield*/, hardhat_1.default.ethers.getContractFactory("Lock")];
                        case 2:
                            Lock = _a.sent();
                            return [4 /*yield*/, (0, chai_1.expect)(Lock.deploy(latestTime, { value: 1 })).to.be.revertedWith("Unlock time should be in the future")];
                        case 3:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
    describe("Withdrawals", function () {
        describe("Validations", function () {
            it("Should revert with the right error if called too soon", function () {
                return __awaiter(this, void 0, void 0, function () {
                    var lock;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, (0, network_helpers_1.loadFixture)(deployOneYearLockFixture)];
                            case 1:
                                lock = (_a.sent()).lock;
                                return [4 /*yield*/, (0, chai_1.expect)(lock.withdraw()).to.be.revertedWith("You can't withdraw yet")];
                            case 2:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            });
            it("Should revert with the right error if called from another account", function () {
                return __awaiter(this, void 0, void 0, function () {
                    var _a, lock, unlockTime, otherAccount;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, (0, network_helpers_1.loadFixture)(deployOneYearLockFixture)];
                            case 1:
                                _a = _b.sent(), lock = _a.lock, unlockTime = _a.unlockTime, otherAccount = _a.otherAccount;
                                // We can increase the time in Hardhat Network
                                return [4 /*yield*/, network_helpers_1.time.increaseTo(unlockTime)];
                            case 2:
                                // We can increase the time in Hardhat Network
                                _b.sent();
                                // We use lock.connect() to send a transaction from another account
                                return [4 /*yield*/, (0, chai_1.expect)(lock.connect(otherAccount).withdraw()).to.be.revertedWith("You aren't the owner")];
                            case 3:
                                // We use lock.connect() to send a transaction from another account
                                _b.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            });
            it("Shouldn't fail if the unlockTime has arrived and the owner calls it", function () {
                return __awaiter(this, void 0, void 0, function () {
                    var _a, lock, unlockTime;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, (0, network_helpers_1.loadFixture)(deployOneYearLockFixture)];
                            case 1:
                                _a = _b.sent(), lock = _a.lock, unlockTime = _a.unlockTime;
                                // Transactions are sent using the first signer by default
                                return [4 /*yield*/, network_helpers_1.time.increaseTo(unlockTime)];
                            case 2:
                                // Transactions are sent using the first signer by default
                                _b.sent();
                                return [4 /*yield*/, (0, chai_1.expect)(lock.withdraw()).not.to.be.reverted];
                            case 3:
                                _b.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            });
        });
        describe("Events", function () {
            it("Should emit an event on withdrawals", function () {
                return __awaiter(this, void 0, void 0, function () {
                    var _a, lock, unlockTime, lockedAmount;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, (0, network_helpers_1.loadFixture)(deployOneYearLockFixture)];
                            case 1:
                                _a = _b.sent(), lock = _a.lock, unlockTime = _a.unlockTime, lockedAmount = _a.lockedAmount;
                                return [4 /*yield*/, network_helpers_1.time.increaseTo(unlockTime)];
                            case 2:
                                _b.sent();
                                return [4 /*yield*/, (0, chai_1.expect)(lock.withdraw())
                                        .to.emit(lock, "Withdrawal")
                                        .withArgs(lockedAmount, withArgs_1.anyValue)];
                            case 3:
                                _b.sent(); // We accept any value as `when` arg
                                return [2 /*return*/];
                        }
                    });
                });
            });
        });
        describe("Transfers", function () {
            it("Should transfer the funds to the owner", function () {
                return __awaiter(this, void 0, void 0, function () {
                    var _a, lock, unlockTime, lockedAmount, owner;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, (0, network_helpers_1.loadFixture)(deployOneYearLockFixture)];
                            case 1:
                                _a = _b.sent(), lock = _a.lock, unlockTime = _a.unlockTime, lockedAmount = _a.lockedAmount, owner = _a.owner;
                                return [4 /*yield*/, network_helpers_1.time.increaseTo(unlockTime)];
                            case 2:
                                _b.sent();
                                return [4 /*yield*/, (0, chai_1.expect)(lock.withdraw()).to.changeEtherBalances([owner, lock], [lockedAmount, -lockedAmount])];
                            case 3:
                                _b.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            });
        });
    });
});
