import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { BooksModel, BooksService } from 'src/modules';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports:[SequelizeModule.forFeature([BooksModel])],
  providers: [BotService],
})
export class BotModule {}
