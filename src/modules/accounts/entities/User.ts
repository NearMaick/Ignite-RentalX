/* eslint-disable max-classes-per-file */
import { Request, Response } from "express";
import { container, inject, injectable } from "tsyringe";
import {
  Column,
  CreateDateColumn,
  Entity,
  getRepository,
  PrimaryColumn,
  Repository,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("users")
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  driver_license: string;

  @Column()
  isAdmin: boolean;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export interface ICreateUserDTO {
  name: string;
  username: string;
  password: string;
  email: string;
  driver_license: string;
}

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
}

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    username,
    email,
    driver_license,
    password,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      username,
      email,
      driver_license,
      password,
    });

    await this.repository.save(user);
  }
}

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    username,
    driver_license,
    email,
    password,
  }: ICreateUserDTO) {
    await this.usersRepository.create({
      name,
      username,
      driver_license,
      email,
      password,
    });
  }
}

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, username, driver_license, email, password } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute({
      name,
      username,
      driver_license,
      email,
      password,
    });

    return response.status(201).send();
  }
}