

import twilio from 'twilio';
import next, { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { IResponseType } from '@libs/server/withHandler';
import { client } from '@libs/client/client';
import {createTransport} from 'nodemailer'
import { userInfo } from 'os';
import { withApiSession } from '@libs/server/withSession';
import TrustedComms from 'twilio/lib/rest/preview/TrustedComms';
import Id from 'pages/api/products/[id]';

async function handler(
    req:NextApiRequest,
    res:NextApiResponse<IResponseType>
){
   const {query:{id},session:{user}}=req;

   const alreadyExists = await client.wondering.findFirst({
    where:{
        userId:user?.id,
        postId:+id.toString()
    },
    select:{
        id:true
    }
});
console.log('!@');
console.log(alreadyExists)

    if(alreadyExists){
        await client.wondering.delete({
            where:{
                id:alreadyExists.id,
            }
        })
    }else {
        await client.wondering.create({
            data:{
                user:{
                    connect:{
                        id:user?.id
                    }
                },
                post:{
                    connect:{
                        id:+id.toString()
                    }
                }
            }
        });
    }
   res.json({
       ok:true
   })
}


export default withApiSession(withHandler({
    methods:["POST"],
    handler
}));