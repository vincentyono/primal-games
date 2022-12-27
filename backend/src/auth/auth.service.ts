import {
  ForbiddenException,
  BadRequestException,
  Injectable,
} from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { env } from "process";

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signup(
    username: string,
    email: string,
    password: string,
    passwordConfirmation: string,
  ) {
    try {
      if (password !== passwordConfirmation) {
        throw new BadRequestException("Password do not match");
      }

      const rounds = 10;
      const hashedPassword = await bcrypt.hash(password, rounds);

      const user = await this.prismaService.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      });

      const tokens = await this.getToken(user.id, user.username);

      await this.updateRefreshTokenHash(user.id, tokens.refresh_token);

      return tokens;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getToken(id: string, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: id,
          username,
        },
        {
          secret: env.ACCESS_TOKEN_SECRET,
          expiresIn: 60 * 15, // 15 minutes
        },
      ),
      this.jwtService.signAsync(
        {
          sub: id,
          username,
        },
        {
          secret: env.REFRESH_TOKEN_SECRET,
          expiresIn: 60 * 60 * 24 * 7, // 1 week
        },
      ),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async updateRefreshTokenHash(id: string, refreshToken: string) {
    const rounds = 10;
    const hashedRefreshToken = await bcrypt.hash(refreshToken, rounds);
    await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        refresh_token: hashedRefreshToken,
      },
    });
  }

  async signin(email: string, password: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new BadRequestException();

    const isPasswordMatches = await bcrypt.compare(password, user.password);

    if (!isPasswordMatches) throw new ForbiddenException("Invalid credential");

    const tokens = await this.getToken(user.id, user.username);

    await this.updateRefreshTokenHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async refreshToken(id: string, refreshToken: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    if (!user || !user.refresh_token)
      throw new ForbiddenException("Access Denied");

    const isRefreshTokenMatches = await bcrypt.compare(
      refreshToken,
      user.refresh_token,
    );

    if (!isRefreshTokenMatches) throw new ForbiddenException("Access Denied");

    const tokens = await this.getToken(user.id, user.username);

    await this.updateRefreshTokenHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async signout(id: string) {
    await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        refresh_token: null,
      },
    });

    return { message: "Successfully signed out" };
  }
}
