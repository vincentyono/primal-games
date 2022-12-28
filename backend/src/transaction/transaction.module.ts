import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { PrismaModule } from "prisma/prisma.module";
import { TransactionController } from "./transaction.controller";
import { TransactionService } from "./transaction.service";

@Module({
  controllers: [TransactionController],
  providers: [TransactionService],
  imports: [PrismaModule, PassportModule],
})
export class TransactionModule {}
