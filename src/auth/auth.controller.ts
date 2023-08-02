import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Tokens } from './types';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED) // return 201
  signupLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signupLocal(dto);
  }

  @Post('local/signin')
  @HttpCode(HttpStatus.OK) // return 200
  signinLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signinLocal(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  @HttpCode(HttpStatus.OK) // return 200
  logout(@Req() req: Request) {
    const user = req.user;
    return this.authService.logout(user['id']);
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  @HttpCode(HttpStatus.OK) // return 200
  refreshTokens() {
    return this.authService.refreshTokens();
  }
}
