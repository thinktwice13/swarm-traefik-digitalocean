import database from '@lib/database'
import { getConnection } from 'typeorm'

beforeAll(async () => {
  try {
    await database()
  } catch (error) {
    console.log(error)
  }
})

// Credit https://walrus.ai/blog/2020/04/testing-database-interactions-with-jest/
beforeEach(async () => {
  const queryRunner = getConnection('test').createQueryRunner()
  await queryRunner.query(`
      DO
      $func$
      BEGIN
        EXECUTE (
          SELECT 'TRUNCATE TABLE ' || string_agg(oid::regclass::text, ', ') || ' CASCADE'
            FROM pg_class
            WHERE relkind = 'r'
            AND relnamespace = 'public'::regnamespace
        );
      END
      $func$;
    `)
  await queryRunner.release()
})

afterAll(async () => {
  // Close clients: Avoids TCPSERVERWRAP open handle by jest workaround
  await getConnection('test').close()
})
