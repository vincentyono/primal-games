import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SigninDto } from "./dto/signin.dto";
import { SignupDto } from "./dto/signup.dto";
import { Request } from "express";
import { JwtPayload } from "./types/jwt-payload";
import { AuthGuard } from "@nestjs/passport";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signup")
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(
      dto.username,
      dto.email,
      dto.password,
      dto.passwordConfirmation,
    );
  }

  @Post("signin")
  @HttpCode(HttpStatus.OK)
  signin(@Body() dto: SigninDto) {
    return this.authService.signin(dto.email, dto.password);
  }

  @UseGuards(AuthGuard("jwt"))
  @Post("signout")
  @HttpCode(HttpStatus.OK)
  signout(@Req() req: Request) {
    const user = req.user as JwtPayload;
    console.log(user);
    return this.authService.signout(user.sub);
  }

  @UseGuards(AuthGuard("jwt-refresh"))
  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  refreshToken(@Req() req: Request) {
    const user = req.user as JwtPayload;
    return this.authService.refreshToken(user.sub, user.refreshToken);
  }
}
