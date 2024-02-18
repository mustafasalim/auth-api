import { UserDetails } from "src/user/interfaces/user-detail.interface";
import { AuthService } from "./auth.service";
import { ExistingUserDTO } from "./dto/existing-user.dto";
import { NewUserDTO } from "./dto/new-user.dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(user: NewUserDTO): Promise<UserDetails | null>;
    login(user: ExistingUserDTO): Promise<{
        token: string;
    } | null>;
}
