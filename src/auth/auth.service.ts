import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import * as bcrypt from "bcrypt";
import { NewUserDTO } from "src/user/dto/new-user.dto";
import { UserDetails } from "src/user/interfaces/user-detail.interface";
import { JwtService } from "@nestjs/jwt";
import { ExistingUserDTO } from "src/user/dto/existing-user.dto";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async register(user: Readonly<NewUserDTO>): Promise<UserDetails | any> {
    const { fullName, email, password, memberAgreementVersion } = user;
    // same email
    const existingUser = await this.userService.findByEmail(email);

    if (existingUser)
      throw new HttpException(
        "Girmiş olduğunuz e-posta adresi daha önceden alınmış.",
        HttpStatus.CONFLICT
      );

    const hashedPassword = await this.hashPassword(password);

    const newUser = await this.userService.create(
      fullName,
      email,
      hashedPassword,
      memberAgreementVersion
    );
    return this.userService._getUserDetails(newUser);
  }

  async doesPasswordMatch(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async validateUser(
    email: string,
    password: string
  ): Promise<UserDetails | null> {
    const user = await this.userService.findByEmail(email);

    const doesUserExist = !!user;

    if (!doesUserExist) return null;

    const doesPasswordMatch = await this.doesPasswordMatch(
      password,
      user.password
    );

    if (!doesPasswordMatch) return null;

    return this.userService._getUserDetails(user);
  }

  async login(
    existingUser: ExistingUserDTO
  ): Promise<{ token: string } | null> {
    const { email, password } = existingUser;

    const user = await this.validateUser(email, password);

    if (!user)
      throw new HttpException(
        "E-posta adresi veya parola hatalı.",
        HttpStatus.UNAUTHORIZED
      );

    const jwt = await this.jwtService.signAsync({ user });
    return { token: jwt };
  }
}
