import { IsString, IsInt, IsAlphanumeric, IsNotEmpty } from 'class-validator'

export class CreateUserDto {
  @IsString()
  @IsAlphanumeric()
  username: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsString()
  name: string

  @IsInt()
  age: number
}