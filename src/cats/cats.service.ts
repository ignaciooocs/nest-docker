import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private readonly catsRepository: Repository<Cat>
  ) { }
  create(createCatDto: CreateCatDto) {
    const cat = this.catsRepository.create(createCatDto)
    return this.catsRepository.save(cat);
  }

  findAll() {
    return this.catsRepository.find();
  }

  findOne(id: number) {
    return this.catsRepository.findOne({ where: { id } });
  }

  update(id: number, updateCatDto: UpdateCatDto) {
    return this.catsRepository.update({ id }, updateCatDto)
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
