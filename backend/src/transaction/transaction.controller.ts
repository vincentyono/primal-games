import { Controller, Put, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { Body, Post } from "@nestjs/common/decorators";
import { AuthGuard } from "@nestjs/passport";
import { TransactionService } from "./transaction.service";

@Controller("transaction")
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @UseGuards(AuthGuard("jwt"))
  @Put("cart")
  insertToCart(@Req() req: Request, @Body() dto: any) {}

  @Post("pay")
  pay() {
    return this.transactionService.pay();
  }
}
