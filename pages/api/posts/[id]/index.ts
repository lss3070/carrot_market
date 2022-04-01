

import twilio from 'twilio';
import next, { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { IResponseType } from '@libs/server/withHandler';
import { client } from '@libs/client/client';
import {createTransport} from 'nodemailer'
import { userInfo } from 'os';
import { withApiSession } from '@libs/server/withSession';
import TrustedComms from 'twilio/lib/rest/preview/TrustedComms';

async function handler(
    req:NextApiRequest,
    res:NextApiResponse<IResponseType>
){
   const {query:{id}}=req;

   console.log(id);
   const post = await client.post.findUnique({
       where:{
           id:+id.toString(),
       },
       include:{
           user:{
               select:{
                   id:true,
                   name:true,
                   avatar:true
               }
           },
           answers:{
               select:{
                   answer:true,
                   id:true,
                   user:{
                       select:{
                           id:true,
                           name:true,
                           avatar:true
                       }
                   }
               }
           },
           _count:{
               select:{
                   answers:true,
                   wonderings:true
               }
           }
       }
   })
   console.log(post);
   
   res.json({
       ok:true,
       post
   })
}

export default withApiSession(withHandler({
    methods:["GET"],
    handler
}));