import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { env } from "process";
import type { JwtPayload } from "src/auth/types/jwt-payload";

export class AccessTokenStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: env.ACCESS_TOKEN_SECRET,
    });
  }

  validate(payload: JwtPayload) {
    return payload;
  }
}
