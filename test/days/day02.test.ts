// SPDX-FileCopyrightText: 2025 Juan Medina
// SPDX-License-Identifier: MIT

import {describe, expect, it} from 'vitest';
import {day02, Range} from '../../src/days/day02';

describe('Day 2', () => {
	it('range parses correctly', () => {
		expect(day02.range("10-20")).toEqual({first: 10, last: 20});
		expect(day02.range("0-0")).toEqual({first: 0, last: 0});
		expect(day02.range("123-456")).toEqual({first: 123, last: 456});
		expect(() => day02.range("10_20")).toThrow("Invalid input format");
		expect(() => day02.range("abc-def")).toThrow("Invalid input format");
	});

	it('converting range to ids works', () => {
		const range1 = new Range(5, 10);
		expect(range1.toIds()).toEqual([5, 6, 7, 8, 9, 10]);
		const range2 = new Range(0, 3);
		expect(range2.toIds()).toEqual([0, 1, 2, 3]);
	});

	it('invalid ids works', () => {
		const range1 = new Range(11, 22);
		expect(range1.invalidIds()).toEqual([11, 22]);

		const range2 = new Range(95, 115);
		expect(range2.invalidIds()).toEqual([99]);

		const range3 = new Range(998, 1012);
		expect(range3.invalidIds()).toEqual([1010]);

		const range4 = new Range(1188511880, 1188511890);
		expect(range4.invalidIds()).toEqual([1188511885]);
	});

	it('parses input correctly', () => {
		const input = `10-20,30-40,50-60`;
		const ranges = day02.parse(input);
		expect(ranges).toEqual([
			new Range(10, 20),
			new Range(30, 40),
			new Range(50, 60),
		]);
	});

	const input = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`;

	it('solves part 1 example', () => {
		expect(day02.part1(input)).toBe("1227775554");
	});
});
