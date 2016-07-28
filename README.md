# PokemonGoNodeDashboard

Pokémon GO Node Dashboard

# IMPORTANT!

This is for educational purposes only.

# Getting Started

## Step One: Install Prerequisites

1. npm
2. nodemon
3. gulp

## Step Two: Install PokemonGoNodeDashboard

1. Download or clone the repository.
2. Using a terminal, navigate into the cloned repository.
3. Install all requirements for the project using `npm install`
4. (optional) Install Xbox 360 Controller drivers <http://tattiebogle.net/index.php/ProjectRoot/Xbox360Controller/OsxDriver> // Not functional

## Step Three: Run PokemonGoNodeDashboard

```bash
gulp // this will start the server and launch the webpage. TODO: delay launch till server is started
```

## directions

- Click outside of the map and use the arrow keys to walk around //TODO: allow movement when map is selected
- Press the s key to scan for nearby pokestops and gyms
- To enable auto hunter press the start hunting button and watch the console for pokemon and worked pokestops.

# To-Do:

- [X] Random Human walking logic / Hatch eggs
- [X] Catch Nearby Pokemon automatically
- [X] Use Normal/Super/Great Pokeballs
- [X] Pokemon automatic transfer whitelist
- [X] Display Avatar on map
- [X] Update Avatar position when walking
- [X] Display Previous Avatar position
- [X] Display pokestops on map
- [X] Display gyms on map
- [X] Display Encountered pokemon on map
- [X] Login Page trainer/google
- [X] Navigate around map, using arrow keys on keyboard. // TODO update using nintendo controller
- [ ] Display visual on map when pokestop worked
- [ ] Double click map to set trainer location.
- [ ] Display lured pokestops
- [ ] Pokemon catch blacklist filter
- [ ] Run to pokestops
- [ ] Display all nearby pokemon on map
- [ ] Drop items when bag is full
- [ ] Scan your inventory for XYZ CP pokemon and release them
- [ ] Incubate eggs
- [ ] Evolve pokemon
- [ ] Use candy
- [ ] Xbox 360 Controller for movement // Still lacking cross browser support

# Bugs:

- No Error handling on login.
- Pressing Start multple times creates multple trainer looops
- Must Select outside of the map so the arrow keys send the movement commands
- Multiple Instances not supported currently as trainer object is reused on the server.
- Attempts to catch pokemon even while pokemon inventory is full.
- Work pokestop returning null when bag is full api.

  ```bash
  2016-07-28T00:39:33-0400 <log> Trainer.js:333 () [TypeError: Cannot read property 'Status' of null]</log>
  2016-07-28T00:39:33-0400 <log> Trainer.js:334 () { [Error: Missing at least one required field for Message .ResponseEnvelop.CatchPokemonResponse: Status] decoded: { Status: null, MissPercent: null } }
    </log>
  ```

- Auto Transfer pokemon in the whitelist is not working, api side. Null pokemon values returned for id and cp. => pokemon: { Id: null, PokemonId: 13, cp: null }

```bash
  2016-07-28T00:46:07-0400 <log> Trainer.js:282 (Trainer.method.catchNearbyPokemon) [+] currentPokemon
  2016-07-28T00:46:07-0400 <log> Trainer.js:283 (Trainer.method.catchNearbyPokemon) { EncounterId: Long { low: -1286925683, high: -1262143857, unsigned: true },
  LastModifiedMs: Long { low: 802352231, high: 342, unsigned: false },
  Latitude: 26.645207332056916,
  Longitude: -81.86789365543228,
  SpawnPointId: '88db41e2c3d',
  pokemon: { Id: null, PokemonId: 13, cp: null },
  TimeTillHiddenMs: 889133 }
  2016-07-28T00:46:08-0400 <log> Trainer.js:287 () Encountering pokemon Weedle...</log></log></log>
```

- Lured pokestop info is null cant display pokestop active lure icon

  ```bash
  ^[[D2016-07-28T00:56:39-0400 <log> Trainer.js:231 () { FortId: '85ce87cdacee4eac8e33945d37891bd4.12',
  LastModifiedMs: Long { low: 27942875, high: 342, unsigned: false },
  Latitude: 26.625674,
  Longitude: -81.872832,
  Team: null,
  GuardPokemonId: null,
  GuardPokemonLevel: null,
  Enabled: true,
  FortType: 1,
  GymPoints: null,
  IsInBattle: null,
  ActiveFortModifier: null,
  LureInfo: null,
  CooldownCompleteMs: null,
  Sponsor: null,
  RenderingType: null }
  2016-07-28T00:56:39-0400 <log> Trainer.js:232 () 85ce87cdacee4eac8e33945d37891bd4.12 used!!
  ```
