---
layout: wordle
title: Get unstuck at Wordle
date: 2024-12-08 21:01:00
description: Quick utility to give some suggestions based on a screenshot
---

While solving Wordle, after the first couple of guesses, I always want my next guess to use letters I haven't used before, or possibly the ones that are in the incorrect position (and thus marked yellow). However, this strategy sometimes leaves me more stumped than I'd like. I created this tool that allows you to upload a screenshot of your current Wordle state and get a list of potential words using only the valid letters.

I developed this primarily as a thought exercise since I don't actually want to use it during a solve, but it's always fun to look back and see what words I missed when stuck. The primary challenge was figuring out the location of the keyboard and then accurately determining the key colors—all done in JavaScript on the client side. The final words are sorted based on word rankings from [this great list](https://sonorouschocolate.com/notes/index.php/The_best_strategies_for_Wordle,_part_3_(July_2023)). I've tested this with both light and dark mode screenshots, from the NYT Games app as well as Safari screenshots, but I'm sure it doesn't handle all possible cases.
