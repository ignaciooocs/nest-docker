import { Controller, Post, Body, Search, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUp.dto';
import { ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/signIn.dto';
import { AuthGuard } from './guard/auth.guard';
import { Request as Req } from 'express';

interface CustomRequest extends Req {
  userEmail: string
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto)
  }

  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto)
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  profile(
    @Request() req: CustomRequest
  ) {
    return req.userEmail
  }
}
