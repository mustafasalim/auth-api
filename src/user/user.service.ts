import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Model } from "mongoose";
import { UserDetails } from "./interfaces/user-detail.interface";
import { UserDocument } from "./schema/user.schema";

@Injectable()
export class UserService {
  constructor(
    @InjectModel("User") private readonly userModel: Model<UserDocument>
  ) {}

  _getUserDetails(user: UserDocument): UserDetails {
    return {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
    };
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<UserDetails | null> {
    const user = await this.userModel.findById(id).exec();
    if (!user) return null;
    return this._getUserDetails(user);
  }

  async create(
    fullName: string,
    email: string,
    hashedPassword: string,
    memberAgreementVersion: string
  ): Promise<UserDocument> {
    const newUser = new this.userModel({
      fullName,
      email,
      password: hashedPassword,
      memberAgreementVersion,
    });
    return newUser.save();
  }
}
