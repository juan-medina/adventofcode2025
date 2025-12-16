// SPDX-FileCopyrightText: 2025 Juan Medina
// SPDX-License-Identifier: MIT

import * as fs from "fs";
import * as path from "path";
import {Solvers} from "./days";

function main() {
	console.log("Advent of Code 2025\n");
	const args = process.argv.slice(2);
	if (args.length < 1) {
		console.error("Usage: node start <day>");
		process.exit(1);
	}

	const day = Number(args[0]);
	if (isNaN(day) || day < 1 || day > 12) {
		console.error("Day must be a number between 1 and 12.");
		process.exit(1);
	}

	console.log(`Day ${day}:`);

	const solver = Solvers[day];
	if (!solver) {
		console.error("Not implemented yet.");
		process.exit(1);
	}

	const inputPath = args[1] || path.join("data", args[0].padStart(2, "0") + ".txt");

	if (!fs.existsSync(inputPath)) {
		console.error(`No data file for day ${day} at path: ${inputPath}`);
		process.exit(1);
	}

	const input = fs.readFileSync(inputPath, "utf-8");

	console.log("- Part 1:", solver.part1(input));
	console.log("- Part 2:", solver.part2(input));
}

main();
