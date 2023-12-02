import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { DatabaseModule } from './database/database.module';
import { BreedsModule } from './breeds/breeds.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    CatsModule,
    DatabaseModule,
    BreedsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
