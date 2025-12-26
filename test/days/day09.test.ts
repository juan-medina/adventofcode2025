// SPDX-FileCopyrightText: 2025 Juan Medina
// SPDX-License-Identifier: MIT

import {describe, expect, it} from 'vitest';
import dedent from 'ts-dedent';
import {Colors, day09, MovieTheater, Position, Tile} from '../../src/days/day09';

describe('Day 9', () => {

	it('tile from string', () => {
		const tile = Tile.from("1,-2");
		expect(tile).toStrictEqual(new Tile(1, -2));
		expect(tile.col).toBe(1);
		expect(tile.row).toBe(-2);
		expect(tile.color).toBe(Colors.Red);
	});

	it('tile area calculation', () => {
		const tile1 = new Tile(1, 2);
		const tile2 = new Tile(4, 6);
		expect(tile1.area(tile2)).toBe(20);

		const h1 = new Tile(0, 0);
		const h2 = new Tile(5, 0);
		expect(h1.area(h2)).toBe(6);

		const v1 = new Tile(0, 0);
		const v2 = new Tile(0, 4);
		expect(v1.area(v2)).toBe(5);
	});

	it('MovieTheater lines parsing', () => {
		const input = dedent`
			1,2
			-4,0
			-6,-7
		`;
		const tiles = MovieTheater.from(input);
		expect(tiles.tiles).toHaveLength(3);
		expect(tiles.tiles[0]).toStrictEqual(new Tile(1, 2));
		expect(tiles.tiles[1]).toStrictEqual(new Tile(-4, 0));
		expect(tiles.tiles[2]).toStrictEqual(new Tile(-6, -7));
	});

	it('MovieTheater rectangles calculation', () => {
		const input = dedent`
			1,1
			1,4
			4,1
		`;
		const theater = MovieTheater.from(input);
		const rectangles = theater.rectangles();
		expect(rectangles).toHaveLength(3);

		expect(rectangles[0]).toEqual({
			from: new Tile(1, 4),
			to: new Tile(4, 1),
			area: 16
		});

		expect(rectangles[1]).toEqual({
			from: new Tile(1, 1),
			to: new Tile(1, 4),
			area: 4
		});

		expect(rectangles[2]).toEqual({
			from: new Tile(1, 1),
			to: new Tile(4, 1),
			area: 4
		});

	});


	const input = dedent`
		7,1
		11,1
		11,7
		9,7
		9,5
		2,5
		2,3
		7,3
    `;

	it('solves part 1 example', () => {
		expect(day09.part1(input)).toBe("50");
	});

	it('solves part 2 example', () => {
		expect(() => day09.part2(input)).toThrowError("Method not implemented.");
	});

});
