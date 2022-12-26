import { Module } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: [".env"],
    }),
    UserModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
