// SPDX-FileCopyrightText: 2025 Juan Medina
// SPDX-License-Identifier: MIT

import * as fs from "fs";
import * as path from "path";

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

  const inputPath = args[1] || path.join("data", args[0].padStart(2, "0") + ".txt");

  if (!fs.existsSync(inputPath)) {
    console.error(`No data file for day ${day} at path: ${inputPath}`);
    process.exit(1);
  }

  const input = fs.readFileSync(inputPath, "utf-8");

  console.log(`Day ${day}:`);

  switch (day) {
    case 1:
      const { part1, part2 } = require("./days/day01");
      console.log("- Part 1:", part1(input));
      console.log("- Part 2:", part2(input));
      break;
    default:
      console.error(`not implemented yet.`);
  }
}

main();
