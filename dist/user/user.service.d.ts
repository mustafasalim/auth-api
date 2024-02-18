import { Model } from "mongoose";
import { UserDetails } from "./interfaces/user-detail.interface";
import { UserDocument } from "./schema/user.schema";
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
    _getUserDetails(user: UserDocument): UserDetails;
    findByEmail(email: string): Promise<UserDocument | null>;
    findById(id: string): Promise<UserDetails | null>;
    create(fullName: string, email: string, hashedPassword: string, memberAgreementVersion: string): Promise<UserDocument>;
}
