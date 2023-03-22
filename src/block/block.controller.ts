import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { BlockService } from './block.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Block')
@Controller('/block')
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

  @Get()
  async getCurrentBlock(): Promise<number> {
    return await this.blockService.getCurrentBlock();
  }

  @Get(':id')
  async getBlock(@Param('id', ParseIntPipe) id: number) {
      return await this.blockService.getBlock(id);
  }
}
