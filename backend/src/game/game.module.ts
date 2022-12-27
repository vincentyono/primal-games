import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { PrismaModule } from "prisma/prisma.module";
import { GameController } from "./game.controller";
import { GameService } from "./game.service";

@Module({
  controllers: [GameController],
  providers: [GameService],
  imports: [PrismaModule, PassportModule],
})
export class GameModule {}
