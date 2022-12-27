import { Injectable } from "@nestjs/common";
import { equal } from "assert";
import { PrismaService } from "prisma/prisma.service";

@Injectable()
export class GameService {
  constructor(private prismaService: PrismaService) {}

  async getGameDetail(id: string) {
    try {
      const game = await this.prismaService.game.findUnique({
        where: { id },
      });
      return game;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getGameByGenre(genres: string | string[]) {
    try {
      if (typeof genres === "string") {
        const games = await this.prismaService.game.findMany({
          where: {
            genres: {
              some: {
                name: genres as string,
              },
            },
          },
        });
        return games;
      }
      const games = await this.prismaService.game.findMany({
        where: {
          OR: genres.map((genre) => {
            return {
              genres: {
                some: {
                  name: genre as string,
                },
              },
            };
          }),
        },
      });
      return games;
    } catch (error) {
      throw new Error(error);
    }
  }

  async rateGame(
    userId: string,
    gameId: string,
    comment: string,
    rating: number,
  ) {
    try {
      await this.prismaService.ratings.create({
        data: {
          user_id: userId,
          game_id: gameId,
          comment,
          rating,
        },
      });

      await this.prismaService.game.update({
        where: {
          id: gameId,
        },
        data: {
          rating_sum: {
            increment: rating,
          },
          number_of_rater: {
            increment: 1,
          },
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async createGame(gameDetail: any) {
    try {
      const game = await this.prismaService.game.create({
        data: {
          title: gameDetail.title,
          description: gameDetail.description,
          developer: gameDetail.developer,
          price: gameDetail.price,
          genres: {
            create: gameDetail.genres.map((genre) => {
              return { name: genre };
            }),
          },
          images: gameDetail.images,
        },
      });
      return game;
    } catch (error) {
      throw new Error(error);
    }
  }
}
