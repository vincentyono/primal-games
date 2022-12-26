import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport/dist";
import { PrismaModule } from "prisma/prisma.module";
import { UserModule } from "src/user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AccessTokenStrategy } from "./dto/stategies/access-token.strategy";
import { RefreshTokenStrategy } from "./dto/stategies/refresh-token.strategy";

@Module({
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
  imports: [PrismaModule, PassportModule, JwtModule.register({})],
})
export class AuthModule {}
