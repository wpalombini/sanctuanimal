import { v2 as cloudinary } from 'cloudinary';
import { NextApiRequest, NextApiResponse } from 'next';

import { auth } from '@/lib/firebase/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await auth.verifyIdToken(req.cookies['app-auth'] || '');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(`Error verifying token: ${error?.message}`, error);
    res.status(401).send(error);
    return;
  }

  const body = JSON.parse(req.body) || {};
  const { paramsToSign } = body;

  const apiSecret = process.env.CLOUDINARY_API_SECRET as string;

  try {
    const signature = cloudinary.utils.api_sign_request(paramsToSign, apiSecret);

    res.status(200).json({ signature });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(`Error signing params: ${error?.message}`, error);
    res.status(500).send(error);
  }
}
