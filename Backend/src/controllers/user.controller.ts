import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Path,
  Post,
  Route,
  Security,
  Tags,
} from "tsoa";
import { UserDTO } from "../dto/user.dto";
import { CreateUserBody } from "../interfaces/createUserBody.interface";
import { UpdateUser } from "../interfaces/updateUser.interface";
import { userService } from "../services/user.service";

@Route("users")
@Tags("Users")
export class UserController extends Controller {
  @Get("{id}")
  @Security("jwt", ["user:read"])
  public async getUser(@Path() id: number): Promise<UserDTO | null> {
    const user = await userService.getUser(id);
    if (!user) {
      this.setStatus(404);
      return null;
    }
    return user;
  }

  @Post("/")
  public async createUser(
    @Body() requestBody: CreateUserBody
  ): Promise<UserDTO | null> {
    const user = await userService.createUser(requestBody);
    if (!user) {
      this.setStatus(401);
      return null;
    }
    return user;
  }

  @Security("jwt", ["user:delete"])
  @Delete("{id}")
  public async deleteUser(@Path() id: number): Promise<void> {
    await userService.deleteUser(id);
  }

  @Security("jwt", ["user:write"])
  @Patch("/")
  public async updateUser(@Body() body: UpdateUser): Promise<UserDTO | null> {
    return await userService.updateUser(body);
  }
}
