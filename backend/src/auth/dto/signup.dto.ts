import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLength,
  Matches,
} from "class-validator";

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  public username: string;

  @IsEmail()
  public email: string;

  @IsString()
  @MinLength(5, { message: "password need to be at least 5 characters" })
  public password: string;

  @IsString()
  @Matches("password")
  public passwordConfirmation: string;
}
