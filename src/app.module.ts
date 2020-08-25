import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule,CommonModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
