import { Link } from './../models/link';
import {Request, Response} from 'express';
import linksRepository from '../models/linksRepository';

//const links: Link[] = [];
//let proxId = 1;

function generateCode(){
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWYXZabcdefghijklmnopqrstuvwyxz0123456789';

    for (let i=0; i<5; i++){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}


async function postLink(req: Request, res:Response){

    const link = req.body as Link;
    //link.id = proxId++;
    link.code = generateCode();
    link.hits = 0;

    //links.push(link);
    //res.status(201).json(link);
    const result = await linksRepository.add(link);

    if (!result.id)
      res.status(400);
    else res.status(201).json(result);
}

async function getLink(req: Request, res:Response){
    const code = req.params.code as string;

    const link = await linksRepository.findByCode(code);
    console.log('------------'+code);
    console.log(JSON.stringify(link));
    if (!link)
       res.sendStatus(404);
    else
       res.json(link) 


    /*
    const link = links.find(item => item.code === code);

    if (!link)
      res.sendStatus(404);
    else
      res.json(link)  
    */
    //res.send('GET');
}

async function hitLink(req: Request, res:Response){
    
    const code = req.params.code as string;

    //const index = links.findIndex(item => item.code === code);
    const link = await linksRepository.hit(code);

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
}

export default {postLink, getLink, hitLink};