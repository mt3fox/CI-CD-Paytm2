"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client"


export async function createonRamptransaction(amount: number, provider: string){

    const session = await getServerSession(authOptions);
    // should come from bank 
    const token = (Math.random() * 1000).toString();
    const userId = session?.user?.id;

    if(!userId){
        return {
            message : "User not found"
        }
    }

   await prisma.onRampTransaction.create({
    data:{
        userId: Number(userId),
        amount: amount ,
        status: "Processing",
        startTime: new Date(),
        provider,
        token: token
    }
    })

    return {
        message: "Transaction created"
    }

  
}
