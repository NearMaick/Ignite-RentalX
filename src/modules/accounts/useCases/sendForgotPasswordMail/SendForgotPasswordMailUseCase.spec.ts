import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { UsersRepositoryInMemory } from "../authenticateUser/AuthenticateUserUseCase.spec";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProviderInMemory: MailProviderInMemory;

describe("Send Forgot Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProviderInMemory = new MailProviderInMemory();
    dateProvider = new DayjsDateProvider();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProviderInMemory
    );
  });

  it("should be able to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProviderInMemory, "sendMail");

    await usersRepositoryInMemory.create({
      driver_license: "835456",
      email: "ewizuwer@le.by",
      name: "Hilda Curtis",
      password: "1234",
    });

    await sendForgotPasswordMailUseCase.execute("ewizuwer@le.by");

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send an email if user does not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("rucmufbek@befse.il")
    ).rejects.toEqual(new AppError("User does not exists!"));
  });

  it("should not be able to create an users_token", async () => {
    const generateTokenMail = jest.spyOn(usersRepositoryInMemory, "create");

    await usersRepositoryInMemory.create({
      driver_license: "890735",
      email: "jauce@ruva.ph",
      name: "Lola Murray",
      password: "1234",
    });

    await sendForgotPasswordMailUseCase.execute("jauce@ruva.ph");
    expect(generateTokenMail).toBeCalled();
  });
});
