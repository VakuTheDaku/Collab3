// pages/api/upload.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { uploadAudio } from '../utils/uploadAudio';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const fileName = await uploadAudio(req);
    res.status(200).json({ fileName });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
