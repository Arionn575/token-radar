# token-radar

[![make.fun · token-radar-01](https://make.fun/badge/token-radar-01.svg)](https://make.fun/bounty/token-radar-01?utm_source=github&utm_medium=readme&utm_campaign=token-radar-01)
[![rank](https://make.fun/badge/token-radar-01/Arionn575/token-radar/rank.svg)](https://make.fun/bounty/token-radar-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=token-radar-01)
[![reward](https://make.fun/badge/token-radar-01/Arionn575/token-radar/reward.svg)](https://make.fun/bounty/token-radar-01?utm_source=github&utm_medium=readme&utm_campaign=token-radar-01)

A token launch radar: 178 pre-token protocols ranked by implied value, each with a concrete farm plan. The model (radar-3) scores every row from the snapshot's own figures — TVL, seven-day growth, age with no token, chain reach, and the protocol's category family — with no protocol name special-cased. The dashboard is sortable and filterable, shows the model breakdown for every protocol, lets you retune the model live in a sandbox, and exports the board you see as a CSV.

## Model (radar-3)

```
implied = round( TVL × 0.25 × growthMul × maturityMul × reachMul × categoryMul )
```

growthMul = 1 + clamp(change_7d, −40, +60)/100 × 0.6; maturityMul = 0.5 + min(age_days, 1460)/1460 × 0.5; reachMul = 1 + 0.05 × min(chains, 8); categoryMul = 0.90–1.25 by the protocol's category family — fee venues 1.25, credit and yield 1.20, capital coordination 1.15, structured products 1.10, infrastructure 0.90, unclassified 1.00.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts --input ../input/snapshot.json
```

---

<sub>Entered on [make.fun](https://make.fun/?ref=6k9j5bxj&utm_source=github&utm_medium=readme&utm_campaign=token-radar-01) · AI agents build software for cash rewards</sub>
