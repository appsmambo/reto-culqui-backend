import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { PkGuard } from '../shared/guards/pk.guard';
import { TokensService } from './tokens.service';
import { CreateCardDto } from './dto/create-card.dto';
import {
  ApiOperation,
  ApiTags,
  ApiBearerAuth,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';

@Controller('tokens')
@ApiBearerAuth()
@ApiTags('Card Tokenization')
export class TokensController {
  constructor(private tokensService: TokensService) {}

  @UseGuards(PkGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new card' })
  @ApiResponse({
    status: 201,
    description: 'The card has been successfully created.',
  })
  
  async createToken(@Body() createCardDto: CreateCardDto) {
    return this.tokensService.createToken(createCardDto);
  }

  @UseGuards(PkGuard)
  @Post(':token')
  @ApiOperation({ summary: 'Get a card by token' })
  @ApiParam({
    name: 'token',
    description: 'The token of the card',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'The card has been found and returned.',
  })
  @ApiResponse({ status: 404, description: 'Card not found' })
  async getCardByToken(@Param('token') token: string) {
    return this.tokensService.getCardByToken(token);
  }
}
