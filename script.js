/* =========================================================
  Sivorytka_Airlance — behaviour (бренд переименован: Skyline -> Sivorytka_Airlance)
   1.  Данные (города, авиакомпании)
   2.  Утилиты
   3.  Движок подбора рейсов
   4.  Менеджер поповеров
   5.  Компонент: выбор города
   6.  Компонент: пассажиры и класс
   7.  Компонент: календарь
   8.  Приложение: форма, выдача, интерфейс
   ========================================================= */

/* ---------- 1. Данные ---------- */

const CITIES = [
  { code: 'MOW', city: 'Москва',              country: 'Россия',           airport: 'Шереметьево',        lat: 55.97,  lon: 37.41,   tz: 3,   alt: 'moskva moscow' },
  { code: 'LED', city: 'Санкт-Петербург',     country: 'Россия',           airport: 'Пулково',            lat: 59.80,  lon: 30.26,   tz: 3,   alt: 'spb piter saint petersburg' },
  { code: 'AER', city: 'Сочи',                country: 'Россия',           airport: 'Адлер',              lat: 43.45,  lon: 39.94,   tz: 3,   alt: 'sochi adler' },
  { code: 'KZN', city: 'Казань',              country: 'Россия',           airport: 'Казань',             lat: 55.61,  lon: 49.28,   tz: 3,   alt: 'kazan' },
  { code: 'SVX', city: 'Екатеринбург',        country: 'Россия',           airport: 'Кольцово',           lat: 56.74,  lon: 60.80,   tz: 5,   alt: 'ekaterinburg' },
  { code: 'OVB', city: 'Новосибирск',         country: 'Россия',           airport: 'Толмачёво',          lat: 55.01,  lon: 82.65,   tz: 7,   alt: 'novosibirsk' },
  { code: 'KJA', city: 'Красноярск',          country: 'Россия',           airport: 'Емельяново',         lat: 56.17,  lon: 92.49,   tz: 7,   alt: 'krasnoyarsk' },
  { code: 'KGD', city: 'Калининград',         country: 'Россия',           airport: 'Храброво',           lat: 54.89,  lon: 20.59,   tz: 2,   alt: 'kaliningrad' },
  { code: 'VVO', city: 'Владивосток',         country: 'Россия',           airport: 'Кневичи',            lat: 43.40,  lon: 132.15,  tz: 10,  alt: 'vladivostok' },
  { code: 'UFA', city: 'Уфа',                 country: 'Россия',           airport: 'Уфа',                lat: 54.56,  lon: 55.87,   tz: 5,   alt: 'ufa' },
  { code: 'KRR', city: 'Краснодар',           country: 'Россия',           airport: 'Пашковский',         lat: 45.03,  lon: 39.17,   tz: 3,   alt: 'krasnodar' },
  { code: 'MRV', city: 'Минеральные Воды',    country: 'Россия',           airport: 'Минводы',            lat: 44.22,  lon: 43.08,   tz: 3,   alt: 'mineralnye vody' },
  { code: 'IKT', city: 'Иркутск',             country: 'Россия',           airport: 'Иркутск',            lat: 52.27,  lon: 104.39,  tz: 8,   alt: 'irkutsk baikal' },
  { code: 'MSQ', city: 'Минск',               country: 'Беларусь',         airport: 'Минск',              lat: 53.88,  lon: 28.03,   tz: 3,   alt: 'minsk' },
  { code: 'EVN', city: 'Ереван',              country: 'Армения',          airport: 'Звартноц',           lat: 40.15,  lon: 44.40,   tz: 4,   alt: 'erevan yerevan' },
  { code: 'TBS', city: 'Тбилиси',             country: 'Грузия',           airport: 'Тбилиси',            lat: 41.67,  lon: 44.95,   tz: 4,   alt: 'tbilisi' },
  { code: 'GYD', city: 'Баку',                country: 'Азербайджан',      airport: 'Гейдар Алиев',       lat: 40.47,  lon: 50.05,   tz: 4,   alt: 'baku' },
  { code: 'ALA', city: 'Алматы',              country: 'Казахстан',        airport: 'Алматы',             lat: 43.35,  lon: 77.04,   tz: 6,   alt: 'almaty' },
  { code: 'NQZ', city: 'Астана',              country: 'Казахстан',        airport: 'Нурсултан Назарбаев',lat: 51.02,  lon: 71.47,   tz: 6,   alt: 'astana nur sultan' },
  { code: 'TAS', city: 'Ташкент',             country: 'Узбекистан',       airport: 'Ташкент',            lat: 41.26,  lon: 69.28,   tz: 5,   alt: 'tashkent' },
  { code: 'FRU', city: 'Бишкек',              country: 'Киргизия',         airport: 'Манас',              lat: 43.06,  lon: 74.48,   tz: 6,   alt: 'bishkek' },
  { code: 'IST', city: 'Стамбул',             country: 'Турция',           airport: 'Стамбул',            lat: 41.26,  lon: 28.74,   tz: 3,   alt: 'istanbul' },
  { code: 'AYT', city: 'Анталья',             country: 'Турция',           airport: 'Анталья',            lat: 36.90,  lon: 30.79,   tz: 3,   alt: 'antalya' },
  { code: 'DXB', city: 'Дубай',               country: 'ОАЭ',              airport: 'Дубай',              lat: 25.25,  lon: 55.36,   tz: 4,   alt: 'dubai' },
  { code: 'AUH', city: 'Абу-Даби',            country: 'ОАЭ',              airport: 'Зайд',               lat: 24.43,  lon: 54.65,   tz: 4,   alt: 'abu dhabi' },
  { code: 'DOH', city: 'Доха',                country: 'Катар',            airport: 'Хамад',              lat: 25.27,  lon: 51.61,   tz: 3,   alt: 'doha' },
  { code: 'CAI', city: 'Каир',                country: 'Египет',           airport: 'Каир',               lat: 30.11,  lon: 31.41,   tz: 2,   alt: 'cairo' },
  { code: 'HRG', city: 'Хургада',             country: 'Египет',           airport: 'Хургада',            lat: 27.18,  lon: 33.80,   tz: 2,   alt: 'hurghada' },
  { code: 'SSH', city: 'Шарм-эль-Шейх',       country: 'Египет',           airport: 'Шарм-эль-Шейх',      lat: 27.98,  lon: 34.39,   tz: 2,   alt: 'sharm el sheikh' },
  { code: 'TLV', city: 'Тель-Авив',           country: 'Израиль',          airport: 'Бен-Гурион',         lat: 32.01,  lon: 34.89,   tz: 3,   alt: 'tel aviv' },
  { code: 'BEG', city: 'Белград',             country: 'Сербия',           airport: 'Никола Тесла',       lat: 44.82,  lon: 20.29,   tz: 2,   alt: 'belgrade beograd' },
  { code: 'BUD', city: 'Будапешт',            country: 'Венгрия',          airport: 'Ференц Лист',        lat: 47.44,  lon: 19.26,   tz: 2,   alt: 'budapest' },
  { code: 'PRG', city: 'Прага',               country: 'Чехия',            airport: 'Вацлав Гавел',       lat: 50.10,  lon: 14.26,   tz: 2,   alt: 'prague praha' },
  { code: 'VIE', city: 'Вена',                country: 'Австрия',          airport: 'Швехат',             lat: 48.11,  lon: 16.57,   tz: 2,   alt: 'vienna wien' },
  { code: 'CDG', city: 'Париж',               country: 'Франция',          airport: 'Шарль-де-Голль',     lat: 49.01,  lon: 2.55,    tz: 2,   alt: 'paris' },
  { code: 'LHR', city: 'Лондон',              country: 'Великобритания',   airport: 'Хитроу',             lat: 51.47,  lon: -0.45,   tz: 1,   alt: 'london' },
  { code: 'BER', city: 'Берлин',              country: 'Германия',         airport: 'Бранденбург',        lat: 52.36,  lon: 13.50,   tz: 2,   alt: 'berlin' },
  { code: 'MUC', city: 'Мюнхен',              country: 'Германия',         airport: 'Мюнхен',             lat: 48.35,  lon: 11.79,   tz: 2,   alt: 'munich munchen' },
  { code: 'FCO', city: 'Рим',                 country: 'Италия',           airport: 'Фьюмичино',          lat: 41.80,  lon: 12.25,   tz: 2,   alt: 'rome roma' },
  { code: 'MXP', city: 'Милан',               country: 'Италия',           airport: 'Мальпенса',          lat: 45.63,  lon: 8.72,    tz: 2,   alt: 'milan milano' },
  { code: 'BCN', city: 'Барселона',           country: 'Испания',          airport: 'Эль-Прат',           lat: 41.30,  lon: 2.08,    tz: 2,   alt: 'barcelona' },
  { code: 'MAD', city: 'Мадрид',              country: 'Испания',          airport: 'Барахас',            lat: 40.47,  lon: -3.56,   tz: 2,   alt: 'madrid' },
  { code: 'LIS', city: 'Лиссабон',            country: 'Португалия',       airport: 'Умберту Делгаду',    lat: 38.77,  lon: -9.13,   tz: 1,   alt: 'lisbon lisboa' },
  { code: 'ATH', city: 'Афины',               country: 'Греция',           airport: 'Элефтериос Венизелос', lat: 37.94, lon: 23.95, tz: 3,   alt: 'athens' },
  { code: 'AMS', city: 'Амстердам',           country: 'Нидерланды',       airport: 'Схипхол',            lat: 52.31,  lon: 4.76,    tz: 2,   alt: 'amsterdam' },
  { code: 'HEL', city: 'Хельсинки',           country: 'Финляндия',        airport: 'Вантаа',             lat: 60.32,  lon: 24.96,   tz: 3,   alt: 'helsinki' },
  { code: 'JFK', city: 'Нью-Йорк',            country: 'США',              airport: 'Джон Кеннеди',       lat: 40.64,  lon: -73.78,  tz: -4,  alt: 'new york' },
  { code: 'LAX', city: 'Лос-Анджелес',        country: 'США',              airport: 'Лос-Анджелес',       lat: 33.94,  lon: -118.41, tz: -7,  alt: 'los angeles' },
  { code: 'HND', city: 'Токио',               country: 'Япония',           airport: 'Ханэда',             lat: 35.55,  lon: 139.78,  tz: 9,   alt: 'tokyo' },
  { code: 'ICN', city: 'Сеул',                country: 'Южная Корея',      airport: 'Инчхон',             lat: 37.46,  lon: 126.44,  tz: 9,   alt: 'seoul' },
  { code: 'PEK', city: 'Пекин',               country: 'Китай',            airport: 'Столичный',          lat: 40.08,  lon: 116.58,  tz: 8,   alt: 'beijing peking' },
  { code: 'PVG', city: 'Шанхай',              country: 'Китай',            airport: 'Пудун',              lat: 31.14,  lon: 121.80,  tz: 8,   alt: 'shanghai' },
  { code: 'BKK', city: 'Бангкок',             country: 'Таиланд',          airport: 'Суварнабхуми',       lat: 13.69,  lon: 100.75,  tz: 7,   alt: 'bangkok' },
  { code: 'HKT', city: 'Пхукет',              country: 'Таиланд',          airport: 'Пхукет',             lat: 8.11,   lon: 98.31,   tz: 7,   alt: 'phuket' },
  { code: 'DPS', city: 'Денпасар',            country: 'Индонезия',        airport: 'Бали',               lat: -8.75,  lon: 115.17,  tz: 8,   alt: 'bali denpasar' },
  { code: 'MLE', city: 'Мале',                country: 'Мальдивы',         airport: 'Велана',             lat: 4.19,   lon: 73.53,   tz: 5,   alt: 'male maldives' },
  { code: 'DEL', city: 'Дели',                country: 'Индия',            airport: 'Индиры Ганди',       lat: 28.56,  lon: 77.10,   tz: 5.5, alt: 'delhi' },
  { code: 'GOI', city: 'Гоа',                 country: 'Индия',            airport: 'Даболим',            lat: 15.38,  lon: 73.83,   tz: 5.5, alt: 'goa' },
  { code: 'SIN', city: 'Сингапур',            country: 'Сингапур',         airport: 'Чанги',              lat: 1.36,   lon: 103.99,  tz: 8,   alt: 'singapore' }
];

const POPULAR = ['IST', 'DXB', 'AYT', 'LIS', 'TBS', 'EVN', 'BKK', 'LED'];

/* range — максимальная дальность рейса, km; lowcost — нет премиальных классов */
const AIRLINES = [
  { code: 'SU', name: 'Аэрофлот',            hub: 'MOW', factor: 1.00, range: 14000, speed: 840 },
  { code: 'DP', name: 'Победа',              hub: 'MOW', factor: 0.70, range: 4800,  speed: 810, lowcost: true },
  { code: 'S7', name: 'S7 Airlines',         hub: 'OVB', factor: 0.88, range: 7000,  speed: 830 },
  { code: 'U6', name: 'Уральские авиалинии', hub: 'SVX', factor: 0.82, range: 6500,  speed: 820 },
  { code: 'FV', name: 'Россия',              hub: 'LED', factor: 0.90, range: 9000,  speed: 835 },
  { code: 'N4', name: 'Nordwind',            hub: 'MOW', factor: 0.80, range: 9500,  speed: 825 },
  { code: 'TK', name: 'Turkish Airlines',    hub: 'IST', factor: 1.06, range: 14000, speed: 855 },
  { code: 'PC', name: 'Pegasus',             hub: 'IST', factor: 0.74, range: 4800,  speed: 805, lowcost: true },
  { code: 'EK', name: 'Emirates',            hub: 'DXB', factor: 1.24, range: 15000, speed: 870 },
  { code: 'FZ', name: 'flydubai',            hub: 'DXB', factor: 0.94, range: 5500,  speed: 815 },
  { code: 'QR', name: 'Qatar Airways',       hub: 'DOH', factor: 1.18, range: 15000, speed: 865 },
  { code: 'EY', name: 'Etihad Airways',      hub: 'AUH', factor: 1.12, range: 14000, speed: 860 },
  { code: 'JU', name: 'Air Serbia',          hub: 'BEG', factor: 0.95, range: 8000,  speed: 830 },
  { code: 'B2', name: 'Белавиа',             hub: 'MSQ', factor: 0.90, range: 5000,  speed: 815 },
  { code: 'J2', name: 'AZAL',                hub: 'GYD', factor: 0.95, range: 6000,  speed: 825 },
  { code: 'HY', name: 'Uzbekistan Airways',  hub: 'TAS', factor: 0.92, range: 7500,  speed: 830 },
  { code: 'KC', name: 'Air Astana',          hub: 'NQZ', factor: 1.00, range: 8500,  speed: 840 },
  { code: 'A9', name: 'Georgian Airways',    hub: 'TBS', factor: 0.96, range: 5000,  speed: 810 },
  { code: 'MS', name: 'EgyptAir',            hub: 'CAI', factor: 1.00, range: 9000,  speed: 835 },
  { code: 'CZ', name: 'China Southern',      hub: 'PEK', factor: 1.02, range: 13000, speed: 850 },
  { code: 'HU', name: 'Hainan Airlines',     hub: 'PEK', factor: 1.00, range: 13000, speed: 845 },
  { code: 'AI', name: 'Air India',           hub: 'DEL', factor: 0.98, range: 11000, speed: 840 }
];

const FLEET_SHORT = ['Airbus A320neo', 'Airbus A321', 'Boeing 737-800', 'Sukhoi Superjet 100', 'Embraer E190'];
const FLEET_LONG  = ['Boeing 777-300ER', 'Airbus A330-300', 'Airbus A350-900', 'Boeing 787-9'];

const CABINS = {
  economy:  { label: 'Эконом',  factor: 1.00 },
  comfort:  { label: 'Комфорт', factor: 1.55 },
  business: { label: 'Бизнес',  factor: 2.90 }
};

const MONTHS = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
const MONTHS_NOM = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
const CONTACT_EMAIL = 'fesces12@gmail.com';

/* ---------- 2. Утилиты ---------- */

const byCode = (code) => CITIES.find((c) => c.code === code);
const norm = (s) => s.toLowerCase().replace(/ё/g, 'е');
const esc = (s) => String(s).replace(/[&<>"]/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]));
const pad = (n) => String(n).padStart(2, '0');

function plural(n, one, few, many) {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return one;
  if (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) return few;
  return many;
}

function hashString(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed) {
  let a = seed >>> 0;
  return function random() {
    a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function distanceKm(a, b) {
  const R = 6371;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return Math.round(2 * R * Math.asin(Math.sqrt(s)));
}

const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
const sameDay = (a, b) => !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
const dayDiff = (a, b) => Math.round((startOfDay(b) - startOfDay(a)) / 86400000);
const dateKey = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const formatDayMonth = (d) => `${d.getDate()} ${MONTHS[d.getMonth()]}`;

function formatDuration(min) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (!h) return `${m} мин`;
  return m ? `${h} ч ${m} мин` : `${h} ч`;
}

function formatMoney(value) {
  return `${Math.round(value).toLocaleString('ru-RU')} ₽`;
}

const formatTime = (mins) => `${pad(Math.floor(mins / 60))}:${pad(mins % 60)}`;

/* ---------- 3. Движок подбора рейсов ---------- */

const FlightEngine = {
  search(query) {
    const { from, to, depart, trip, cabin } = query;
    const straight = distanceKm(from, to);
    const rng = mulberry32(hashString(`${from.code}${to.code}${dateKey(depart)}${cabin}${trip}`));
    const premium = cabin !== 'economy';

    const scored = AIRLINES
      .filter((airline) => !(premium && airline.lowcost))
      .map((airline) => {
        const hub = byCode(airline.hub);
        const detourKm = distanceKm(from, hub) + distanceKm(hub, to);
        const detour = detourKm / Math.max(straight, 1);
        const maxLeg = Math.max(distanceKm(from, hub), distanceKm(hub, to));
        let score = 0;

        if (airline.hub === from.code || airline.hub === to.code) score = 100;
        else if (hub.country === from.country || hub.country === to.country) score = 70;
        else if (detour < 1.5) score = 50 - detour * 10;

        return { airline, hub, score, detour, maxLeg };
      })
      .filter((item) => item.score > 0);

    scored.sort((a, b) => b.score - a.score || a.airline.code.localeCompare(b.airline.code));

    // прямой рейс возможен, если маршрут в пределах дальности флота
    const directPool = scored
      .filter((item) => item.score >= 70 && item.airline.range >= straight)
      .slice(0, 3);

    // пересадка имеет смысл, только если крюк невелик и оба плеча по силам флоту
    const connectPool = scored
      .filter((item) => !directPool.includes(item))
      .filter((item) => item.hub.code !== from.code && item.hub.code !== to.code)
      .filter((item) => item.airline.range >= item.maxLeg)
      .filter((item) => item.detour < 1.5)
      .sort((a, b) => a.detour - b.detour)
      .slice(0, straight > 2500 ? 3 : 2);

    if (!directPool.length) {
      const fallback = scored.find((item) => item.airline.range >= straight);
      if (fallback) directPool.push(fallback);
    }

    const usedTimes = new Set();
    const offers = [];

    directPool.forEach((item) => {
      offers.push(this.buildOffer(query, item.airline, null, rng, usedTimes));
    });

    connectPool.forEach((item) => {
      offers.push(this.buildOffer(query, item.airline, item.hub, rng, usedTimes));
    });

    if (!offers.length) return [];

    // бейдж достаётся ровно одному рейсу
    const cheapest = offers.reduce((best, item) => (item.total < best.total ? item : best));
    cheapest.badge = 'Лучшая цена';

    const fastest = offers.reduce((best, item) => (item.totalMinutes < best.totalMinutes ? item : best));
    if (fastest !== cheapest) fastest.badge = 'Быстрее всех';

    return offers;
  },

  buildOffer(query, airline, hub, rng, usedTimes) {
    const { from, to, depart, back, trip, pax, cabin } = query;
    const legs = [this.buildLeg(from, to, depart, airline, hub, rng, cabin, usedTimes)];
    if (trip === 'round' && back) {
      legs.push(this.buildLeg(to, from, back, airline, hub, rng, cabin, usedTimes));
    }

    const km = legs.reduce((sum, leg) => sum + leg.km, 0);
    const stopsDiscount = hub ? 0.86 : 1;
    let perAdult = (2100 + km * 3.05) * airline.factor * CABINS[cabin].factor * stopsDiscount;
    perAdult *= 0.9 + rng() * 0.22;
    perAdult = Math.round(perAdult / 100) * 100;

    const total = Math.round(
      (perAdult * pax.adults + perAdult * 0.75 * pax.children + perAdult * 0.1 * pax.infants) / 100
    ) * 100;

    return {
      id: `${airline.code}-${legs[0].flightNo.replace(/\s/g, '')}`,
      airline,
      hub,
      legs,
      perAdult,
      total,
      totalMinutes: legs.reduce((sum, leg) => sum + leg.minutes, 0),
      departureMinutes: legs[0].depMinutes,
      cabin,
      badge: null,
      baggage: airline.lowcost && cabin === 'economy'
        ? 'Ручная кладь 10 кг · багаж за доплату'
        : 'Багаж 23 кг включён',
      refundable: cabin !== 'economy' || !airline.lowcost
    };
  },

  buildLeg(origin, destination, date, airline, hub, rng, cabin, usedTimes) {
    const direct = !hub;
    const km = direct
      ? distanceKm(origin, destination)
      : distanceKm(origin, hub) + distanceKm(hub, destination);

    const air = (d) => Math.round((d / airline.speed) * 60) + 35;
    const layover = direct ? 0 : 55 + Math.round((rng() * 130) / 5) * 5;
    const minutes = direct
      ? air(km)
      : air(distanceKm(origin, hub)) + layover + air(distanceKm(hub, destination));

    // время вылета — уникальное в пределах одной выдачи
    const hours = [6, 7, 9, 10, 12, 14, 16, 18, 20, 22];
    let depMinutes = 0;
    for (let attempt = 0; attempt < 12; attempt += 1) {
      depMinutes = hours[Math.floor(rng() * hours.length)] * 60 + Math.floor(rng() * 12) * 5;
      if (!usedTimes.has(depMinutes)) break;
    }
    usedTimes.add(depMinutes);

    const arriveRaw = depMinutes + minutes + (destination.tz - origin.tz) * 60;
    const dayOffset = Math.floor(arriveRaw / 1440);
    const arrMinutes = Math.round(((arriveRaw % 1440) + 1440) % 1440);

    const fleet = km > 4500 ? FLEET_LONG : FLEET_SHORT;
    const business = cabin === 'business';
    const row = business ? 1 + Math.floor(rng() * 6) : 8 + Math.floor(rng() * 24);
    const letters = business ? ['A', 'C', 'D', 'F'] : ['A', 'B', 'C', 'D', 'E', 'F'];
    const letter = letters[Math.floor(rng() * letters.length)];
    const seatKind = 'AF'.includes(letter) ? 'у окна' : 'CD'.includes(letter) ? 'у прохода' : 'в середине';

    return {
      origin,
      destination,
      date,
      km,
      minutes,
      layover,
      hub: hub || null,
      depMinutes,
      arrMinutes,
      dayOffset,
      arrivalDate: addDays(date, dayOffset),
      aircraft: fleet[Math.floor(rng() * fleet.length)],
      flightNo: `${airline.code} ${100 + Math.floor(rng() * 8800)}`,
      seat: `${row}${letter}`,
      seatKind
    };
  }
};

/* ---------- 4. Менеджер поповеров ---------- */

const PopoverManager = {
  registry: [],

  register(instance) {
    this.registry.push(instance);
  },

  closeAll(except) {
    this.registry.forEach((item) => {
      if (item !== except) item.close();
    });
  },

  init() {
    document.addEventListener('click', (event) => {
      const insideField = event.target.closest('[data-field]');
      this.registry.forEach((item) => {
        if (item.root !== insideField) item.close();
      });
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') this.closeAll();
    });
  }
};

/* ---------- 5. Компонент: выбор города ---------- */

class CityPicker {
  constructor(root, { onChange, getExcluded }) {
    this.root = root;
    this.input = root.querySelector('.city-input');
    this.list = root.querySelector('.suggest');
    this.codeBadge = root.querySelector('.field-code');
    this.hint = root.querySelector('.field-hint');
    this.defaultHint = this.hint.textContent;
    this.onChange = onChange;
    this.getExcluded = getExcluded || (() => null);
    this.city = null;
    this.activeIndex = -1;
    this.items = [];

    this.bind();
    PopoverManager.register(this);
  }

  bind() {
    this.input.addEventListener('focus', () => this.open());
    this.input.addEventListener('input', () => {
      this.root.classList.remove('has-error');
      this.open();
    });

    this.input.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        if (this.list.hidden) this.open();
        this.move(event.key === 'ArrowDown' ? 1 : -1);
      } else if (event.key === 'Enter') {
        if (!this.list.hidden && this.items[this.activeIndex]) {
          event.preventDefault();
          this.select(this.items[this.activeIndex]);
        }
      } else if (event.key === 'Escape') {
        this.close();
      } else if (event.key === 'Tab') {
        this.close();
      }
    });

    this.input.addEventListener('blur', () => {
      // даём клику по подсказке отработать раньше
      window.setTimeout(() => this.restore(), 120);
    });

    this.list.addEventListener('mousedown', (event) => {
      const button = event.target.closest('.suggest-item');
      if (!button) return;
      event.preventDefault();
      this.select(this.items[Number(button.dataset.index)]);
    });
  }

  open() {
    PopoverManager.closeAll(this);
    this.render(this.input.value);
    this.list.hidden = false;
    this.input.setAttribute('aria-expanded', 'true');
    this.root.classList.add('is-open');
  }

  close() {
    if (this.list.hidden) return;
    this.list.hidden = true;
    this.input.setAttribute('aria-expanded', 'false');
    this.root.classList.remove('is-open');
    this.activeIndex = -1;
  }

  restore() {
    this.close();
    if (this.city) this.input.value = this.city.city;
    else this.clear();
  }

  clear() {
    this.city = null;
    this.input.value = '';
    this.codeBadge.textContent = '';
    this.hint.textContent = this.defaultHint;
  }

  render(query) {
    const q = query.trim();
    const excluded = this.getExcluded();
    this.items = this.match(q).filter((city) => city.code !== excluded).slice(0, 8);
    // подсвечиваем первый пункт только при вводе — иначе Enter отправляет форму
    this.activeIndex = q && this.items.length ? 0 : -1;

    if (!this.items.length) {
      this.list.innerHTML = '<p class="suggest-empty">Ничего не нашли. Попробуйте другой город или код аэропорта.</p>';
      return;
    }

    const heading = q ? 'Найдено' : 'Популярные направления';
    this.list.innerHTML =
      `<p class="suggest-group">${heading}</p>` +
      this.items.map((city, index) => `
        <button class="suggest-item${index === this.activeIndex ? ' is-active' : ''}" type="button"
                role="option" aria-selected="${index === this.activeIndex}" data-index="${index}">
          <span class="suggest-code">${esc(city.code)}</span>
          <span class="suggest-text">
            <span class="suggest-city">${this.highlight(city.city, q)}</span>
            <span class="suggest-sub">${esc(city.country)} · ${esc(city.airport)}</span>
          </span>
        </button>
      `).join('');
  }

  highlight(text, query) {
    if (!query) return esc(text);
    const index = norm(text).indexOf(norm(query));
    if (index < 0) return esc(text);
    return (
      esc(text.slice(0, index)) +
      `<mark>${esc(text.slice(index, index + query.length))}</mark>` +
      esc(text.slice(index + query.length))
    );
  }

  match(query) {
    if (!query) return POPULAR.map(byCode);
    const q = norm(query);

    return CITIES
      .map((city) => {
        const name = norm(city.city);
        const code = city.code.toLowerCase();
        let rank = -1;
        if (name.startsWith(q)) rank = 0;
        else if (code.startsWith(q)) rank = 1;
        else if (name.includes(q)) rank = 2;
        else if (city.alt.includes(q)) rank = 3;
        else if (norm(city.country).startsWith(q)) rank = 4;
        else if (norm(city.airport).includes(q)) rank = 5;
        return { city, rank };
      })
      .filter((item) => item.rank >= 0)
      .sort((a, b) => a.rank - b.rank || a.city.city.localeCompare(b.city.city))
      .map((item) => item.city);
  }

  move(step) {
    if (!this.items.length) return;
    this.activeIndex = (this.activeIndex + step + this.items.length) % this.items.length;
    this.list.querySelectorAll('.suggest-item').forEach((node, index) => {
      const active = index === this.activeIndex;
      node.classList.toggle('is-active', active);
      node.setAttribute('aria-selected', String(active));
      if (active) node.scrollIntoView({ block: 'nearest' });
    });
  }

  select(city) {
    if (!city) return;
    this.setCity(city);
    this.close();
    this.onChange?.(city);
  }

  setCity(city) {
    this.city = city;
    this.input.value = city.city;
    this.codeBadge.textContent = city.code;
    this.hint.textContent = `${city.country} · ${city.airport}`;
    this.root.classList.remove('has-error');
  }
}

/* ---------- 6. Компонент: пассажиры и класс ---------- */

class PassengerPicker {
  constructor(root, { onChange }) {
    this.root = root;
    this.trigger = root.querySelector('.field-trigger');
    this.panel = root.querySelector('.pax-panel');
    this.value = root.querySelector('.field-value');
    this.hint = root.querySelector('.field-hint');
    this.onChange = onChange;

    this.state = { adults: 1, children: 0, infants: 0, cabin: 'economy' };

    this.bind();
    this.update();
    PopoverManager.register(this);
  }

  bind() {
    this.trigger.addEventListener('click', () => this.toggle());

    this.panel.querySelectorAll('.step').forEach((button) => {
      button.addEventListener('click', () => {
        const key = button.dataset.step;
        const dir = Number(button.dataset.dir);
        this.change(key, dir);
      });
    });

    this.panel.querySelectorAll('.cabin-option').forEach((button) => {
      button.addEventListener('click', () => {
        this.state.cabin = button.dataset.cabin;
        this.panel.querySelectorAll('.cabin-option').forEach((item) => {
          const selected = item === button;
          item.classList.toggle('selected', selected);
          item.setAttribute('aria-pressed', String(selected));
        });
        this.update();
      });
    });

    this.panel.querySelector('[data-close-popover]').addEventListener('click', () => {
      this.close();
      this.trigger.focus();
    });
  }

  get total() {
    return this.state.adults + this.state.children + this.state.infants;
  }

  change(key, dir) {
    const next = this.state[key] + dir;
    if (key === 'adults' && (next < 1 || next > 9)) return;
    if (key !== 'adults' && next < 0) return;
    if (key === 'infants' && next > this.state.adults) return;
    if (dir > 0 && this.total >= 9) return;

    this.state[key] = next;
    if (this.state.infants > this.state.adults) this.state.infants = this.state.adults;
    this.update();
  }

  update() {
    Object.keys(this.state).forEach((key) => {
      const output = this.panel.querySelector(`[data-count="${key}"]`);
      if (output) output.textContent = this.state[key];
    });

    this.panel.querySelectorAll('.step').forEach((button) => {
      const key = button.dataset.step;
      const dir = Number(button.dataset.dir);
      let disabled = false;
      if (dir < 0) disabled = key === 'adults' ? this.state.adults <= 1 : this.state[key] <= 0;
      else if (this.total >= 9) disabled = true;
      else if (key === 'infants') disabled = this.state.infants >= this.state.adults;
      button.disabled = disabled;
    });

    const { adults, children, infants } = this.state;
    this.value.textContent = (children || infants)
      ? `${this.total} ${plural(this.total, 'пассажир', 'пассажира', 'пассажиров')}`
      : `${adults} ${plural(adults, 'взрослый', 'взрослых', 'взрослых')}`;

    const parts = [`${adults} ${plural(adults, 'взрослый', 'взрослых', 'взрослых')}`];
    if (children) parts.push(`${children} ${plural(children, 'ребёнок', 'ребёнка', 'детей')}`);
    if (infants) parts.push(`${infants} ${plural(infants, 'младенец', 'младенца', 'младенцев')}`);
    this.hint.textContent = `${CABINS[this.state.cabin].label} · ${parts.join(', ')}`;

    this.onChange?.(this.state);
  }

  toggle() {
    if (this.panel.hidden) this.open();
    else this.close();
  }

  open() {
    PopoverManager.closeAll(this);
    this.panel.hidden = false;
    this.trigger.setAttribute('aria-expanded', 'true');
    this.root.classList.add('is-open');
  }

  close() {
    if (this.panel.hidden) return;
    this.panel.hidden = true;
    this.trigger.setAttribute('aria-expanded', 'false');
    this.root.classList.remove('is-open');
  }
}

/* ---------- 7. Компонент: календарь ---------- */

class DateRangePicker {
  constructor(root, { onChange }) {
    this.root = root;
    this.trigger = root.querySelector('.field-trigger');
    this.panel = root.querySelector('.calendar');
    this.value = root.querySelector('.field-value');
    this.hint = root.querySelector('.field-hint');
    this.grid = root.querySelector('.cal-grid');
    this.title = root.querySelector('.cal-title');
    this.calHint = root.querySelector('.cal-hint');
    this.onChange = onChange;

    this.today = startOfDay(new Date());
    this.depart = addDays(this.today, 14);
    this.back = addDays(this.depart, 7);
    this.trip = 'round';
    this.view = { year: this.depart.getFullYear(), month: this.depart.getMonth() };

    this.bind();
    this.renderMonth();
    this.updateField();
    PopoverManager.register(this);
  }

  bind() {
    this.trigger.addEventListener('click', () => this.toggle());

    this.panel.querySelectorAll('[data-cal-nav]').forEach((button) => {
      button.addEventListener('click', () => this.shiftMonth(Number(button.dataset.calNav)));
    });

    this.grid.addEventListener('click', (event) => {
      const button = event.target.closest('.cal-day');
      if (!button || button.disabled) return;
      this.pick(new Date(Number(button.dataset.time)));
    });

    this.panel.querySelector('[data-close-popover]').addEventListener('click', () => {
      this.close();
      this.trigger.focus();
    });
  }

  setTrip(trip) {
    this.trip = trip;
    if (trip === 'oneway') this.back = null;
    else if (!this.back) this.back = addDays(this.depart, 7);
    this.renderMonth();
    this.updateField();
  }

  pick(date) {
    if (this.trip === 'oneway') {
      this.depart = date;
      this.back = null;
      this.finish(true);
      return;
    }

    if (!this.depart || this.back || date < this.depart) {
      this.depart = date;
      this.back = null;
    } else if (sameDay(date, this.depart)) {
      this.back = addDays(date, 1);
    } else {
      this.back = date;
    }

    this.finish(Boolean(this.back));
  }

  finish(shouldClose) {
    this.renderMonth();
    this.updateField();
    this.root.classList.remove('has-error');
    if (shouldClose) {
      window.setTimeout(() => this.close(), 180);
    }
  }

  shiftMonth(step) {
    const next = new Date(this.view.year, this.view.month + step, 1);
    this.view = { year: next.getFullYear(), month: next.getMonth() };
    this.renderMonth();
  }

  renderMonth() {
    const { year, month } = this.view;
    const first = new Date(year, month, 1);
    const offset = (first.getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    this.title.textContent = `${MONTHS_NOM[month]} ${year}`;

    const prevButton = this.panel.querySelector('[data-cal-nav="-1"]');
    prevButton.disabled = year === this.today.getFullYear() && month === this.today.getMonth();

    let html = '';
    for (let i = 0; i < offset; i += 1) html += '<span class="cal-empty"></span>';

    for (let day = 1; day <= daysInMonth; day += 1) {
      const date = new Date(year, month, day);
      const disabled = date < this.today;
      const isStart = sameDay(date, this.depart);
      const isEnd = sameDay(date, this.back);
      const inRange = this.depart && this.back && date > this.depart && date < this.back;

      const classes = ['cal-day'];
      if (sameDay(date, this.today)) classes.push('is-today');
      if (inRange) classes.push('in-range');
      if (isStart) classes.push('is-start');
      if (isEnd) classes.push('is-end');

      html += `<button class="${classes.join(' ')}" type="button" role="gridcell"
                 data-time="${date.getTime()}" ${disabled ? 'disabled' : ''}
                 aria-label="${day} ${MONTHS[month]} ${year}">${day}</button>`;
    }

    this.grid.innerHTML = html;

    this.calHint.textContent = this.trip === 'oneway'
      ? 'Выберите дату вылета'
      : this.back ? 'Даты выбраны' : 'Теперь выберите дату возвращения';
  }

  updateField() {
    if (!this.depart) {
      this.value.textContent = 'Выберите даты';
      this.hint.textContent = 'Гибкие даты';
      return;
    }

    if (this.trip === 'oneway' || !this.back) {
      this.value.textContent = formatDayMonth(this.depart);
      this.hint.textContent = this.trip === 'oneway' ? 'В одну сторону' : 'Добавьте обратный рейс';
    } else {
      this.value.textContent = `${formatDayMonth(this.depart)} — ${formatDayMonth(this.back)}`;
      const nights = dayDiff(this.depart, this.back);
      this.hint.textContent = `${nights} ${plural(nights, 'ночь', 'ночи', 'ночей')}`;
    }

    this.onChange?.({ depart: this.depart, back: this.back });
  }

  toggle() {
    if (this.panel.hidden) this.open();
    else this.close();
  }

  open() {
    PopoverManager.closeAll(this);
    if (this.depart) this.view = { year: this.depart.getFullYear(), month: this.depart.getMonth() };
    this.renderMonth();
    this.panel.hidden = false;
    this.trigger.setAttribute('aria-expanded', 'true');
    this.root.classList.add('is-open');
  }

  close() {
    if (this.panel.hidden) return;
    this.panel.hidden = true;
    this.trigger.setAttribute('aria-expanded', 'false');
    this.root.classList.remove('is-open');
  }
}

/* ---------- 8. Приложение ---------- */

class Sivorytka_AirlanceApp { // переименован из SkylineApp
  constructor() {
    this.header = document.querySelector('#site-header');
    this.menuToggle = document.querySelector('.menu-toggle');
    this.mainNav = document.querySelector('#main-nav');
    this.form = document.querySelector('#flight-form');
    this.formStatus = document.querySelector('#form-status');
    this.submitButton = this.form?.querySelector('.search-button');
    this.tripOptions = Array.from(document.querySelectorAll('.trip-option'));
    this.swapButton = document.querySelector('.swap');
    this.resultsSection = document.querySelector('#results');
    this.resultsList = document.querySelector('#results-list');
    this.resultsTitle = document.querySelector('.results-title');
    this.resultsMeta = document.querySelector('.results-meta');
    this.sortChips = Array.from(document.querySelectorAll('.sort-chip'));

    this.trip = 'round';
    this.sort = 'price';
    this.offers = [];
    this.lastQuery = null;

    PopoverManager.init();
    this.setupPickers();
    this.setupHeader();
    this.setupMenu();
    this.setupTripSwitch();
    this.setupSwap();
    this.setupForm();
    this.setupSort();
    this.setupDestinations();
    this.setupNavHighlight();
    this.setupReveal();
  }

  /* --- поля формы --- */

  setupPickers() {
    this.fromPicker = new CityPicker(document.querySelector('[data-field="from"]'), {
      getExcluded: () => this.toPicker?.city?.code,
      onChange: () => {
        if (!this.toPicker.city) this.toPicker.input.focus();
      }
    });

    this.toPicker = new CityPicker(document.querySelector('[data-field="to"]'), {
      getExcluded: () => this.fromPicker?.city?.code
    });

    this.datePicker = new DateRangePicker(document.querySelector('[data-field="date"]'), {});
    this.paxPicker = new PassengerPicker(document.querySelector('[data-field="pax"]'), {});

    this.fromPicker.setCity(byCode('MOW'));

    // клик по пустому месту поля открывает нужный поповер
    [['date', 'datePicker'], ['pax', 'paxPicker']].forEach(([name, key]) => {
      const field = document.querySelector(`[data-field="${name}"]`);
      field.addEventListener('click', (event) => {
        if (event.target.closest('.popover') || event.target.closest('.field-trigger')) return;
        this[key].open();
      });
    });
  }

  /* --- шапка --- */

  setupHeader() {
    if (!this.header) return;
    let ticking = false;

    const update = () => {
      this.header.classList.toggle('is-scrolled', window.scrollY > 12);
      ticking = false;
    };

    update();
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }, { passive: true });
  }

  setupMenu() {
    if (!this.menuToggle || !this.mainNav) return;

    this.menuToggle.addEventListener('click', () => {
      const isOpen = this.mainNav.classList.toggle('open');
      this.menuToggle.classList.toggle('open', isOpen);
      this.menuToggle.setAttribute('aria-expanded', String(isOpen));
      this.menuToggle.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
    });

    this.mainNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => this.closeMenu());
    });

    document.addEventListener('click', (event) => {
      if (!this.mainNav.classList.contains('open')) return;
      if (event.target.closest('#main-nav') || event.target.closest('.menu-toggle')) return;
      this.closeMenu();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && this.mainNav.classList.contains('open')) {
        this.closeMenu();
        this.menuToggle.focus();
      }
    });
  }

  closeMenu() {
    this.mainNav.classList.remove('open');
    this.menuToggle.classList.remove('open');
    this.menuToggle.setAttribute('aria-expanded', 'false');
    this.menuToggle.setAttribute('aria-label', 'Открыть меню');
  }

  /* --- тип поездки --- */

  setupTripSwitch() {
    this.tripOptions.forEach((option, index) => {
      option.addEventListener('click', () => this.selectTrip(option));
      option.addEventListener('keydown', (event) => {
        if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
        event.preventDefault();
        const step = event.key === 'ArrowRight' ? 1 : -1;
        const next = this.tripOptions[(index + step + this.tripOptions.length) % this.tripOptions.length];
        next.focus();
        this.selectTrip(next);
      });
    });
  }

  selectTrip(option) {
    this.tripOptions.forEach((item) => {
      const selected = item === option;
      item.classList.toggle('selected', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    this.trip = option.dataset.trip || 'round';
    this.datePicker.setTrip(this.trip);
  }

  /* --- обмен городов --- */

  setupSwap() {
    this.swapButton?.addEventListener('click', () => {
      const from = this.fromPicker.city;
      const to = this.toPicker.city;
      if (!from && !to) return;

      if (to) this.fromPicker.setCity(to); else this.fromPicker.clear();
      if (from) this.toPicker.setCity(from); else this.toPicker.clear();

      this.swapButton.classList.toggle('is-rotating');
    });
  }

  /* --- поиск --- */

  setupForm() {
    this.form?.addEventListener('submit', (event) => {
      event.preventDefault();
      PopoverManager.closeAll();
      this.runSearch();
    });
  }

  validate() {
    const problems = [];

    if (!this.fromPicker.city) {
      problems.push({ root: this.fromPicker.root, focus: this.fromPicker.input, message: 'Выберите город вылета из списка.' });
    }
    if (!this.toPicker.city) {
      problems.push({ root: this.toPicker.root, focus: this.toPicker.input, message: 'Выберите город прилёта из списка.' });
    }
    if (this.fromPicker.city && this.toPicker.city && this.fromPicker.city.code === this.toPicker.city.code) {
      problems.push({ root: this.toPicker.root, focus: this.toPicker.input, message: 'Города вылета и прилёта должны отличаться.' });
    }
    if (!this.datePicker.depart) {
      problems.push({ root: this.datePicker.root, focus: this.datePicker.trigger, message: 'Выберите дату вылета.' });
    }

    return problems;
  }

  runSearch() {
    document.querySelectorAll('.field.has-error').forEach((field) => field.classList.remove('has-error'));
    const problems = this.validate();

    if (problems.length) {
      problems.forEach((problem) => problem.root.classList.add('has-error'));
      this.showStatus(problems.map((p) => p.message).join(' '), true);
      problems[0].focus.focus();
      return;
    }

    const query = {
      from: this.fromPicker.city,
      to: this.toPicker.city,
      depart: this.datePicker.depart,
      back: this.trip === 'round' ? this.datePicker.back : null,
      trip: this.trip,
      pax: { ...this.paxPicker.state },
      cabin: this.paxPicker.state.cabin
    };

    this.lastQuery = query;
    this.showStatus('Опрашиваем авиакомпании…');
    this.submitButton.disabled = true;
    this.showSkeleton();

    window.setTimeout(() => {
      this.offers = FlightEngine.search(query);
      this.submitButton.disabled = false;
      this.renderResults();

      const count = this.offers.length;
      this.showStatus(count
        ? `Нашли ${count} ${plural(count, 'вариант', 'варианта', 'вариантов')} — цены за всех пассажиров, туда${query.back ? ' и обратно' : ''}.`
        : 'Прямых предложений нет. Попробуйте изменить даты или направление.');
    }, 700);
  }

  showSkeleton() {
    this.resultsSection.hidden = false;
    this.resultsTitle.textContent = `${this.lastQuery.from.city} → ${this.lastQuery.to.city}`;
    this.resultsMeta.textContent = 'Подбираем рейсы…';
    this.resultsList.innerHTML = '<div class="skeleton-card"></div><div class="skeleton-card"></div><div class="skeleton-card"></div>';

    const top = this.resultsSection.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  /* --- сортировка --- */

  setupSort() {
    this.sortChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        this.sort = chip.dataset.sort;
        this.sortChips.forEach((item) => {
          const selected = item === chip;
          item.classList.toggle('selected', selected);
          item.setAttribute('aria-pressed', String(selected));
        });
        this.renderResults();
      });
    });
  }

  sortedOffers() {
    const list = [...this.offers];
    if (this.sort === 'duration') list.sort((a, b) => a.totalMinutes - b.totalMinutes || a.total - b.total);
    else if (this.sort === 'departure') list.sort((a, b) => a.departureMinutes - b.departureMinutes || a.total - b.total);
    else list.sort((a, b) => a.total - b.total || a.totalMinutes - b.totalMinutes);
    return list;
  }

  /* --- выдача --- */

  renderResults() {
    if (!this.lastQuery) return;
    const query = this.lastQuery;
    const offers = this.sortedOffers();

    this.resultsSection.hidden = false;
    this.resultsTitle.textContent = `${query.from.city} → ${query.to.city}`;

    const dateText = query.back
      ? `${formatDayMonth(query.depart)} — ${formatDayMonth(query.back)}`
      : formatDayMonth(query.depart);
    const total = query.pax.adults + query.pax.children + query.pax.infants;

    this.resultsMeta.textContent = [
      dateText,
      `${total} ${plural(total, 'пассажир', 'пассажира', 'пассажиров')}`,
      CABINS[query.cabin].label,
      `${offers.length} ${plural(offers.length, 'рейс', 'рейса', 'рейсов')}`
    ].join(' · ');

    if (!offers.length) {
      this.resultsList.innerHTML = '<p class="suggest-empty">По этому маршруту сейчас нет вариантов. Попробуйте соседние даты.</p>';
      return;
    }

    this.resultsList.innerHTML = offers.map((offer, index) => this.cardHtml(offer, index)).join('');
    this.bindCards();
  }

  cardHtml(offer, index) {
    const legsHtml = offer.legs.map((leg, i) => this.legHtml(leg, offer.legs.length > 1 ? (i === 0 ? 'Туда' : 'Обратно') : 'Рейс')).join('');
    const seat = offer.legs[0];
    const perPerson = formatMoney(offer.perAdult);

    return `
      <article class="flight-card${offer.badge === 'Лучшая цена' ? ' is-best' : ''}" style="--delay:${index * 60}ms" data-offer="${esc(offer.id)}">
        <div class="flight-main">
          <div class="flight-airline">
            <span class="airline-logo">${esc(offer.airline.code)}</span>
            <span>
              <span class="airline-name">${esc(offer.airline.name)}</span><br>
              <span class="airline-flight">${esc(seat.flightNo)} · ${esc(seat.aircraft)}</span>
            </span>
            ${offer.badge ? `<span class="badge">${esc(offer.badge)}</span>` : ''}
          </div>

          ${legsHtml}

          <div class="flight-chips">
            <span class="chip chip--seat">Место ${esc(seat.seat)} · ${esc(seat.seatKind)}</span>
            <span class="chip">${esc(CABINS[offer.cabin].label)}</span>
            <span class="chip">${esc(offer.baggage)}</span>
            <span class="chip">${offer.refundable ? 'Возврат по тарифу' : 'Невозвратный'}</span>
          </div>

          <button class="details-toggle" type="button" aria-expanded="false">Детали рейса</button>
        </div>

        <div class="flight-side">
          <span class="flight-price">${formatMoney(offer.total)}</span>
          <span class="flight-price-note">${perPerson} за взрослого</span>
          <button class="pick-button" type="button">Выбрать</button>
        </div>

        <div class="flight-details" hidden>
          ${offer.legs.map((leg, i) => this.detailHtml(leg, offer.legs.length > 1 ? (i === 0 ? 'Туда' : 'Обратно') : 'Маршрут')).join('')}
          <div class="detail-row"><strong>Оплата</strong><span>Бронь держим 30 минут, оплата на сайте или по счёту. Подтверждение придёт на ${CONTACT_EMAIL}.</span></div>
        </div>
      </article>
    `;
  }

  legHtml(leg, tag) {
    const stops = leg.hub
      ? `1 пересадка · ${esc(leg.hub.city)} ${formatDuration(leg.layover)}`
      : 'Прямой рейс';

    return `
      <div class="leg">
        <span class="leg-tag">${esc(tag)}</span>
        <div class="leg-time">
          <strong>${formatTime(leg.depMinutes)}</strong>
          <small>${esc(leg.origin.code)} · ${formatDayMonth(leg.date)}</small>
        </div>
        <div class="leg-path">
          <span class="leg-duration">${formatDuration(leg.minutes)}</span>
          <span class="leg-line">${leg.hub ? '<i></i>' : ''}</span>
          <span class="leg-stops${leg.hub ? '' : ' is-direct'}">${stops}</span>
        </div>
        <div class="leg-time leg-time--end">
          <strong>${formatTime(leg.arrMinutes)}${leg.dayOffset ? `<sup>+${leg.dayOffset}</sup>` : ''}</strong>
          <small>${esc(leg.destination.code)} · ${formatDayMonth(leg.arrivalDate)}</small>
        </div>
      </div>
    `;
  }

  detailHtml(leg, tag) {
    const route = leg.hub
      ? `${leg.origin.city} (${leg.origin.airport}) → ${leg.hub.city} → ${leg.destination.city} (${leg.destination.airport})`
      : `${leg.origin.city} (${leg.origin.airport}) → ${leg.destination.city} (${leg.destination.airport})`;

    return `
      <div class="detail-row">
        <strong>${esc(tag)}</strong>
        <span>
          ${esc(route)}<br>
          ${esc(leg.flightNo)} · ${esc(leg.aircraft)} · ${formatDuration(leg.minutes)} в пути · ${leg.km.toLocaleString('ru-RU')} км<br>
          Место ${esc(leg.seat)} (${esc(leg.seatKind)}), выход на посадку закрывается за 20 минут до вылета.
        </span>
      </div>
    `;
  }

  bindCards() {
    this.resultsList.querySelectorAll('.flight-card').forEach((card) => {
      const toggle = card.querySelector('.details-toggle');
      const details = card.querySelector('.flight-details');

      toggle.addEventListener('click', () => {
        const open = details.hidden;
        details.hidden = !open;
        toggle.textContent = open ? 'Скрыть детали' : 'Детали рейса';
        toggle.setAttribute('aria-expanded', String(open));
      });

      card.querySelector('.pick-button').addEventListener('click', (event) => {
        const button = event.currentTarget;
        const offer = this.offers.find((item) => item.id === card.dataset.offer);
        this.resultsList.querySelectorAll('.pick-button').forEach((other) => {
          other.classList.remove('is-picked');
          other.textContent = 'Выбрать';
        });
        button.classList.add('is-picked');
        button.textContent = 'Выбрано';
        if (offer) {
          this.showStatus(`Рейс ${offer.legs[0].flightNo}, место ${offer.legs[0].seat} — держим бронь 30 минут. Детали отправили на ${CONTACT_EMAIL}.`);
        }
      });
    });
  }

  /* --- быстрые направления --- */

  setupDestinations() {
    document.querySelectorAll('[data-destination]').forEach((card) => {
      card.addEventListener('click', () => {
        const city = byCode(card.dataset.destination);
        if (!city) return;
        if (this.fromPicker.city?.code === city.code) this.fromPicker.setCity(byCode('MOW'));
        this.toPicker.setCity(city);
        document.querySelector('#search').scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.setTimeout(() => this.runSearch(), 500);
      });
    });
  }

  /* --- статус --- */

  showStatus(message, isError = false) {
    if (!this.formStatus) return;
    this.formStatus.textContent = message;
    this.formStatus.classList.toggle('error', isError);
    this.formStatus.classList.remove('is-shown');
    void this.formStatus.offsetWidth;
    this.formStatus.classList.add('is-shown');
  }

  /* --- меню и появление --- */

  setupNavHighlight() {
    const sections = Array.from(document.querySelectorAll('main section[id]'));
    const links = Array.from(document.querySelectorAll('.main-nav a'));
    if (!sections.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute('id');
        links.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach((section) => observer.observe(section));
  }

  setupReveal() {
    const items = Array.from(document.querySelectorAll('[data-reveal]'));
    if (!items.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

    items.forEach((item) => observer.observe(item));
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new Sivorytka_AirlanceApp());
} else {
  new Sivorytka_AirlanceApp();
}
