import twilio from 'twilio';
import next, { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { IResponseType } from '@libs/server/withHandler';
import { client } from '@libs/client/client';
import {createTransport} from 'nodemailer'
import { isPromise } from 'util/types';


const twilioClient=twilio(process.env.TWILIO_MSID,
    process.env.TWILIO_TOKEN)

async function handler(
    req:NextApiRequest,
    res:NextApiResponse<IResponseType>
){
    const {phone,email}=req.body;
    const user=phone?{phone:phone+''}:email?{email}:null;
    if(!user)return res.status(400).json({ok:false})
    const payload = Math.floor(100000+Math.random()*9000000)+''

    const token = await client.token.create({
            data:{
                payload,
                user:{
                    connectOrCreate:{
                        where:{
                            ...user
                        },
                        create:{
                            name:"Anonymous",
                            ...user
                        }
                    }
                }
            }    
    });
console.log(token);
    console.log('!!')
    if(phone){
        const message= await twilioClient.messages.create({
            messagingServiceSid:process.env.TWILIO_MSID,
            to:process.env.MY_PHONE!,
            body:`Your login token is ${payload}`
        });
    }else if(email){
        console.log('email');
        console.log(email);
        createTransport({
            service:'gmail',
            host:'smtp.gmail.com',
            port:587,
            secure:false,
            auth:{
                user:'lss307012@gmail.com',
                pass:''
            }
        }).sendMail({
            from:'lss307012@gmail.com',
            to:email,
            subject:`[ABC] 인증번호가 도착했습니다.`,
            text:`123456`,
            html:`<div>qqqqq</div>`
        })
        .then(send=>send)
        .catch(err=>next(err))
    }

    return res.json({ok:true});
}

export default withHandler({
    methods:["GET","POST"],
    handler,
    isPrivate:false
});

