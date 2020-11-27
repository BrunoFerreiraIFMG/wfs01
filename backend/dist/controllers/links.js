"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const linksRepository_1 = __importDefault(require("../models/linksRepository"));
//const links: Link[] = [];
//let proxId = 1;
function generateCode() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWYXZabcdefghijklmnopqrstuvwyxz0123456789';
    for (let i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
function postLink(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const link = req.body;
        //link.id = proxId++;
        link.code = generateCode();
        link.hits = 0;
        //links.push(link);
        //res.status(201).json(link);
        const result = yield linksRepository_1.default.add(link);
        if (!result.id)
            res.status(400);
        else
            res.status(201).json(result);
    });
}
function getLink(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const code = req.params.code;
        const link = yield linksRepository_1.default.findByCode(code);
        console.log('------------' + code);
        console.log(JSON.stringify(link));
        if (!link)
            res.sendStatus(404);
        else
            res.json(link);
        /*
        const link = links.find(item => item.code === code);
    
        if (!link)
          res.sendStatus(404);
        else
          res.json(link)
        */
        //res.send('GET');
    });
}
function hitLink(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const code = req.params.code;
        //const index = links.findIndex(item => item.code === code);
        const link = yield linksRepository_1.default.hit(code);
        /*if (index === -1)
          res.sendStatus(404);
        else {
            links[index].hits!++
            res.json(links[index]);
        }
        */
        if (!link)
            res.sendStatus(404);
        else {
            res.json(link);
        }
        //res.send('GET/stats');
    });
}
exports.default = { postLink, getLink, hitLink };
