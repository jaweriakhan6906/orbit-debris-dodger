/**
 * Simple in-memory stores. Swappable for a real database later without
 * changing the controllers — same pattern as CarbonLint's store.
 */

const launches = new Map();
const incidents = new Map();

function makeStore(map){
  return {
    save(item){ map.set(item.id, item); return item; },
    findById(id){ return map.get(id) || null; },
    findAll(){ return Array.from(map.values()).sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)); },
    remove(id){ return map.delete(id); },
    count(){ return map.size; },
  };
}

module.exports = {
  launchStore: makeStore(launches),
  incidentStore: makeStore(incidents),
};
