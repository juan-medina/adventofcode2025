// SPDX-FileCopyrightText: 2025 Juan Medina
// SPDX-License-Identifier: MIT

import {describe, expect, it} from 'vitest';
import dedent from 'ts-dedent';
import {Database, day05, Range} from '../../src/days/day05';

describe('Day 5', () => {

	const input = dedent`
		3-5
		10-14
		16-20
		12-18

		1
		5
		8
		11
		17
		32
    `;

	it('range contains', () => {
		const range = new Range(3, 7);
		expect(range.contains(2)).toBe(false);
		expect(range.contains(3)).toBe(true);
		expect(range.contains(5)).toBe(true);
		expect(range.contains(7)).toBe(true);
		expect(range.contains(8)).toBe(false);
	});

	it('range array', () => {
		const range = new Range(3, 7);
		expect(range.array()).toEqual([3, 4, 5, 6, 7]);
	});

	it('range from string', () => {
		const range = Range.fromString("3-7");
		expect(range.start).toBe(3);
		expect(range.end).toBe(7);
	});

	it('database from string', () => {
		const data = dedent`
			2-5
			7-10

			1
			3
			8
		`;

		const db = Database.fromString(data);

		expect(db.fresh.length).toBe(2);

		expect(db.fresh[0].start).toBe(2);
		expect(db.fresh[0].end).toBe(5);

		expect(db.fresh[1].start).toBe(7);
		expect(db.fresh[1].end).toBe(10);

		expect(db.ingredients.length).toBe(3);
		expect(db.ingredients).toEqual([1, 3, 8]);
	});

	it('solves part 1 example', () => {
		expect(day05.part1(input)).toBe("3");
	});
});
