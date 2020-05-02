import { Module, CacheModule, Global, CacheInterceptor } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from '@nestjs/config'
import { APP_INTERCEPTOR } from "@nestjs/core";
import { ScheduleModule } from '@nestjs/schedule'

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    CacheModule.register(),
    ScheduleModule.forRoot()
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
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor
    }
  ],
  // exports: [JwtModule]
})
export class SharedModule {

}