// SPDX-FileCopyrightText: 2025 Juan Medina
// SPDX-License-Identifier: MIT

import {describe, it, expect} from "vitest";
import {Solvers} from "../../src/days";

describe("days/index", () => {
	it("exports solvers for days 1..8 and each has part1 and part2", () => {
		const expectedDays = [1, 2, 3, 4, 5, 6, 7, 8];

		expectedDays.forEach((d) => {
			const solver = (Solvers as any)[d];
			expect(solver).toBeDefined();
			expect(typeof solver.part1).toBe("function");
			expect(typeof solver.part2).toBe("function");
		});

		expect(Object.keys(Solvers).length).toBe(expectedDays.length);
	});
});
