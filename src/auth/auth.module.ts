import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AtSrategy, RtSrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, AtSrategy, RtSrategy],
})
export class AuthModule {}
