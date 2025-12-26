// SPDX-FileCopyrightText: 2025 Juan Medina
// SPDX-License-Identifier: MIT

import {Day} from "./day";

export class Position {
	col: number
	row: number

	constructor(col: number, row: number) {
		this.col = col;
		this.row = row;
	}
}

export enum Colors {
	Red = '#',
}

export class Tile extends Position {
	color: Colors;

	constructor(col: number, row: number) {
		super(col, row);
		this.color = Colors.Red;
	}

	static from(data: string): Tile {
		const [x, y] = data.split(',').map(Number);
		return new Tile(x, y);
	}

	area(other: Tile): number {
		const dx = Math.abs(this.col - other.col) + 1;
		const dy = Math.abs(this.row - other.row) + 1;
		return dx * dy;
	}
}


interface Rectangle {
	from: Position;
	to: Position;
	area: number;
}

export class MovieTheater {
	tiles: Tile[];

	constructor(tiles: Tile[]) {
		this.tiles = tiles;
	}

	static from(lines: string): MovieTheater {
		const tiles = lines.split('\n').map(line => Tile.from(line));
		return new MovieTheater(tiles);
	}


	rectangles(): Rectangle[] {
		const edges: Rectangle[] = [];
		for (let i = 0; i < this.tiles.length; i++) {
			for (let j = i + 1; j < this.tiles.length; j++) {
				const from = this.tiles[i];
				const to = this.tiles[j];
				const area = from.area(to);
				edges.push({from, to, area});
			}
		}
		return edges.sort((a, b) => b.area - a.area);
	}
}

export class Day09 extends Day {

	part1(input: string): string {
		const theater = MovieTheater.from(input);
		const rectangles = theater.rectangles();
		return rectangles[0].area.toString();
	}


	part2(input: string): string {
		throw new Error("Method not implemented.");
	}
}

export const day09 = new Day09();
