// pages/api/data.ts
import pool from '../../db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getAllData(_: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT nim,fullname FROM user_informatics');
    res.status(200).json(result.rows);
    client.release();
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}