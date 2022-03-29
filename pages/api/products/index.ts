



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

    if(req.method==="GET"){
        const products= await client.product.findMany({
            include:{
                _count:{
                    select:{
                        favs:true,
                    }
                }
            }
        })
        return res.json({
            ok:true,
            products
        })
    }
    if(req.method==="POST"){
        
    }
    const {user}=req.session;
    const {body:{name,price,description}}=req;
    const product = await client.product.create({
        data:{
            name,
            price:+price,
            description,
            image:'xx',
            user:{
                connect:{
                    id:user?.id
                }
            }
        }
    })

    res.json({
        ok:true,
        product,
    });
    const profile = await client.user.findUnique({
        where:{id:req.session.user?.id},
    })
}

export default withApiSession(withHandler({
    methods:["GET","POST"],
    handler
}));

