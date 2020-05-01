import { Module, Global } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from '@nestjs/config'

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    })
    /* JwtModule.registerAsync({
      // inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        // console.log('configService', configService)
        return {
          secret: "fakesecret",
          signOptions: {
            expiresIn: "8h"
          }
        }
      }
    }), */
  ],
  providers: [],
  // exports: [JwtModule]
})
export class SharedModule {

}