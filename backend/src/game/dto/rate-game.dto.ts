import { IsNumber, IsString, Max, Min } from "class-validator";

export class RateGameDto {
  @IsString()
  gameId: string;

  @IsString()
  comment: string;

  @Max(5)
  @Min(1)
  @IsNumber()
  rating: number;
}
