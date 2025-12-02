import * as SQLite from 'expo-sqlite';
import { Timezone } from '../types';
import { CREATE_TIMEZONES_TABLE } from './schema';

let databaseInstance: SQLite.SQLiteDatabase | null = null;

const getDatabase = async () => {
  if (databaseInstance) return databaseInstance;
  databaseInstance = await SQLite.openDatabaseAsync('timezones.db');
  await databaseInstance.execAsync(CREATE_TIMEZONES_TABLE);
  return databaseInstance;
};

export const saveTimeZones = async (timezones: Timezone[]): Promise<void> => {
  if (!timezones.length) return;
  
  const database = await getDatabase();
  const validTimezones = timezones.filter(tz => tz.id && tz.name && typeof tz.gmtOffset === 'number');
  
  if (!validTimezones.length) return;

  await database.withTransactionAsync(async () => {
    await database.execAsync('DELETE FROM timezones');
    
    const placeholders = validTimezones.map(() => '(?, ?, ?)').join(', ');
    const values = validTimezones.flatMap(tz => [tz.id, tz.name, tz.gmtOffset]);
    
    await database.runAsync(
      `INSERT INTO timezones (id, name, gmtOffset) VALUES ${placeholders}`,
      values
        );
  });
};

export const loadTimeZones = async (): Promise<Timezone[]> => {
  const database = await getDatabase();
  const results = await database.getAllAsync<Timezone>(
    'SELECT id, name, gmtOffset FROM timezones ORDER BY name'
  );
  return results.filter(tz => tz.id && tz.name && typeof tz.gmtOffset === 'number');
};

