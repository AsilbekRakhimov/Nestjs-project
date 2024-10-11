import { Injectable } from '@nestjs/common';
import { createReadStream } from 'fs';
import { Action, Command, Ctx, On, Start, Update } from 'nestjs-telegraf';
import * as path from 'path';
import { Context } from 'telegraf';
import { Message } from 'telegraf/typings/core/types/typegram';
import * as opencage from 'opencage-api-client';

Injectable();
@Update()
export class BotService {
  @Action('start')
  @Start()
  async startBot(@Ctx() context: Context): Promise<void> {
    await context.reply("Assalomu aleykum!\nMagic Library'ga xush kelibsiz😊");
  }

  @Action('help')
  @Command('help')
  async helpBot(@Ctx() context: Context): Promise<void> {
    await context.replyWithHTML(`
    <b>Botdagi komandalar:</b>
    <i>/start</i> - Botni qayta ishga tushirish
    <i>/help</i> - Botdagi komandalarni ko'rish
    <i>/books</i> - Kitoblar ro'yxatini ko'rish
    <i>/library_look</i> - Kutubxona ichki ko'rinishi
    `);
  }

  @Command('library_look')
  async sendRestaurantImage(@Ctx() context: Context): Promise<void> {
    const imagePath = path.join(
      __dirname,
      '../../../',
      'public',
      'images',
      'magic_library.jpeg',
    );
    await context.replyWithPhoto(
      { source: createReadStream(imagePath) },
      {
        caption: 'Library look',
        reply_markup: {
          keyboard: [
            [
              { text: 'Phone number', request_contact: true },
              { text: 'Location', request_location: true },
            ],
          ],
          resize_keyboard: true,
          one_time_keyboard: true,
          //   inline_keyboard: [
          //     [
          //       {
          //         callback_data: 'start',
          //         text: 'Start Command',
          //       },
          //       {
          //         callback_data: 'help',
          //         text: 'Help Command',
          //       },
          //     ],
          //     [
          //       {
          //         callback_data: 'Books',
          //         text: 'Kitoblar',
          //       },
          //     ],
          //   ],
        },
      },
    );
  }

  @On('location')
  async getLocation(@Ctx() context: Context): Promise<void> {
    const message = context.message as Message.LocationMessage;

    opencage
      .geocode({
        q: `${message.location.latitude} ${message.location.longitude}`,
        language: 'uz',
        key: process.env.OPENCAGE_API_KEY,
      })
      .then((data) => {
        // console.log(JSON.stringify(data));
        if (data.status.code === 200 && data.results.length > 0) {
          const place = data.results[0];
          console.log(place);
          console.log(place.formatted);
          console.log(place.components.road);
          console.log(place.annotations.timezone.name);
        } else {
          console.log('status', data.status.message);
          console.log('total_results', data.total_results);
        }
      });
    await context.reply('Location saqlandi');
  }
}
