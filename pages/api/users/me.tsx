

import twilio from 'twilio';
import next, { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { IResponseType } from '@libs/server/withHandler';
import { client } from '@libs/client/client';
import {createTransport} from 'nodemailer'
import { userInfo } from 'os';
import { withApiSession } from '@libs/server/withSession';

async function handler(
    req:NextApiRequest,
    res:NextApiResponse<IResponseType>
){

    const profile = await client.user.findUnique({where:{
        id:req.session.user?.id
    }})
    res.json({
        ok:true,
        profile
    })
}

export default withApiSession(withHandler("GET",handler));