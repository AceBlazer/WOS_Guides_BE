import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { GuideService } from './guide.service';
import { CreateGuideDto } from './dto/create-guide.dto';
import { UpdateGuideDto } from './dto/update-guide.dto';

@ApiTags('Guides')
@Controller('guides')
export class GuideController {
  constructor(private readonly guideService: GuideService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new guide',
    description: 'Creates a new guide with HTML content and assigns it to a category',
  })
  @ApiResponse({
    status: 201,
    description: 'Guide created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - validation failed',
  })
  async create(@Body() createGuideDto: CreateGuideDto) {
    return this.guideService.create(createGuideDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all guides',
    description: 'Returns all active guides',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns list of all guides',
  })
  async findAll() {
    return this.guideService.findAll();
  }

  @Get('category/:categoryId')
  @ApiOperation({
    summary: 'Get guides by category',
    description: 'Returns all guides that belong to a specific category',
  })
  @ApiParam({
    name: 'categoryId',
    description: 'Category ID',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns list of guides for the category',
  })
  async findByCategory(@Param('categoryId') categoryId: string) {
    return this.guideService.findByCategory(categoryId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get guide by ID' })
  @ApiParam({
    name: 'id',
    description: 'Guide ID',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns guide details with HTML content',
  })
  @ApiResponse({
    status: 404,
    description: 'Guide not found',
  })
  async findOne(@Param('id') id: string) {
    return this.guideService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a guide',
    description: 'Updates guide details including title, HTML content, category, or active status',
  })
  @ApiParam({
    name: 'id',
    description: 'Guide ID',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({
    status: 200,
    description: 'Guide updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Guide not found',
  })
  async update(@Param('id') id: string, @Body() updateGuideDto: UpdateGuideDto) {
    return this.guideService.update(id, updateGuideDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a guide' })
  @ApiParam({
    name: 'id',
    description: 'Guide ID',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({
    status: 200,
    description: 'Guide deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Guide not found',
  })
  async delete(@Param('id') id: string) {
    return this.guideService.delete(id);
  }
}
