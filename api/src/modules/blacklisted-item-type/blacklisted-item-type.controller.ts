import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { BlacklistedItemTypesDTO } from '@pot-back/common';
import { AuthenticatedGuard } from '../../common/guards/authenticated.guard';
import { BlacklistedItemTypeService } from './blacklisted-item-type.service';

@ApiTags('blacklisted-item-types')
@Controller('blacklisted-item-types')
@ApiCookieAuth()
@UseGuards(AuthenticatedGuard)
export class BlacklistedItemTypeController {
  constructor(private blacklistedItemTypeService: BlacklistedItemTypeService) {}

  @Get()
  async getAll() {
    return await this.blacklistedItemTypeService.getAll();
  }

  @Get(':type')
  async getByType(@Param() dto: BlacklistedItemTypesDTO.GetByType) {
    return await this.blacklistedItemTypeService.getByType(dto);
  }

  @Post()
  async create(@Body() dto: BlacklistedItemTypesDTO.Create) {
    return await this.blacklistedItemTypeService.create(dto);
  }

  @Delete(':type')
  async deleteByType(@Param() dto: BlacklistedItemTypesDTO.DeleteByType) {
    return await this.blacklistedItemTypeService.delete(dto);
  }
}
