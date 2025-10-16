import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { GiftCodeService } from './gift-code.service';
import { CreateGiftCodeDto } from './dto/create-gift-code.dto';

@ApiTags('Gift Codes')
@Controller('gift-codes')
export class GiftCodeController {
  constructor(private readonly giftCodeService: GiftCodeService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new gift code',
    description:
      'Creates a new gift code and sends a push notification to all OneSignal subscribers with the code',
  })
  @ApiResponse({
    status: 201,
    description: 'Gift code created successfully and notification sent',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - validation failed',
  })
  async create(@Body() createGiftCodeDto: CreateGiftCodeDto) {
    return this.giftCodeService.create(createGiftCodeDto);
  }

  @Get('valid')
  @ApiOperation({
    summary: 'Get all valid gift codes',
    description: 'Returns all gift codes that have not expired yet',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns list of valid gift codes',
  })
  async findAllValid() {
    return this.giftCodeService.findAllValid();
  }

  @Get()
  @ApiOperation({
    summary: 'Get all gift codes',
    description: 'Returns all gift codes including expired ones',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns list of all gift codes',
  })
  async findAll() {
    return this.giftCodeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get gift code by ID' })
  @ApiParam({
    name: 'id',
    description: 'Gift code ID',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns gift code details',
  })
  @ApiResponse({
    status: 404,
    description: 'Gift code not found',
  })
  async findOne(@Param('id') id: string) {
    return this.giftCodeService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a gift code' })
  @ApiParam({
    name: 'id',
    description: 'Gift code ID',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({
    status: 200,
    description: 'Gift code deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Gift code not found',
  })
  async delete(@Param('id') id: string) {
    return this.giftCodeService.delete(id);
  }
}
