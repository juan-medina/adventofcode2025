// SPDX-FileCopyrightText: 2025 Juan Medina
// SPDX-License-Identifier: MIT

import {describe, expect, it} from 'vitest';
import dedent from 'ts-dedent';
import {day01, Direction} from '../../src/days/day01';

describe('Day 1', () => {
	const input = dedent`
		L68
		L30
		R48
		L5
		R60
		L55
		L1
		L99
		R14
		L82
    `;

	const directions = dedent`
		L10
		R5
		L2
	`;

	it('valid sequence parsing', () => {
		const sequences = day01.parse(directions);
		expect(sequences).length(3);
		expect(sequences).toEqual([
			{direction: Direction.Left, steps: 10},
			{direction: Direction.Right, steps: 5},
			{direction: Direction.Left, steps: 2},
		]);
	})


	it('solves part 1 example', () => {
		expect(day01.part1(input)).toBe("3");
	});

	it('solves part 2 example', () => {
		expect(day01.part2(input)).toBe("6");
	});
});
