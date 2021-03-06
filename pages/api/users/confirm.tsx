

import twilio from 'twilio';
import next, { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { IResponseType } from '@libs/server/withHandler';
import { client } from '@libs/client/client';
import {createTransport} from 'nodemailer'
import { withApiSession } from '../../../libs/server/withSession';


async function handler(
    req:NextApiRequest,
    res:NextApiResponse<IResponseType>
){
    const {token}=req.body;
    const foundToken= await client.token.findUnique({
        where:{
            payload:token
        },
        // include:{user:true},
    });
    if(!foundToken) return res.status(404).end();

    req.session.user={
        id:foundToken.userId
    }
    await req.session.save();
    await client.token.deleteMany({
        where:{
            userId:foundToken.userId
        }
    })
    res.json({ok:true});
}

export default withApiSession(withHandler({
    methods:["GET","POST"],
    handler,
    isPrivate:false
}));

