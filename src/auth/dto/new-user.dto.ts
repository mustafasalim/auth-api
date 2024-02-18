import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsEmail,
  Length,
  Contains,
  IsNotEmpty,
} from "class-validator";

export class NewUserDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(6, 16)
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsNotEmpty()
  @Contains("v1")
  memberAgreementVersion: string;
}
