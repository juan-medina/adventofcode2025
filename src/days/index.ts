// SPDX-FileCopyrightText: 2025 Juan Medina
// SPDX-License-Identifier: MIT

import {Day} from "./day";

import {day01} from "./day01";
import {day02} from "./day02";
import {day03} from "./day03";
import {day04} from "./day04";

export const Solvers: Record<number, Day> = {
	1: day01,
	2: day02,
	3: day03,
	4: day04,
};