import { Module } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { ConfigModule } from "@nestjs/config";
import { GameModule } from "./game/game.module";
import { TransactionModule } from "./transaction/transaction.module";

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: [".env"],
    }),
    UserModule,
    GameModule,
    TransactionModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
