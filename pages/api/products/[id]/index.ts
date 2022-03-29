



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
    const {query:{id},session:{user}}=req;
    const cleanId= +id.toString()
    const product= await client.product.findUnique({
        where:{
            id:+id.toString()
        },
        include:{
            user:{
                select:{
                    id:true,
                    name:true,
                    avatar:true,
                }
            }
        }
    })
    const terms = product?.name.split(" ").map(word=>({
        name:{
            contains:word,
        }
    }));
    const relatedProducts = await client.product.findMany({
        where:{
            OR:terms,
            AND:{
                id:{
                    not:product?.id,
                }
            }
        }
    });
    const isLiked = Boolean(
        await client.fav.findFirst({
            where:{
                productId:product?.id,
                userId:user?.id
            },
            select:{
                id:true
            }
        })
    )
    
    res.json({ok:true,product,isLiked,relatedProducts});
}

export default withApiSession(withHandler({
    methods:["GET"],
    handler
}));

