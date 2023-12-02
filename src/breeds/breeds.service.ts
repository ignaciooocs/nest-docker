import { Injectable } from '@nestjs/common';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Breed } from './entities/breed.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BreedsService {
  constructor(
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>
  ) { }
  create(createBreedDto: CreateBreedDto) {
    const breed = this.breedRepository.create(createBreedDto);
    return this.breedRepository.save(breed);
  }

  findAll() {
    return this.breedRepository.find();
  }

  findOne(id: number) {
    return this.breedRepository.findOne({ where: { id } });
  }

  update(id: number, updateBreedDto: UpdateBreedDto) {
    return this.breedRepository.update(id, updateBreedDto);
  }

  remove(id: number) {
    return this.breedRepository.softDelete(id);
  }
}
