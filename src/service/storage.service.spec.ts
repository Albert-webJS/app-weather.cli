import { join } from 'path';
import os from 'os';
import { promises } from 'fs';
import { store } from './storage.service';

// before use this test case need replace 'private' property for filePath & method isExist on 'public'
// after use command 'npm run test';

describe('Store', () => {
	beforeEach(async () => {
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		await promises.unlink(store.filePath).catch(() => {});
	});

	describe('saveValueByKey', () => {
		it('should save a value to file', async () => {
			const key = 'temperature';
			const value = '15';

			await store.saveValueByKey(key, value);

			const fileContent = await promises.readFile(store.filePath, 'utf8');
			const data = JSON.parse(fileContent);
			expect(data[key]).toBe(value);
		});
	});

	describe('getValueByKey', () => {
		it('should return undefined if the key does not exist', async () => {
			const key = 'temperature';

			const result = await store.getValueByKey(key);

			expect(result).toBeUndefined();
		});

		it('should return the value of the key if it exists', async () => {
			const key = 'temperature';
			const value = '15';
			const data = { [key]: value };
			await promises.writeFile(store.filePath, JSON.stringify(data));

			const result = await store.getValueByKey(key);

			expect(result).toBe(value);
		});
	});

	describe('isPathExist', () => {
		it('should return true if the path exists', async () => {
			const result = await store.isPathExist(store.filePath);
			expect(result).toBe(true);
		});

		it('should return false if the path does not exist', async () => {
			const path = join(os.tmpdir(), 'not-existing-path.json');
			const result = await store.isPathExist(path);
			expect(result).toBe(false);
		});
	});
});
