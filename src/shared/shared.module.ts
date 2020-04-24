import { Module, Global } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "./services/config.service";

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      // inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: "fakesecret",
        signOptions: {
          expiresIn: "8h"
       },
      }),
    }),
  ],
  exports: [JwtModule]
})
export class SharedModule {

}