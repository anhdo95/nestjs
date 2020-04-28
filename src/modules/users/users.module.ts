import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { APP_GUARD } from "@nestjs/core";
import { RolesGuard } from "src/guards/roles.guard";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
@Module({
  controllers: [UsersController],
  providers: [
    UsersService, 
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ],
  exports: [UsersService]
})
export class UsersModule {}