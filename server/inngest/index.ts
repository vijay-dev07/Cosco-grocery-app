import { Inngest } from "inngest";
import { prisma } from "../config/prisma.js";

const LOW_STOCK_THERSHOLD = 10;

// Create a client to send and receive events
export const inngest = new Inngest({ id: "grocery-delivery" });

// low stock alert to admin 
const checkLowStock = inngest.createFunction(
  { id: "check-low-stock", 
    name:"Low stock alert",
    triggers: [{ event: "inventry/stock.updated" }] },
  async ({ event, step })  => {
    const{productId} = event.data;
    const product = await step.run('fetch-product' , async ()=> {
        return await prisma.product.findUnique({
            where:{id:productId}
        })
    })

    if(!product || product.stock === null || product.stock >= LOW_STOCK_THERSHOLD){
        return {skipped: true , stock:product?.stock}
    }

    await step.run("send-low-stock-email" , async ()=> {
        const adminEmails = process.env.ADMIN_EMAILS ?  process.env.ADMIN_EMAILS.split(",").map((e) => e.trim()) : [];

        if(adminEmails.length === 0)  return {skipped: true, reason:"No admin emails"};

        

    })
  }, 
);

export const functions = [];