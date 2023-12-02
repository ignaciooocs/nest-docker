import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from './entities/cat.entity';
import { Breed } from 'src/breeds/entities/breed.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private readonly catsRepository: Repository<Cat>,

    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>
  ) { }
  async create(createCatDto: CreateCatDto) {
    const breed = await this.breedRepository.findOne({ where: { name: createCatDto.breed } })
    if (!breed) {
      throw new NotFoundException('Breed not found')
    }
    const cat = this.catsRepository.create({ ...createCatDto, breed })
    return this.catsRepository.save(cat);
  }

  findAll() {
    return this.catsRepository.find();
  }

  findOne(id: number) {
    return this.catsRepository.findOne({ where: { id } });
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    const breed = await this.breedRepository.findOne({ where: { name: updateCatDto.breed } })
    if (!breed) {
      throw new NotFoundException('Breed not found')
    }
    return this.catsRepository.update({ id }, { ...updateCatDto, breed });
  }

  async remove(id: number) {
    try {
      // return this.catsRepository.softDelete(id);
      const cat = await this.findOne(id)
      if (cat) {
        return this.catsRepository.remove(cat);
      } else {
        throw new NotFoundException('Cat not found')
      }
    } catch (error) {
      throw error
    }
  }
}
