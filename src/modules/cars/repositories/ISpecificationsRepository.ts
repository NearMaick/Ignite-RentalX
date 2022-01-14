import { Specification } from "../infra/typeorm/entities/Specification";

interface ISpecificationRepositoryDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create({ description, name }: ISpecificationRepositoryDTO): Promise<void>;
  findByName(name: string): Promise<Specification>;
  findByIds(ids: string[]): Promise<Specification[]>;
}

export { ISpecificationsRepository, ISpecificationRepositoryDTO };
