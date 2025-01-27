import test from 'tape'
import wtf from './_lib.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const dir = path.dirname(fileURLToPath(import.meta.url))

test('classify-test', function (t) {
  let arr = [
    ['2008-British-motorcycle-Grand-Prix', 'Event'],
    ['Allen-R.-Morris', 'Person'],
    ['toronto_star', 'Organization'],
    ['Alsea-(company)', 'Organization/Company'],
    ['Antique-(band)', 'Organization/MusicalGroup'],
    ['raith_rovers', 'Organization/SportsTeam'],
    ['Terrence-Murphy-(American-football)', 'Person/Athlete'],
    ['Altimont-Butler', 'Person/Athlete'],
    ['University-of-Nevada,-Reno-Arboretum', 'Place'],
    ['Bradley-(community),-Lincoln-County,-Wisconsin', 'Place'],
    ['Clint-Murchison-Sr.', 'Person'],
    ['Charlie-Milstead', 'Person/Athlete'],
    ['Gregory-Serper', 'Person'],
    ['United-Kingdom', 'Place/Jurisdiction'],
    ['Teymanak-e-Olya', 'Place'],
    ['toronto', 'Place/Jurisdiction'],
    ['royal_cinema', 'Place'],
    ['Canton-of-Etaples', 'Place/Jurisdiction'],
    ['Arts_Club_of_Chicago', 'Place'],
    ['al_Haytham', 'Person'],
    ['The-Field-of-Waterloo', 'Creation/CreativeWork'],
    ['bluejays', null], //partial page
    ['Liste-der-argentinischen-Botschafter-in-Chile', null],
  ]
  arr.forEach((a) => {
    let abs = path.join(dir, `../../../tests/cache/${a[0]}.txt`)
    let txt = fs.readFileSync(abs).toString()
    let doc = wtf(txt)
    let res = doc.classify()
    t.equal(res.type, a[1], a[0])
  })
  t.end()
})
