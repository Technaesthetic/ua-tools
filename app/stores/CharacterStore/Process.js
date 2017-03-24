function Process(c) {
  const self = this;

  // Basic Consts
  const Coercion = {
    helplessness: 'connect',
    isolation: 'status',
    self: 'knowledge',
    violence: 'struggle',
    unnatural: 'secrecy'
  }
  const Stress = {
    helplessness: 'status',
    isolation: 'connect',
    self: 'notice',
    violence: 'fitness',
    unnatural: 'knowledge'
  }

  // Calculate Ability Function
  function calculate (dir, name, notches, mods) {
    var val = {}
    if (dir === 'up') {
      val.base = 65 - (notches * 5)
    } else if (dir === 'down') {
      val.base = 15 + (notches * 5)
    }
    return val
  }

  // Calculate Abilities
  c.abilities = {
    fitness: calculate('up', 'fitness', c.gauges.helplessness.hardened),
    dodge: calculate('down', 'dodge', c.gauges.helplessness.hardened),
    status: calculate('up', 'status', c.gauges.isolation.hardened),
    pursuit: calculate('down', 'pursuit', c.gauges.isolation.hardened),
    knowledge: calculate('up', 'knowledge', c.gauges.self.hardened),
    lie: calculate('down', 'lie', c.gauges.self.hardened),
    notice: calculate('up', 'notice', c.gauges.unnatural.hardened),
    secrecy: calculate('down', 'secrecy', c.gauges.unnatural.hardened),
    connect: calculate('up', 'connect', c.gauges.violence.hardened),
    struggle: calculate('down', 'struggle', c.gauges.violence.hardened),
  }

  // Set Up Extra Features
  c.features = []

  // Determine if Sociopathic Function
  function sociopathic () {
    var maxed = 0
    var notches = 0
    for (var g of Object.keys(c.gauges)) {
      if (c.gauges[g].hardened >= 9) {
        maxed += 1
      }
      notches += c.gauges[g].hardened
    }
    if (notches >= 35 || maxed >= 2) {
      return true
    } else {
      return false
    }
  }

  if (sociopathic()) {
    c.features.push({
      type: 'sociopathic',
      percent: 0,
      source: 'default'
    })
  }


  // Handle Identities
  for (var i of c.identities) {
    if (i.substitutes && i.type === 'normal') {
      c.abilities[i.substitutes.toLowerCase()].effective = i.percent
    }
    for (var f of i.features) {
      switch (f.type) {
        case 'Casts Rituals': {
          c.features.push({
            type: 'Casts Rituals',
            percent: i.percent,
            source: i.name
          })
          if (!c.supernatural.find((s) => { return s.type === 'rituals' })) {
            c.supernatural.push({
              type: 'rituals',
              percent: i.percent,
              source: i.name,
              known: []
            })
          } else {
            c.supernatural.find((s) => { return s.type === 'rituals' }).percent = i.percent
          }
          break
        }
        case 'Coerces a Meter': {
          c.abilities[Coercion[f.value]].coerces = i.percent
          if (!c.gauges[f.value].mods) {
            c.gauges[f.value].mods = []
          }
          c.gauges[f.value].mods.push({
            type: 'Coerces',
            source: i.name,
            percent: i.percent
          })
          break
        }
        case 'Evaluates a Meter': {
          c.features.push({
            type: 'Evaluates',
            meter: f.value,
            percent: i.percent,
            source: i.name
          })
          if (!c.gauges[f.value].mods) {
            c.gauges[f.value].mods = []
          }
          c.gauges[f.value].mods.push({
            type: 'Evaluates',
            source: i.name,
            percent: i.percent
          })
          break
        }
        case 'Medical': {
          c.features.push({
            type: 'Medical',
            percent: i.percent,
            source: i.name
          })
          break
        }
        case 'Provides Firearm Attacks': {
          c.features.push({
            type: 'Provides Firearm Attacks',
            percent: i.percent,
            source: i.name
          })
          break
        }
        case 'Provides Wound Threshold': {
          c.wounds.threshold = i.percent
          break
        }
        case 'Provides Initiative': {
          c.features.push({
            type: 'Provides Initiative',
            percent: i.percent,
            source: i.name
          })
          break
        }
        case 'Resist Shocks to Meter': {
          c.abilities[Stress[f.value]].madness = i.percent
          if (!c.gauges[f.value].mods) {
            c.gauges[f.value].mods = []
          }
          c.gauges[f.value].mods.push({
            type: 'Resist',
            source: i.name,
            percent: i.percent
          })
          break
        }
        case 'Therapeutic': {
          c.features.push({
            type: 'Therapeutic',
            percent: i.percent,
            source: i.name
          })
          break
        }
        case 'Unique': {
          c.features.push({
            type: 'Unique',
            desc: f.desc,
            percent: i.percent,
            source: i.name
          })
          break
        }
        case 'Use Gutter Magick': {
          c.features.push({
            type: 'Use Gutter Magick',
            percent: i.percent,
            source: i.name
          })
          if (!c.supernatural.find((s) => { return s.type === 'gutter' })) {
            c.supernatural.push({
              type: 'gutter',
              percent: i.percent,
              source: i.name
            })
          }
          break
        }
      }
    }
  }

  // Return Character
  return c
}

export default Process
