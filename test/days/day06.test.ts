// SPDX-FileCopyrightText: 2025 Juan Medina
// SPDX-License-Identifier: MIT

import {describe, expect, it} from 'vitest';
import dedent from 'ts-dedent';
import {day06, Operation, Problem} from '../../src/days/day06';

describe('Day 6', () => {
	it(`operation execution works`, () => {
		const problem1 = new Problem();
		problem1.operands.push(3)
		problem1.operands.push(5);
		problem1.operation = Operation.ADD;
		expect(problem1.result()).toBe(8);

		const problem2 = new Problem();
		problem2.operands.push(5)
		problem2.operands.push(9);
		problem2.operation = Operation.MULT;
		expect(problem2.result()).toBe(45);
	});

	it(`problem parse works`, () => {
		const problem = new Problem();

		problem.parse("3");
		problem.parse("5");
		problem.parse("+");

		expect(problem.operands).toEqual([3, 5]);
		expect(problem.operation).toBe(Operation.ADD);
	});

	it(`problem from lines works`, () => {
		const data = dedent`
			321  5
			75  19
			+    *
		`;
		const problems = Problem.from(data);
		expect(problems.length).toBe(2);

		expect(problems[0].operands).toEqual([321, 75]);
		expect(problems[0].operation).toBe(Operation.ADD);
		expect(problems[1].operands).toEqual([5, 19]);
		expect(problems[1].operation).toBe(Operation.MULT);
	});

	const input = dedent`
		123 328  51 64
		 45 64  387 23
		  6 98  215 314
		*   +   *   +
    `;

	it('solves part 1 example', () => {
		expect(day06.part1(input)).toBe("4277556");
	});
});
