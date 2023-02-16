import { TestexExecutorSchema } from './schema';

export default async function runExecutor(
  options: TestexExecutorSchema,
) {
  console.log('Executor ran for Testex', options);
  return {
    success: true
  };
}

