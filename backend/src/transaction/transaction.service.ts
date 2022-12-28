import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import * as paypal from "paypal-rest-sdk";
import { env } from "process";

@Injectable()
export class TransactionService {
  private paypalService;
  constructor(private prismaService: PrismaService) {
    this.paypalService = paypal;
    this.paypalService.configure({
      mode: "sandbox",
      client_id: env.PAYPAL_CLIENT_ID,
      client_secret: env.PAYPAL_CLIENT_SECRET,
    });
  }

  async pay() {
    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:8000/transaction/success",
        cancel_url: "http://localhost:8000/transaction/cancel",
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name: "Something",
                price: "7.50",
                currency: "USD",
              },
            ],
          },
          amount: {
            currency: "USD",
            total: "7.50",
          },
          description: "This is the payment description",
        },
      ],
    };

    console.log(this.paypalService);
  }

  async success() {}

  async cancel() {}
}
