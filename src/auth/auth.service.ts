import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignUpDto } from './dto/signUp.dto';
import * as bcrypt from 'bcrypt'
import { SignInDto } from './dto/signIn.dto';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) { }
  async signUp(signUpDto: SignUpDto) {
    try {
      const userFound = await this.usersService.findByEmail(signUpDto.email)
      if (userFound) {
        throw new BadRequestException('User already exists')
      }
      const salt = await bcrypt.genSalt(10)
      const passwordHash = await bcrypt.hash(signUpDto.password, salt)

      await this.usersService.create({
        name: signUpDto.name,
        email: signUpDto.email,
        password: passwordHash
      })
      return { message: 'User created successfully' }
    } catch (error) {
      throw error
    }
  }
  async signIn({ email, password }: SignInDto) {
    try {
      const user = await this.usersService.findByEmail(email)

      if (!user) throw new UnauthorizedException('this email does not exist')

      const desencryptedPass = await bcrypt.compare(password, user.password)
      if (!desencryptedPass) throw new UnauthorizedException('the password is incorrect')

      const token = this.jwtService.sign({ email: user.email })
      return {
        token,
        email
      }

    } catch (error) {
      throw error
    }
  }
}
