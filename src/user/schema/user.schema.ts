import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from "mongoose";
import { IsEmail } from "class-validator";

export type UserDocument = User & Document;

@Schema()
export class User {
  @ApiProperty()
  @Prop({ required: true })
  fullName: string;

  @ApiProperty()
  @IsEmail()
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty()
  @Prop({ required: true })
  password: string;

  @ApiProperty()
  @Prop({ required: true })
  memberAgreementVersion: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
