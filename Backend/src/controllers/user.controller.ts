import { Body, Controller, Get, Path, Post, Put, Route, Tags } from "tsoa";
import { CreateUserDto, UserDto } from "../dto/user.dto";
import UserService from "../services/user.service";

@Route("users")
@Tags("User")
export class UserController extends Controller {
  private userService: typeof UserService;

  constructor() {
    super();
    this.userService = UserService;
  }

  @Post("register")
  public async registerUser(
    @Body() createUserDto: CreateUserDto
  ): Promise<UserDto> {
    const user = await this.userService.createUser(
      createUserDto.username,
      createUserDto.email,
      createUserDto.password
    );
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      created_at: user.created_at,
    };
  }

  @Get("{id}")
  public async getUser(@Path() id: number): Promise<UserDto | null> {
    const user = await this.userService.getUserById(id);
    return user
      ? {
          id: user.id,
          username: user.username,
          email: user.email,
          created_at: user.created_at,
        }
      : null;
  }

  @Put("{id}")
  public async updateUser(
    @Path() id: number,
    @Body() updateUserDto: Partial<UserDto>
  ): Promise<UserDto | null> {
    const [, updatedUsers] = await this.userService.updateUser(
      id,
      updateUserDto
    );
    const updatedUser = updatedUsers[0];
    return updatedUser
      ? {
          id: updatedUser.id,
          username: updatedUser.username,
          email: updatedUser.email,
          created_at: updatedUser.created_at,
        }
      : null;
  }
}
