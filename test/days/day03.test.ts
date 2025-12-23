// SPDX-FileCopyrightText: 2025 Juan Medina
// SPDX-License-Identifier: MIT

import {describe, expect, it} from 'vitest';
import dedent from 'ts-dedent';
import {Bank, day03} from '../../src/days/day03';

describe('Day 3', () => {

	const input = dedent`
		987654321111111
		811111111111119
		234234234234278
		818181911112111
    `;

	it('solves part 1 example', () => {
		expect(day03.part1(input)).toBe("357");
	});

	it('solves part 2 example', () => {
		expect(day03.part2(input)).toBe("3121910778619");
	});


	it('bank from line works', () => {
		expect(Bank.from("123").batteries).toEqual([1, 2, 3]);
		expect(Bank.from("52").batteries).toEqual([5, 2]);
	});


	it('parses input correctly', () => {
		const data = dedent`
			123
			456
		`;
		const banks = day03.parse(data);
		expect(banks.length).toBe(2);
		expect(banks[0].batteries).toEqual([1, 2, 3]);
		expect(banks[1].batteries).toEqual([4, 5, 6]);
	});

	it('joltage calculation works', () => {
		expect(Bank.from("987654321111111").joltage(2)).toBe(98);
		expect(Bank.from("811111111111119").joltage(2)).toBe(89);
		expect(Bank.from("234234234234278").joltage(2)).toBe(78);
		expect(Bank.from("818181911112111").joltage(2)).toBe(92);

		expect(Bank.from("987654321111111").joltage(12)).toBe(987654321111);
		expect(Bank.from("811111111111119").joltage(12)).toBe(811111111119);
		expect(Bank.from("234234234234278").joltage(12)).toBe(434234234278);
		expect(Bank.from("818181911112111").joltage(12)).toBe(888911112111);
	});

});
