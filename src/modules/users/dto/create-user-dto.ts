import { IsString, IsInt, IsAlphanumeric, IsIn } from 'class-validator'

export class CreateUserDto {
  @IsString()
  @IsAlphanumeric()
  username: string

  @IsString()
  password: string

  @IsString()
  name: string

  @IsInt()
  age: number
}