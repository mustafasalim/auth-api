import { UserService } from "src/user/user.service";
import { NewUserDTO } from "src/user/dto/new-user.dto";
import { UserDetails } from "src/user/interfaces/user-detail.interface";
import { JwtService } from "@nestjs/jwt";
import { ExistingUserDTO } from "src/user/dto/existing-user.dto";
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    hashPassword(password: string): Promise<string>;
    register(user: Readonly<NewUserDTO>): Promise<UserDetails | any>;
    doesPasswordMatch(password: string, hashedPassword: string): Promise<boolean>;
    validateUser(email: string, password: string): Promise<UserDetails | null>;
    login(existingUser: ExistingUserDTO): Promise<{
        token: string;
    } | null>;
}
