

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
    const {body:{question},session:{user}}=req;
    const post = await client.post.create({
        data:{
            question,
            user:{
                connect:{
                    id:user?.id
                }
            }
        }
    })
    res.json({
        ok:true,
        post
    })
}

export default withApiSession(withHandler({
    methods:["POST"],
    handler
}));