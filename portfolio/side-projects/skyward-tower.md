# Skyward Tower — personal side project

This is a side project, not the headline of the portfolio. I built the game myself, solo, with AI pair programming in Cursor and Claude. I include it here because the same habits I use in data and automation work — closed-form models, caps, verification scripts, and a shared spec — show up in how I design and tune it.

## What I built

Skyward Tower is a 3D action climber with a toy-diorama look, made in Unity 6 (URP). The pitch is simple: climb the tower, reach the sky. A town hub sits between runs, and loot only banks when you clear a floor. Several job classes can switch mid-run; physical and astral matchups shape combat; each floor draws from a species roster and ends in a boss room. Progression comes from banded equipment, socketed stones, pets, and refinement.

I took it from a Phase A scaffold, to a playable tower slice, then town, loot and pets, then class visual effects, then procedural floors. There is a Windows build and a Steamworks integration checklist. The game is **unreleased** and is not a public product. I am not linking a repository.

## v1.1.0 balance plan (design phase)

Only this later chapter is still in the design phase. I directed six AI design agents (Player, Monsters, Effects, Stones, Equipment, Game Balance) against one shared Markdown plan, with the live Unity systems treated as read-only ground truth. Coordination used dependency notes, a decisions log, and hash-checked edits: each agent re-read the live file and its hash before writing, then merged, so concurrent changes stayed coherent. Python verification scripts re-check a “balance contract” after those specialist edits.

The transferable part is the systems modeling. Damage is a closed-form expression, for example

`max(1, floor(ATK × skill × matchup × K/(K+DEF) × crit × final))` with `K = 10×(level+1)`

Resists stack as `1 − Π(1−R)` with a hard ceiling. The contract sets expected player and monster stats at band midpoints. Difficulty is defined by hits-to-kill and hits-to-die targets, with a minimum loadout for the medium band. Species shapes are normalized across power tiers. Equipment uses one global tuning knob (band unit × piece weight × rarity × refine) so a single change can be verified against the contract instead of retuning every piece by hand.

## Stack

Unity 6 / C# (URP), a Markdown design plan, Python verification and solvers, and the same kind of spec-driven workflow I use in professional data work.

This note contains no repository links, build artifacts, or unpublished numeric tables.
