import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { Request } from "express";
import { AuthGuard } from "@nestjs/passport";
import { JwtPayload } from "src/auth/types/jwt-payload";
import { RateGameDto } from "./dto/rate-game.dto";
import { GameService } from "./game.service";

@Controller("game")
export class GameController {
  constructor(private gameService: GameService) {}

  @Get("detail/:id")
  getGameDetail(@Param("id") id: string) {
    return this.gameService.getGameDetail(id);
  }

  @Get("genre")
  getGameByGenre(@Query("tag") genres: string[]) {
    return this.gameService.getGameByGenre(genres);
  }

  @UseGuards(AuthGuard("jwt"))
  @Post("rate")
  rateGame(@Req() req: Request, @Body() dto: RateGameDto) {
    const user = req.user as JwtPayload;
    return this.gameService.rateGame(
      user.sub,
      dto.gameId,
      dto.comment,
      dto.rating,
    );
  }

  @Post("create")
  createGame(@Body() games: any) {
    return this.gameService.createGame(games);
  }
}
