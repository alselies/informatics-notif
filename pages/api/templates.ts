// pages/api/data.ts
import pool from '../../db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getAllData(_: NextApiRequest, res: NextApiResponse) {

  const response = await fetch(process.env.API_GET_TEMPLATE || '', {
    headers: {
      'Authorization': `Bearer ${process.env.API_TOKEN}`
    }
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const resp = await response.json();
  res.status(200).json(resp.data); // This sends the response data back to the client

}