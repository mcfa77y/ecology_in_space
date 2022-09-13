// default port to listen
import { Request, Response } from 'express';
import { createClient, PhotosWithTotalResults } from 'pexels';

import express from "express";
import cors from "cors";
import {createReadStream} from 'fs';
import { promises as fs } from 'fs';
import csv from 'csv-parser';
import {createObjectCsvWriter} from 'csv-writer';

const app = express();
const port = 8080;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const client = createClient('563492ad6f9170000100000162fc518a9ac1458495bd67f6bee1a3c0');


const cachedImageUrl = new Map<string, string>();

type CachedUrl = {
    QUERY: string;
    URL: string;
}
const results: CachedUrl[] = [];
const CACHED_IMAGE_URI = 'cachedImageUrl.csv';


const csvWriter = createObjectCsvWriter({
    path: CACHED_IMAGE_URI,
    header: [
      {id: 'query', title: 'QUERY'},
      {id: 'url', title: 'URL'},
    ],
    append: true
  });

createReadStream(CACHED_IMAGE_URI)
  .pipe(csv())
  .on('data', (data: CachedUrl) => {
    results.push(data)})
  .on('end', () => {
    console.log("Read in cached image urls.");
    results.forEach(({QUERY, URL}) => {
        cachedImageUrl.set(QUERY.trim().toLocaleLowerCase(), URL);
    })
  });

  for(let key of Array.from( cachedImageUrl.keys()) ) {
    console.log(`[post images] key: ${key}`);
 }

// define a route handler for the default home page
app.post( "/images", async ( req: Request<{}, {}, {color:string, name:string}>, res:Response ) => {
    const {name, color} = req.body;
    const sanitizeName = name.trim().toLowerCase();
    let imageUrl = '';
    if (cachedImageUrl.get(sanitizeName)){
        imageUrl = cachedImageUrl.get(sanitizeName) || '';
    } else {
        const imageResponse = await client.photos.search({
            query: name,
            page: 1,
            per_page: 15,
            size: 'small',
            color: color,
            orientation: 'square',
        });
        // choice
        const photoList = (imageResponse as PhotosWithTotalResults).photos;
        const photo = photoList[Math.floor(Math.random()*photoList.length)];
        imageUrl = photo.src.medium ||'';
        cachedImageUrl.set(sanitizeName, imageUrl)
        csvWriter.writeRecords([{query: sanitizeName, url: imageUrl}])
    }
    res.send({result: imageUrl});
} );

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
