import {
  Arg,
  ID,
  Mutation,
  Query,
  Resolver,
  Authorized,
  Subscription,
  Root,
  Ctx,
} from "type-graphql";
import {
  MessageCreateInput,
  Message,
  MessageUpdateInput,
} from "../entities/Message";
import { validate } from "class-validator";
import { pubSub } from "../pubsub";
import { ContextType } from "../middlewares/auth";
import { Group } from "../entities/Group";
import { Member } from "../entities/Member";

@Resolver(Message)
export class MessageResolver {
  @Subscription(() => Message, {
    topics: "MESSAGES",
    filter: async ({ payload, args, context }) => { 
       const groups =  await Group.find({
        where: { members: { user: { id: context.user?.id } } },
        relations: {
          created_by_user: true,
          members: { user: true },
        }})
      const findGroup = groups.find( item => item.id === payload.group_id)
      
      return findGroup === undefined ? false : true;
    },
  })
  onMessage(
    @Root() payload: Message,
    @Arg("group") group : number
  ): Message {
    return payload;
  }

  @Authorized()
  @Query(() => [Message])
  async getAllMessages( 
    @Arg("groupId", () => ID) groupId: number
  ): Promise<Message[]> {
    return await Message.find({where : {group : {id : groupId }}, relations: {
      group: true,
      created_by_user : { avatar : true}
    }},);
  }

  @Authorized()
  @Query(() => Message)
  async getOneMessage(
    @Arg("id", () => ID) id: number
  ): Promise<Message | null> {
    try {
      const message = await Message.findOne({ where: { id: id } });
      return message;
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  @Authorized()
  @Mutation(() => Message)
  async createMessage(
    @Ctx() context: ContextType,
    @Arg("data", () => MessageCreateInput) data: MessageCreateInput
  ): Promise<Message> {
    try {
      if (!context.user) {
        throw new Error(`error`);
      }
      const newMessage = new Message();
      const group = await Group.findOneBy({id : data.group})
      if(group){
        newMessage.group = group; 
        newMessage.created_by_user = context.user;
        newMessage.message = data.message;
      }
     
      console.log(data);
      const error = await validate(newMessage);

      if (error.length > 0) {
        throw new Error(`error occured ${JSON.stringify(error)}`);
      } else {
        const datas = await newMessage.save();
        pubSub.publish("MESSAGES", newMessage);
        return datas;
      }
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  @Authorized()
  @Mutation(() => Message, { nullable: true })
  async updateMessage(
    @Arg("id", () => ID) id: number,
    @Arg("data", () => MessageUpdateInput) data: MessageUpdateInput
  ): Promise<Message | null> {
    const message = await Message.findOne({ where: { id: id } });
    if (message) {
      Object.assign(message, data);
      const errors = await validate(message);
      if (errors.length > 0) {
        throw new Error(`error occured ${JSON.stringify(errors)}`);
      } else {
        await message.save();
      }
    }
    return message;
  }

  @Authorized()
  @Mutation(() => Message, { nullable: true })
  async deleteMessage(
    @Arg("id", () => ID) id: number
  ): Promise<Message | null> {
    try {
      const message = await Message.findOne({ where: { id: id } });
      if (message) {
        await message.remove();
        message.id = id;
      }
      return message;
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }
}
