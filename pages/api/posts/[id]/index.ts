

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
       session:{user}
    }=req;
    
    if(req.method==="POST"){
        const post = await client.post?.findUnique({
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
        });

        const isWondering = Boolean(
            await client.wondering.findFirst({
                where:{
                    postId:+id.toString(),
                    userId: user?.id
                },
                select:{
                    id:true,
                }
            })
           )

        res.json({
            ok:true,
            post,
            isWondering
        })
    }
    if(req.method==="GET"){
        const post = await client.post.findMany({
            include:{
                user:{
                    select:{
                        id:true,
                        name:true,
                        avatar:true
                    }
                },
                _count:{
                    select:{
                        wonderings:true,
                        answers:true
                    }
                }
            }
        });
        res.json({
            ok:true,
            post,
        })
    }
}

export default withApiSession(withHandler({
    methods:["GET","POST"],
    handler
}));