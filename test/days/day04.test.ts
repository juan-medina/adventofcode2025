// SPDX-FileCopyrightText: 2025 Juan Medina
// SPDX-License-Identifier: MIT

import {describe, expect, it} from 'vitest';
import dedent from 'ts-dedent';
import {day04, Department} from '../../src/days/day04';

describe('Day 4', () => {

	const input = dedent`
		..@@.@@@@.
		@@@.@.@.@@
		@@@@@.@.@@
		@.@@@@..@.
		@@.@@@@.@@
		.@@@@@@@.@
		.@.@.@.@@@
		@.@@@.@@@@
		.@@@@@@@@.
		@.@.@@@.@.
    `;

	it('parses example input', () => {
		const data = dedent`
			@...
			..@.
			....
		`;

		const department = day04.parse(data);
		expect(department.rolls).toEqual([{x: 0, y: 0}, {x: 2, y: 1}]);
	});

	it('roll at works', () => {
		const department = new Department()

		department.rolls = [{x: 0, y: 0}, {x: 1, y: 1}];

		expect(department.has({x: 0, y: 0})).toBe(true);
		expect(department.has({x: 1, y: 1})).toBe(true);
		expect(department.has({x: 1, y: 0})).toBe(false);
		expect(department.has({x: 0, y: 1})).toBe(false);
	});

	it('rolls around works', () => {
		const department = new Department()

		// @..
		// @@.
		// .@.

		department.rolls = [{x: 0, y: 0}, {x: 0, y: 1}, {x: 1, y: 0}, {x: 1, y: 2}];

		expect(department.can({x: 0, y: 0})).toBe(2);
		expect(department.can({x: 1, y: 1})).toBe(4);
		expect(department.can({x: 2, y: 2})).toBe(1);
		expect(department.can({x: 2, y: 0})).toBe(1);
	});


	it('solves part 1 example', () => {
		expect(day04.part1(input)).toBe("13");
	});

	it('solves part 2 example', () => {
		expect(day04.part2(input)).toBe("43");
	});

});
