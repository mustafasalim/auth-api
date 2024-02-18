import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class StorageObjectDto {
 
  @ApiProperty({ type: 'string', format: 'binary', required: true })
  file: Express.Multer.File
}