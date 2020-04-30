import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { APP_GUARD } from "@nestjs/core";
import { RolesGuard } from "src/guards/roles.guard";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/database/entities/user.entity";

@Module({
  controllers: [UsersController],
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  providers: [
    UsersService, 
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard
    // }
  ],
  exports: [TypeOrmModule]
})
export class UsersModule {}