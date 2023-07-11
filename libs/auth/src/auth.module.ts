import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtFactory } from './config';
import { GUARDS } from './guards';
import { STRATEGIES } from './strategies';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync(JwtFactory),
  ],
  providers: [AuthService, ...GUARDS, ...STRATEGIES],
  exports: [AuthService],
})
export class AuthModule {}
