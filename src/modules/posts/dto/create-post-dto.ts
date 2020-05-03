import { IsString, IsOptional } from 'class-validator'
import { User } from 'src/database/entities/user.entity'

export class CreatePostDto {
  @IsString()
  title: string

  @IsString()
  description: string

  @IsOptional()
  @IsString()
  thumbnailPath: string

  user: User
}