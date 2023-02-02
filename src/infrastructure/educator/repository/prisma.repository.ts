import { PrismaClient } from "@prisma/client";
import { Educator, Repository } from "@src/domain/educator/educator";
import { Pacient } from "@src/domain/educator/pacient";

export default class PrismaRepository implements Repository {
  private readonly client: PrismaClient;
  constructor(client: PrismaClient) {
    this.client = client;
  }

  async create(educator: Educator): Promise<void> {
    await this.client.educator.create({
      data: {
        id: educator.Id,
        name: educator.Name,
        cref: educator.CREF,
      },
      include: {
        pacients: true,
      },
    });
  }

  async findById(id: string): Promise<Educator | null> {
    const educator = await this.client.educator.findFirst({
      where: { id: id },
      select: { name: true, cref: true, id: true, pacients: true },
    });

    if (educator === null) return null;

    return new Educator(
      educator.name,
      educator.cref,
      educator.pacients.map(
        (p) => new Pacient(p.cpf, p.name, p.birthday, p.height, p.weight, p.id)
      ),
      educator.id
    );
  }

  async findByCREF(cref: string): Promise<Educator | null> {
    const educator = await this.client.educator.findFirst({
      where: { cref: cref },
      select: { name: true, cref: true, id: true, pacients: true },
    });

    if (educator === null) return null;

    return new Educator(
      educator.name,
      educator.cref,
      educator.pacients.map(
        (p) => new Pacient(p.cpf, p.name, p.birthday, p.height, p.weight, p.id)
      ),
      educator.id
    );
  }

  async update(educator: Educator): Promise<void> {
    await this.client.educator.update({
      data: { name: educator.Name, cref: educator.CREF },
      include: { pacients: true },
      where: { id: educator.Id },
    });
  }
}
