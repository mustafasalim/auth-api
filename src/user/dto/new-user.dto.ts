import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class NewUserDTO {
  @ApiProperty()
  fullName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  memberAgreementVersion: string;
}
