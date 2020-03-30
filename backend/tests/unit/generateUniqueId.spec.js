const generateUniqueId = require('../../src/utils/generateUniqueId');

describe('Generate Unique ID', () => {
    it('should generate an unique id', () => {
        const id = generateUniqueId();

        expect(id).toHaveLength(8);     /* tenha 8 caracteres */

        //expect(2 + 2).toBe(5);
    });
});
