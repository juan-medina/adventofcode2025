// SPDX-FileCopyrightText: 2025 Juan Medina
// SPDX-License-Identifier: MIT

import { describe, it, expect } from 'vitest';
import dedent from 'ts-dedent';
import { part1, part2 } from '../../src/days/day01';

describe('Day 1', () => {
    const input = dedent`
        1
        2
        3
        4
    `;
    it('solves part 1 example', () => {
        expect(part1(input)).toBe("10");
    });

    it('solves part 2 example', () => {
        expect(part2(input)).toBe("4");
    });
});
