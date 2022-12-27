import {
  Controller,
  Get,
  Query,
  UseGuards,
  Req,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  Patch,
  Put,
} from "@nestjs/common";
import { Request } from "express";
import { AuthGuard } from "@nestjs/passport";
import { JwtPayload } from "src/auth/types/jwt-payload";
import { UserService } from "./user.service";
import { FriendRequestDto } from "./dto/friend-request.dto";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard("jwt"))
  @Get("me")
  @HttpCode(HttpStatus.OK)
  getMe(@Req() req: Request) {
    const user = req.user as JwtPayload;
    return this.userService.getMe(user.sub);
  }

  @Get("find")
  @HttpCode(HttpStatus.OK)
  getUserByUsername(@Query("username") username: string) {
    return this.userService.getUserByUsername(username);
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("friends")
  @HttpCode(HttpStatus.OK)
  getUserFriends(@Req() req: Request, @Query("type") type: string) {
    const user = req.user as JwtPayload;
    return this.userService.getUserFriends(user.sub, type);
  }

  @UseGuards(AuthGuard("jwt"))
  @Post("request")
  @HttpCode(HttpStatus.CREATED)
  friendRequest(@Req() req: Request, @Body() dto: FriendRequestDto) {
    const user = req.user as JwtPayload;
    return this.userService.friendRequest(user.sub, dto.id);
  }

  @UseGuards(AuthGuard("jwt"))
  @Put("accept")
  @HttpCode(HttpStatus.NO_CONTENT)
  acceptFriendRequest(@Body() dto: FriendRequestDto) {
    return this.userService.acceptFriendRequest(dto.id);
  }
}
