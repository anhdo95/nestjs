import { Module, CacheModule, Global, CacheInterceptor } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_INTERCEPTOR } from "@nestjs/core";
import { ScheduleModule } from '@nestjs/schedule'
import { MulterModule } from "@nestjs/platform-express";

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    CacheModule.register(),
    ScheduleModule.forRoot(),
    MulterModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          dest: configService.get('DEFAULT_UPLOAD_DEST')
        }
      },
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