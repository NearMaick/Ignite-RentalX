import { Router } from "express";

import createUserController from "../modules/accounts/entities/User";

const usersRoutes = Router();

usersRoutes.post("/", (request, response) => {
  return createUserController().handle(request, response);
});

export { usersRoutes };
