import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { BlacklistedItemDTO } from '@pot-back/common';
import { PaginationQuery } from '../../common/classes/pagination-query';
import { AuthenticatedGuard } from '../../common/guards/authenticated.guard';
import { BlacklistedItemService } from './blacklisted-item.service';

@ApiTags('blacklisted-items')
@Controller('blacklisted-items')
@ApiCookieAuth()
@UseGuards(AuthenticatedGuard)
export class BlacklistedItemController {
  constructor(private blacklistItemService: BlacklistedItemService) {}

  @Get()
  public async getAll(@Query() pagination: PaginationQuery) {
    return await this.blacklistItemService.getAll(pagination);
  }

  @Get(':name')
  public async getByName(@Param() dto: BlacklistedItemDTO.GetByName) {
    return await this.blacklistItemService.getByName(dto);
  }

  @Post()
  async create(@Body() dto: BlacklistedItemDTO.Create) {
    return await this.blacklistItemService.create(dto);
  }

  @ApiParam({ name: 'name', required: true })
  @Delete(':name')
  async delete(@Param() dto: BlacklistedItemDTO.DeleteByName) {
    return await this.blacklistItemService.delete(dto);
  }
}
