"use server"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import prisma from "./db";
import { revalidatePath } from "next/cache";

export async function postData(formData:FormData) {
    const {getUser} = getKindeServerSession()
    const user = await getUser();
    if(!user){
        throw new Error("Unauthorized User!!!")
    }
    const message = formData.get('message') as string
    const data = await prisma.guestBoxEntry.create({
        data: {
          userId: user.id,
          message: message,
        },
      })

      revalidatePath("/guestbox")
}