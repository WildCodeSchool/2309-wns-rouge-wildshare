require("dotenv").config();
import {
  Resolver,
  Query,
  Arg,
  Mutation,
  Ctx,
  Authorized,
  ID,
} from "type-graphql";
import { User, InputUser, UserUpdateInput } from "../entities/User";
import { validateDatas } from "../utils/validate";
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";
import Cookies from "cookies";
import { ContextType, getUser } from "../middlewares/auth";
import { DummyUser } from "../dummyDatas";
import { validate } from "class-validator";
import { randomBytes } from "crypto";
import { sendValidationEmail } from "../utils/sendemail";

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    return await User.find({});
  }

  @Query(() => User, { nullable: true })
  async getOneUser(@Arg("id", () => ID) id: number): Promise<User | null> {
    try {
      const user = await User.findOne({ where: { id: id } });
      return user;
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  @Mutation(() => User, { nullable: true })
  async updateUser(
    @Arg("id", () => ID) id: number,
    @Arg("data", () => UserUpdateInput) data: UserUpdateInput
  ): Promise<User | null> {
    try {
      const user = await User.findOne({ where: { id: id } });
      if (user) {
        Object.assign(user, data);
        const errors = await validate(user);
        if (errors.length > 0) {
        } else {
          await user.save();
        }
      }
      return user;
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  @Mutation(() => User, { nullable: true })
  async deleteUser(@Arg("id", () => ID) id: number): Promise<User | null> {
    try {
      const user = await User.findOne({ where: { id: id } });
      if (user) {
        await user.remove();
        user.id = id;
      }
      return user;
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  @Mutation(() => User)
  async signUp(
    @Arg("data", () => InputUser) data: InputUser
  ): Promise<User | null> {
    const error = await validateDatas(data);
    if (error.length > 0) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
    const existingUser = await User.findOneBy({ email: data.email });
    if (existingUser) {
      throw new Error(`User already exists`);
    }
    const newUser = new User();
    newUser.email = data.email;
    newUser.hashed_password = await argon2.hash(data.password);
    newUser.lastname = data.lastname;
    newUser.firstname = data.firstname;
    const token = randomBytes(48).toString('hex'); 
    newUser.email_validation_token = token;  // génération de token
    newUser.email_validation_token_expires = Date.now() + 3600000; // Expiration dans 1 heure
    await newUser.save();
    await sendValidationEmail(newUser.email, newUser.email_validation_token); //envoi du mail avec token validation
    return newUser;
  }

  @Mutation(() => User)
  async validateAccount(
  @Arg("token") token: string
): Promise<boolean> {
  const user = await User.findOneBy({ email_validation_token: token });
  if (!user) {
    return false; // ou gérer l'utilisateur non trouvé
  }
  const tokenExpired = user.email_validation_token_expires ? Date.now() > user.email_validation_token_expires : true; // on considere le token comme expiré si la date d'expiration est nulle
  
  if (tokenExpired) {
    // Gérer le cas d'un token expiré
  } else {
    user.is_account_validated = true;
    user.email_validation_token = null; 
    user.email_validation_token_expires = null; 
    await user.save();
    return true;
  }

  return false; 
}

  @Mutation(() => User, { nullable: true })
  async signIn(
    @Ctx() context: ContextType,
    @Arg("data", () => InputUser) data: InputUser
  ): Promise<User | null> {
    const existingUser = await User.findOneBy({ email: data.email });
    if (existingUser) {
      if (await argon2.verify(existingUser.hashed_password, data.password)) {
        const token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 2,
            id: existingUser.id,
          },
          `${process.env.JWT_SECRET_KEY}`
        );

        const cookies = new Cookies(context.req, context.res);
        cookies.set("token", token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24,
        });

        return existingUser;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  @Mutation(() => User, { nullable: true })
  async signOut(@Ctx() context: ContextType): Promise<User | null> {
    const cookies = new Cookies(context.req, context.res);
    cookies.set("token", "", {
      httpOnly: true,
      maxAge: 0,
    });

    return null;
  }

  @Query(() => User, { nullable: true })
  async myProfile(@Ctx() context: ContextType): Promise<User | null> {
    const user = await getUser(context.req, context.res);
    return user;
  }

  // @Mutation(() => User)
  // async populateUserTable(): Promise<User | null> {
  //   const error = await validateDatas(DummyUser);
  //   if (error.length > 0) {
  //     throw new Error(`error occured ${JSON.stringify(error)}`);
  //   }
  //   const existingUser = await User.findOneBy({ email: DummyUser.email });
  //   if (existingUser) {
  //     throw new Error(`User already exists`);
  //   }
  //   const newUser = new User();
  //   newUser.email = DummyUser.email;
  //   newUser.hashed_password = await argon2.hash(DummyUser.password);
  //   await newUser.save();
  //   return newUser;
  // }
}
