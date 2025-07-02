"use strict";
import passport from "passport";
import Estudiante from "../entity/estudiante.entity.js";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { ACCESS_TOKEN_SECRET } from "../config/configEnv.js";
import { AppDataSource } from "../config/configDb.js";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: ACCESS_TOKEN_SECRET,
};

passport.use(
  new JwtStrategy(options, async (jwt_payload, done) => {
    try {
      const userRepository = AppDataSource.getRepository(Estudiante);
      const user = await userRepository.findOne({
        where: { rut: jwt_payload.rut },
      });
      if (user) {
        return done(null, {
          id: user.id,
          rut: user.rut,
          email: user.email,
          esCEE: user.esCEE,
        });
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  }),
);

export function passportJwtSetup() {
  passport.initialize();
}
