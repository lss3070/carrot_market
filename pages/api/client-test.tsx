import { NextApiRequest,NextApiResponse } from "next";

export default function handler(
    req:NextApiRequest,res:NextApiResponse
){
    res.json({
        status:true,
        data:'xx'
    })
}