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

## Systems

65 systems: 45 built, 10 in progress, 10 planned.

Status key: **Built**, **In progress**, **Planned**.

<details>
<summary>The tower and the run (6)</summary>

**Tower climb** — Built

You leave town, clear an open floor of monsters, enter a boss room, and return to town. There are 50 floors. Clearing a floor banks that run's loot; death or abort wipes the run bag.

**Pending loot and floor-clear banking** — Built

Silver, equipment, stones, eggs, ores, and monster loots stay pending until a floor is cleared. Run state survives the mining dungeon and the boss-room scene load, then commits or wipes on the way back to town.

**Floor access** — Built

A class may enter a floor at its own level, or farm a lower floor only when every unlocked class is already above that floor. A class cannot enter a floor above its level.

**Soul assignment (class levels)** — Built

After an on-level boss clear, you assign the boss soul to an eligible class whose level equals that floor. That class gains one level, up to 50. Farm clears do not grant a soul.

**Level-gap penalty** — In progress

If the active class is well above the floor, equipment and stone drop rates fall by 2% for every two levels of gap. Silver is designed to use the same rule later and does not yet.

**Difficulty bands and floor curve** — Built

Floors and loot sit in five bands: 1–10, 11–20, 21–30, 31–40, and 41–50 (Beginner through Master gear). Monster spawn weights shift from a 100% weakest-band pack on floors 1–5 toward late- and end-band packs on floors 41–50.

</details>

<details>
<summary>Combat (10)</summary>

**Hit and damage resolve** — Built

A hit rolls accuracy against evasion, then a bonus block chance, then damage: (effective attack / tankiness) × damage divisor × matchup, with a minimum of 1. Tankiness blends the defender's HP and Defense. Player attacks use a fixed divisor of 2; monster damage uses a per-band divisor so later floors hit harder. Luck can crit; base crit damage is 1.5×, capped at 3× with bonuses. This is the live formula; the v1.1.0 plan replaces it.

**Physical and Astral matchups** — Built

Monsters are Physical or Astral. Physical attacks beat Physical bodies and Magic attacks beat Astral bodies at full damage; crossing matchups deals half damage. Astral monsters and the player's Magic form are drawn see-through.

**Player movement and actions** — Built

Eight-way movement with a slightly slower diagonal. A 5-unit dash on a 5-second shared cooldown (R). Space hops one cube up or down. Facing-based normal attacks (F or left click) do not need a lock. Skills are Q / W / E. Hold Shift or click to lock a monster in a forward cone. Movement is blocked while attacking or casting.

**Skills and forms** — Built

Each job has Physical and Magic forms (Tab) that share stats. Each form has three skills whose cooldowns freeze when you leave the form and resume when you return; dash stays shared. Passives stay on in both forms. Attack speed is locked per class and form; there is no Agility stat in the live build. Live kits: Warrior (Bash, Shield Stomp, Bowling Bash / Multi Slash, Grand Cross, Cleaving Light; Guard Blessing, Blade's Blessing); Hunter (Triple Arrows, Multi Firing, Bow Swing / Light Arrow, Exploding Arrow, Arrow Shower; Tailwind, Forceful Shot); Mercenary (Piercing Dagger, Dagger Thrust, Encircling Slash / Dagger Throw, Explosive Strike, Lightning Strike; Swift Feet, Swift Attack); Blacksmith (Hammer Stump, Hammer Fall, Earthquake / Acid Attack, Scorching Wave, Meltdown; Tempered Armor, Heavy Strike); Arcane (Water Drop, Energy Burst, Matter Explosion / Light Strike, Explosion, Freezing Field; Mana Shield, Auto Cast).

**Target lock** — Built

A 20-unit, 45-degree forward cone picks the monster straight ahead, used for skills and optional attack focus. Normal attacks still work without it.

**Monster AI** — In progress

Normal monsters use chase-and-attack AI, Passive or Aggro; bosses and variants always aggro. A RunAway personality is defined but not used. Attacking a monster pulls same-species allies within 10 units. At most three monsters may swing at once.

**Monster skill kits** — Built

Each of the 50 species has a baked skill kit, typically two or three skills plus a passive. Skill range is independent of the species' normal-attack range.

**Scripted boss AI** — Built

Every species maps to one of six scripted boss styles: a rear weak-point bumper, a split / multi-body fight, a charge with an arena hazard, a hazard phase with an exposed window, a perch-and-swoop pattern, and a state-gated ricochet.

**Natural HP recovery** — Built

The active class regenerates HP in and out of combat. The delay after taking damage is currently zero, so regen continues in battle, at 75% of the legacy curve.

**Block and dodge helpers** — In progress

Bonus block (for example Guard Blessing) and bonus dodge are used in damage resolve. Older inherent-block and inherent-dodge formulas are unused stubs.

</details>

<details>
<summary>Jobs, exams, and progression (5)</summary>

**Five job classes** — Built

The live jobs are Warrior, Blacksmith, Mercenary, Hunter, and Arcane. Each has its own HP bar, stats, loadout, and out-of-combat craft loop. Base stats use a 40-point multiplier budget on a level seed. You start by unlocking a class through an instructor, then can switch among unlocked classes. Gear stat focus (main / secondary): Warrior HP / Defense, Hunter Attack / Mana, Arcane Mana / Attack, Mercenary Luck / HP, Blacksmith Defense / Luck.

**Mid-run class switch** — Built

In town, switch freely among unlocked classes. In the tower, you may switch only to another unlocked class at the same level, and only if the current class still has HP, with a 10-second cooldown. The class you leave keeps its remaining HP until you switch back. The binding is hold C.

**Job exams** — Built

All five classes share one exam scene with a per-class challenge, then return to the instructor and receive a Job Class Stone (a key item, not a socket stone). Warrior: stay on a narrow path to the far end. Blacksmith: kill the five slimes actually labeled “slime” among lookalikes; a wrong hit fails. Hunter: gather 25 wood from a tree field. Mercenary: cross a 50×50 yard of patrolling slimes without being seen. Arcane: find the exit in a dark seeded maze, lit only by a short player light.

**Instructor and companion quests** — Built

A shared instructor dialog starts the exam for each class. After a job reaches level 5, a companion-bond quest unlocks that class's companion.

**Training grounds** — Built

Town training dummies open a panel of bosses you have already defeated. You can fight one at a chosen level with no soul, loot, or floor credit, then return to the same town spot.

</details>

<details>
<summary>Equipment, stones, and the economy (6)</summary>

**Equipment** — Built

Eight slots per class: weapon, off-hand (shield), body, pants, boots, head, necklace, and ring. Gear is class-set and band-based; you can equip the same band or lower. A matching full set multiplies Actual by 1 + 0.10 × gear band (Band 1 is 1.1×). Wearing outdated gear loses 0.08 from both the band match and the refine bonus for each player band above the piece. Each class set has three pieces on the main stat (40/40/20), two on the secondary (50/50), and three solo-stat pieces. Tiers are Beginner, Adventurer, Advance, Elite, and Master. Rarity rolls independently: Normal 49.5%, Uncommon 30%, Rare 15%, Unique 5%, Legend 0.5%.

**Refinement** — In progress

Spend processed ore to raise a piece from +0 to +10. Outcomes are Success, Nothing, Downgrade, or Break. Break marks the item broken rather than destroying it; the Blacksmith can fix it (Solder Potion is the repair material). Metal powders shift some Downgrade chance into Nothing. A silver cost is designed but not charged.

**Stones** — Built

Monsters drop unprocessed stones named Stone I–V by floor band. Drop rates are 3% on normals and 6% on bosses (variants double). The Mercenary processes them. Socket counts are 1–2 on normal drops (70/30) and 1–3 on bosses (50/40/10). A processed stone can be socketed into an empty gear socket and is consumed. Defensive passive chance from stones is capped at 20% per job.

**Loot and silver** — Built

Each kill can roll silver, equipment, stones, eggs, and monster-specific loots. Equipment has a 10% chance from normals and 20% from bosses (variants double). When equipment drops, each job has a 20% share, then an equal 12.5% chance per slot. Kindred Potion raises the killing class's bind to 60% and leaves 10% for each other job. Tyrant Potion adds one extra success roll on each boss drop gate. Silver is 5 per monster level, ×5 from bosses.

**Inventories and key items** — Built

Committed inventories cover equipment, stones, materials, potions, ores, eggs, pets, and key items (Job Class Stones). The inventory pad (I) has tabs for equipment, loots, materials, potions, stones, key items, eggs, pets, and the main menu.

**Shop** — In progress

Selling equipment and stones for silver works from the legacy town tools. The refiner's Sell / Buy tab still shows a coming-soon buy view, and there is no buy-supplies service yet.

</details>

<details>
<summary>Job crafts (5)</summary>

**Warrior — loot processing** — Built

Spend raw monster loots as a point bank to craft processed materials used in refine and potions. Success rate is a base chance plus 5% per player level band. A failure consumes half of each placed stack (rounded up, minimum 1).

**Blacksmith — ore processing, refine, and repair** — Built

Process classic Raw Bronze / Lead / Brass, plus special mining ores (Material, Black, Catalyst, Pure, Ancient), into refine metals, powders, and occasional stones. Band for classic ore follows the Blacksmith's job level; special-ore quantity and band come from the dig. The same job also refines and fixes gear.

**Mercenary — stone processing** — Built

A hex-click carving board (up to 10 clicks) reveals hidden rarities: Normal 50%, Polished 30%, Rare 15%, Unique 4%, Relic 1% (the board seeds 1 Relic, 4 Unique, 15 Rare, 30 Polished, and the rest Normal). The stone then rolls one stat effect for its band; bands 3–5 may also roll a defensive-passive proc. Processing also rolls potion-point materials. Stones are not locked to a job after processing.

**Hunter — hatch and stars** — Built

Pets have no rarity. Hatching spends the egg and rolls success by band and form (Band 1 Normal is 75%, down to Band 5 Boss Variant at 40%). Materials can drop even on a failed hatch. A successful hatch starts at 0 stars; promoting to 5 stars spends pet points, and each new star rolls one Actual bonus on a random stat, scaled by band and form (Normal ×1, Variant ×1.25, Boss ×1.1, Boss Variant ×1.5). Feeding an unequipped bag pet converts it into points.

**Arcane — potion creation** — Built

Craft potions from material potion-points (ore powders, processed loots, and stone-process materials). Primary metals have zero potion points and cannot be selected. Success spends the placed stacks in full; failure spends half (same rule as Warrior loot). One run buff can be active at a time, activated from inventory before entering the tower, then consumed when the run ends. Recipes include combat pots (Bloodheat, Bulwark, Fortune, Aether, Lifeblood, Windstride, Fracture, Hawkmark), bounty pots (Scavenger, Mint, Relic, Armory, Brood, Mutation, Tyrant, Kindred), and life pots (Solder, Orebeacon, Overload, Temper, Render, Chisel, Prestige, Piercer).

</details>

<details>
<summary>Monsters (4)</summary>

**Fifty-species roster** — Built

A locked roster of 50 named species, each with level-1 base stats, a power band (Weakest, Early, Mid, Late, End), a default boss floor, move speed, attack range and cadence, and a model-size ratio versus the player. Examples range from Capeetle on floor 1 through Dragon and Fallen Angel on floors 49–50. End-game bosses on floors 46–50 are fixed species; floors 2–45 use a saved permutation of the remaining roster.

**Floor spawns** — Built

Each open floor spawns 50 normal monsters from band pools with locked weights. Variants are a 1% chance (1.2× stats, always aggro). A mining entrance always appears on floor 1 and has a 20% chance on later floors (Orebeacon Potion can double that).

**Bosses** — Built

Clearing the 50 normals reveals a boss door. The boss room is a smaller arena with a scaled-up form of that floor's boss: HP ×3.5 and other stats ×1.25, at 1.5× visual scale for authored meshes.

**Monster art** — Built

Many species have authored models and variant palettes, with ongoing art polish across the full roster.

</details>

<details>
<summary>Pets and companions (2)</summary>

**Pets** — Built

Pets are visual followers with star bonuses; they do not fight on their own. Form is stamped from the monster that dropped the egg: Normal, Variant, Boss, or Boss Variant. Egg drop rates are 3% / 6% for normal / boss, doubled for variants. You may own many pets; each class equips one, and any job can use any pet that is not already equipped. On a successful hatch there is a second roll for the species' always-on monster passive (Normal 50%, Variant 60%, Boss 55%, Boss Variant 65%), which applies to the player while that pet is equipped.

**Companions** — Built

Each job has one companion bird, unlocked at job level 5: Hunter Falcon, Arcane Owl, Mercenary Crow, Blacksmith Woodpecker, and Warrior Horned Bird. They follow in town and in the tower and grant band-stacking bonuses as the job levels (for example Defense percent, extra range, move speed, resists, or offensive-passive chance). Band 3 and Band 5 can each add 5% to the offensive job-passive proc, capped so the total stays at 15%. Companions have no combat HP body.

</details>

<details>
<summary>Town, narrative, and tutorial (4)</summary>

**Town hub** — Built

A walkable town between runs: instructors, a refiner NPC, companion totems, the tower entrance, training dummies, and a dungeon entrance. Position can be saved.

**Intro and story flags** — Built

A new game plays a four-page prologue: a town that raised a tower toward the sky, angels halting the climb at the fiftieth floor, Job Class Stones, and your arrival as an adventurer. Flags persist for intro completion, town and floor tutorial hints, job unlocks, companion quests, floor 1 clear, and early boss dialogue.

**Tutorial hints** — Built

One-line, dismissible prompts in town and on the first floor, covering movement, combat keys, inventory, and the boss-door rule.

**Map** — Built

The inventory main-menu map lists tower floors, marks the current and cleared floors, and shows access state. A circular minimap on the HUD shows a local 100×100 window and a boss-door arrow.

</details>

<details>
<summary>Floors, mining, and the look of the world (4)</summary>

**Floor layouts** — In progress

Open floors are 50×50 boards (2.5 m cells). Floors 1–3 have hand-painted layout and prop maps; higher floors fall back to the floor 1 layout when a dedicated map is missing. A full set of unique layouts for floors 4–50 is still a content gap.

**Mining dungeon** — Built

A 50×50 dig map with 25 crushable boulders. Every boulder has a reward: one each of Raw Bronze, Raw Lead, and Raw Brass, one star (doubles the visit's yield), and 21 special ores (Material 60%, Black 25%, Catalyst 10%, Pure 4%, Ancient 1%). You may crush 15, then must exit. Special-ore quantity follows the floor band. Yield is pending until the floor is cleared.

**Diorama presentation** — Built

URP lighting and post-process, a tabletop framing, figurine-scale characters (about 1.75× authored meshes), tiled floor kits, and stylized props. Soft-focus render features keep the board readable. Town buildings and tower props use authored collision so openings stay walkable.

**Equipment visuals** — In progress

Weapons and shields attach to hand bones and follow attack poses (Warrior swords and shields, Hunter bows, and so on). Showing armor pieces on the body, and a shared customizable appearance (hair, eyes, mouth), was planned and then deferred in favor of the current per-class baked bodies.

</details>

<details>
<summary>Camera, audio, and effects (3)</summary>

**Camera** — Built

Two views, saved as a client preference (not on the save slot): a fixed diorama angle that stays world-south, and a third-person orbit cam. In third person, hold V and move the mouse (or use the arrows) to look. The boom length is fixed. Town and tower maps clamp the diorama lens so the void past the rim stays off-screen.

**Combat VFX** — Built

Per-class impact, projectile, slash, shockwave, and shield effects (Warrior slashes, Hunter arrow shower, Mercenary daggers, Blacksmith hammer shockwaves, Arcane delayed bursts, and others).

**Audio** — Planned

There is no project music or sound-effect runtime yet — only a listener on the camera.

</details>

<details>
<summary>Interface, input, and settings (5)</summary>

**Inventory and HUD** — Built

The I inventory pad is the main town and pause-adjacent UI (character pane, equipment doll, and bag tabs). In-world HUD covers skills, class wheel, floor status, damage popups, boss-room chrome, player info, mining prompts, and the minimap. Pause, defeat (with a countdown back to town), exam HUDs, instructor dialog, and NPC refine/craft panels are all in.

**Legacy town menu** — In progress

M still opens older town tools (equip, refine, sell, pets). Unifying or retiring it is open polish.

**Settings** — In progress

The main-menu Settings page currently only switches camera view (Diorama vs 3rd person). There is no volume, graphics, or key-rebinding UI yet, though controls are data-driven.

**Input** — In progress

Keyboard and mouse. Defaults include arrows or hold right mouse to move, F / left click to attack, Q W E for skills, R dash, Space jump, Tab form, T to cycle skill pages, C class switch, V camera look, I inventory, M HUD, Esc for the main menu / pause. Gamepad bindings are not present.

**Localization, achievements, analytics** — Planned

The game is authored in English only. Achievements are listed as a later Steam feature (examples such as clearing floor 1 or unlocking Warrior) and are not wired. There is no game-side analytics or live-ops system.

</details>

<details>
<summary>Saving, builds, and tools (4)</summary>

**Saves** — Built

Versioned JSON, five slots, saved only in town or right after a floor clear — never mid-floor. A slot stores class progress, highest cleared floor, boss permutation, wallets, equipment and loadouts, stones, key items, materials, potions, the active run buff, pets and companions, story flags, and town position. Migrations carry older slots forward. Camera preference is stored separately.

**Windows build** — Built

A menu and command-line path produce a Windows 64-bit standalone build, with a written smoke-test checklist for the vertical slice.

**Steam** — Planned

A post-slice checklist covers identity, overlay, achievements, Cloud for the JSON saves, and rich presence. Nothing is integrated in the build.

**Editor and offline tools** — Built

Editor menus set up scenes, import floor maps, check visuals and animations, generate playtest saves, and run the Windows build. Offline Python and Blender tools generate catalogs from spreadsheets (monster roster, skills, loots, craft recipes), simulate combat survivability, author floor art, and bake character and monster animation. These are development tools, not player-facing systems.

</details>

<details>
<summary>Version 1.1.0 plan (7)</summary>

These systems are locked in the v1.1.0 design plan and are not in the live build. Each is labelled Planned.

**Stats overhaul** — Planned

Removes Luck and Mana. Adds Dexterity (skill cooldown reduction) and Agility (move speed). Keeps HP, Attack, and Defense. New conversion from raw points to Actual, including a 1.5× main-stat weight and saturating curves for secondary effects.

**New damage and difficulty contract** — Planned

Replaces the live tankiness formula with a locked model: max(1, floor(ATK × skill × matchup × K / (K + DEF) × crit × final)), with K = 10 × (level + 1). Difficulty is defined by hits-to-kill and hits-to-die bands (Medium is 3–5 HTK and 8–12 HTD), with a Balance Contract at ten half-band midpoints.

**Gear and stone retune** — Planned

Keeps the eight slots. Introduces a global band-unit × piece-weight × rarity × refine curve, rarity labels 1–5, new bonus-line tables, and a new stone slot structure per band (stat, guard, edge, and reserved defensive-proc slots), plus an 18-effect bonus catalog with stacking rules and caps.

**Alchemist class** — Planned

A planned v1.1.0 job with a new normal-attack and skill kit (Physical, Magic, and passives). The live Arcane kit and potion loop stay until this ships.

**Volatile status, reactions, and Catalysts** — Planned

A Non-Volatile status family (four locked statuses; Root was scrapped) and five Volatile statuses with a complete reaction set (including Crimson Resonance and Seizure Flame). Catalysts are a new per-job socket used to inflict Volatiles. This is locked behind the stats work.

**Monster retune** — Planned

New species stat conversion, boss/normal/variant multipliers, monster crit, resistances, skill folding into the contract, and a species-to-Volatile map. The live 50-species roster and kits stay until this ships.

**Job passives (4-passive split)** — Planned

A planned split of job passives, replacing the live defensive-plus-offensive pair.

</details>
