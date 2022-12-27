import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getMe(id: string) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          id,
        },
        select: {
          username: true,
          email: true,
          profile_picture: true,
        },
      });
      return user;
    } catch (error) {
      throw new Error("Something went wrong");
    }
  }

  async getUserByUsername(username: string) {
    try {
      const users = await this.prismaService.user.findMany({
        where: {
          username: {
            contains: username,
          },
        },
        select: {
          id: true,
          username: true,
        },
      });

      return users;
    } catch (error) {
      throw new Error("Something went wrong");
    }
  }

  async getUserFriends(id: string, type: string) {
    try {
      if (type === "accepted") {
        const friends = await this.prismaService.friend_list.findMany({
          where: { a_id: id, accepted: true },
          select: {
            id: true,
            b: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        });
        return friends;
      }

      if (type === "pending") {
        const friends = await this.prismaService.friend_list.findMany({
          where: { a_id: id, accepted: false },
          select: {
            id: true,
            b: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        });
        return friends;
      }
    } catch (error) {
      throw new Error("Something went wrong");
    }
  }

  async friendRequest(a_id: string, b_id: string) {
    try {
      await this.prismaService.friend_list.create({
        data: {
          a_id,
          b_id,
          accepted: false,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async acceptFriendRequest(id: string) {
    try {
      await this.prismaService.friend_list.update({
        where: {
          id,
        },
        data: {
          accepted: true,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
