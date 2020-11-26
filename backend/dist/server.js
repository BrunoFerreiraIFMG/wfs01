"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
//database.sync({force: true});
console.log('Database connection running.');
app_1.default.listen(3001);
console.log('Server running at 3001');
