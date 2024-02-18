import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, Length, IsNotEmpty } from "class-validator";

export class ExistingUserDTO {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(6, 16)
  password: string;
}
