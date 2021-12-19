import { Specification } from "../entities/Specification";

interface ISpecificationRepositoryDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create({ description, name }: ISpecificationRepositoryDTO): Promise<void>;
  findByName(name: string): Promise<Specification>;
}

export { ISpecificationsRepository, ISpecificationRepositoryDTO };
