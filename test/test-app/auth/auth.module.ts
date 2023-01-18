import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';

/**
 * Auth module
 */
@Module({
  controllers: [AuthController],
})
export class AuthModule {}
