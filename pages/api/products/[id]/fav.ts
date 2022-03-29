



import twilio from 'twilio';
import next, { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { IResponseType } from '@libs/server/withHandler';
import { client } from '@libs/client/client';
import {createTransport} from 'nodemailer'
import { withApiSession } from '@libs/server/withSession';

async function handler(
    req:NextApiRequest,
    res:NextApiResponse<IResponseType>
){
    const {query:{id},
    session:{user}}=req;
    const alreadyExists = await client.fav.findFirst({
        where:{
            productId: +id.toString(),
            userId:user?.id
        }
    })
    if(alreadyExists){
        await client.fav.delete({
            where:{
                id:alreadyExists.id
            }
        })
    }else{
        await client.fav.create({
            data:{
                user:{
                    connect:{
                        id:user?.id
                    }
                },
                product:{
                    connect:{
                        id:+id.toString()
                    }
                }
            }
        })
    }
    res.json({ok:true});
}

export default withApiSession(withHandler({
    methods:["POST"],
    handler
}));

