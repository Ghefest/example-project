import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { ItemsXsDTO } from '@pot-back/common';
import { AuthenticatedGuard } from '../../common/guards/authenticated.guard';
import { ItemsXsService } from './items-xs.service';

@ApiTags('items-xs')
@Controller('items-xs')
@ApiCookieAuth()
@UseGuards(AuthenticatedGuard)
export class ItemsXsController {
  constructor(private itemsXsService: ItemsXsService) {}

  @Get('names')
  async getItemsNamesXs() {
    return await this.itemsXsService.getItemsNamesXs();
  }

  @Get('names/:name')
  async getItemsNamesXsByName(@Param('name') name: string) {
    return await this.itemsXsService.getItemsNamesXsByName(name);
  }

  @Post('names')
  async createItemsNamesXs(@Body() dto: ItemsXsDTO.CreateItemNameX) {
    return await this.itemsXsService.createItemNameX(dto);
  }

  @Patch('names/:name')
  async updateItemNameXByName(@Param('name') name: string, @Body() dto: ItemsXsDTO.UpdateItemNameXByName) {
    return await this.itemsXsService.updateItemNameXByName(name, dto);
  }

  @Delete('names/:name')
  async deleteItemNameXByName(@Param('name') name: string) {
    return await this.itemsXsService.deleteItemNameX(name);
  }

  @Get('types')
  async getItemsTypesXs() {
    return await this.itemsXsService.getItemsTypesXs();
  }

  @Get('types/:type')
  async getItemsTypesXsByType(@Param('type') type: string) {
    return await this.itemsXsService.getItemsTypesXsByType(type);
  }

  @Post('types')
  async createItemsTypeXs(@Body() dto: ItemsXsDTO.CreateItemTypeX) {
    return await this.itemsXsService.createItemTypeX(dto);
  }

  @Patch('types/:type')
  async updateItemTypeXByType(@Param('type') type: string, @Body() dto: ItemsXsDTO.UpdateItemTypeXByType) {
    return await this.itemsXsService.updateItemTypeXByType(type, dto);
  }

  @Delete('types/:type')
  async deleteItemTypeXByType(@Param('type') type: string) {
    return await this.itemsXsService.deleteItemTypeX(type);
  }
}
