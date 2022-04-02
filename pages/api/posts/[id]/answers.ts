

import twilio from 'twilio';
import next, { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { IResponseType } from '@libs/server/withHandler';
import { client } from '@libs/client/client';
import {createTransport} from 'nodemailer'

import { withApiSession } from '@libs/server/withSession';
import TrustedComms from 'twilio/lib/rest/preview/TrustedComms';

async function handler(
    req:NextApiRequest,
    res:NextApiResponse<IResponseType>
){
    const {
        query:{id},
       session:{user},
       body:{answer}
    }= req;

   const newAnswer = await client.answer.create({
        data:{
            user:{
                connect:{
                    id:user?.id
                }
            },
            post:{
                connect:{
                    id:+id.toString(),
                }
            },
            answer
        }
   })
   console.log(newAnswer);


   res.json({
       ok:true,
       answer:newAnswer
   })
}

export default withApiSession(withHandler({
    methods:["POST"],
    handler
}));