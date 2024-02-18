import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtGuard } from "src/auth/guards/jwt.guard";
import { UserDetails } from "./interfaces/user-detail.interface";
import { UserService } from "./user.service";

@ApiTags("User")
@ApiBearerAuth()
@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get(":id")
  getUser(@Param("id") id: string): Promise<UserDetails | null> {
    return this.userService.findById(id);
  }
}
