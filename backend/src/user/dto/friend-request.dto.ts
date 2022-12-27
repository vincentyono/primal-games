import { IsNotEmpty, IsString } from "class-validator";

export class FriendRequestDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
