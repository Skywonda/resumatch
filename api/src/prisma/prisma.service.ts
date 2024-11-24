import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(private configService: ConfigService) {
    super({
      log: ['error', 'warn'],
      errorFormat: 'minimal',
      datasources: {
        db: {
          url: configService.get('DATABASE_URL'),
        },
      },
    });
  }

  async onModuleInit() {
    const connectTimeout = setTimeout(() => {
      console.warn('Database connection is taking longer than expected...');
    }, 2000);

    try {
      await this.$connect();
      console.log('Successfully connected to database');
    } catch (error) {
      console.error('Failed to connect to database:', error);
      throw error;
    } finally {
      clearTimeout(connectTimeout);
    }

    if (this.configService.get('NODE_ENV') === 'development') {
      this.$use(async (params, next) => {
        const before = Date.now();
        const result = await next(params);
        const after = Date.now();
        console.log(
          `Query ${params.model}.${params.action} took ${after - before}ms`,
        );
        return result;
      });
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  // Helper method to handle unique constraint violations
  async handleUniqueConstraintError<T>(
    operation: () => Promise<T>,
    errorMessage = 'Record already exists',
  ): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      if (error.code === 'P2002') {
        throw new Error(errorMessage);
      }
      throw error;
    }
  }

  // Helper for safely deleting records with foreign key constraints
  async safeDelete(model: string, id: string) {
    try {
      return await (this[model] as any).delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2003') {
        throw new Error('Cannot delete record due to existing references');
      }
      throw error;
    }
  }
}
