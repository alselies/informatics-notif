// pages/api/data.ts
import pool from '../../db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getAllData(request: NextApiRequest, res: NextApiResponse) {

    console.log(request.body)
  
  res.status(200).json({message:"ok"}); // This sends the response data back to the client

}