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
		expect(day03.part2(input)).toBe("357");
	});


	it('bank from line works', () => {
		expect(Bank.fromLine("123").batteries).toEqual([
			{value: 1, index: 0},
			{value: 2, index: 1},
			{value: 3, index: 2},
		]);
		expect(Bank.fromLine("52").batteries).toEqual([
			{value: 5, index: 0},
			{value: 2, index: 1},
		]);
	});


	it('parses input correctly', () => {
		const data = dedent`
			123
			456
		`;
		const banks = day03.parse(data);
		expect(banks.length).toBe(2);
		expect(banks[0].batteries).toEqual([
			{value: 1, index: 0},
			{value: 2, index: 1},
			{value: 3, index: 2},
		]);
		expect(banks[1].batteries).toEqual([
			{value: 4, index: 0},
			{value: 5, index: 1},
			{value: 6, index: 2},
		]);
	});

	it('joltage calculation works', () => {
		expect(Bank.fromLine("987654321111111").joltage()).toBe(98);
		expect(Bank.fromLine("811111111111119").joltage()).toBe(89);
		expect(Bank.fromLine("234234234234278").joltage()).toBe(78);
		expect(Bank.fromLine("818181911112111").joltage()).toBe(92);
	});

})
;
