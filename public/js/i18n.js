(function () {
  'use strict';

  var STORAGE_KEY = 'lang';
  var SUPPORTED = ['en', 'ru'];
  var FALLBACK = 'en';

  var dict = {
    en: {
      'meta.title': 'Portfolio',
      'name.full': 'Alexander Levin',

      'menu.main': 'Home',
      'menu.about': 'About me',
      'menu.skills': 'Skills',
      'menu.experience': 'Work experience',
      'menu.education': 'Education',
      'menu.projects': 'Projects',
      'menu.contacts': 'Contacts',
      'lang.label': 'Language',

      'hero.kicker': 'Aspiring developer',
      'hero.title': 'Alexander Levin',
      'hero.subtitle': 'I build projects, learn new technologies, and keep growing in programming.',

      'about.title': 'About me',
      'about.text': 'I am an aspiring developer passionate about programming and building my own projects. I learn quickly, enjoy exploring new technologies, and try to apply what I learn in practice. <br>' +
        'I like solving technical problems, experimenting with ideas, and finding ways to make my projects better. In my free time I enjoy video games, reading, comics, and tabletop role-playing games. I am also interested in designing my own game concepts and exploring how virtual worlds and their mechanics work. <br>' +
        'I strive to keep growing, improve my skills, and create useful, interesting, high-quality projects.',
      'quotes.title': 'Quotes',

      'skills.title': 'Skills',
      'skill.1.name': 'English',
      'skill.1.desc': 'B2–C1 level: I confidently read technical documentation, understand complex texts, and can communicate on professional topics. I am continuing to improve toward C1.',
      'skill.2.desc': 'I work confidently with Unity, develop gameplay mechanics, and use the engine\'s core tools to build game projects.',
      'skill.3.desc': 'I am learning the Godot engine, its tools, scene system, and the GDScript language for game development.',
      'skill.4.desc': 'I have an intermediate level of Python: I write scripts, work with basic data structures, and automate tasks.',
      'skill.5.desc': 'I have an intermediate level of HTML5: I build web page structure and use semantic markup and core HTML elements.',
      'skill.6.desc': 'I use AI effectively for work tasks: writing prompts, generating and analyzing code, finding solutions, automating processes, and speeding up development.',

      'exp.title': 'Work experience',
      'exp.1.date': 'May 2026 – September 2026',
      'exp.1.title': 'Support operator',
      'exp.1.text': 'Worked as a support operator at CDEK, handling chats and calls. Dealt with claims and dissatisfied customers.',
      'exp.2.date': 'September 2025 – March 2026',
      'exp.2.title': 'Chat support operator',
      'exp.2.text': 'Worked as a chat support operator at the Ozon marketplace. Helped customers with orders, claims, and errors in the app and website.',
      'exp.3.date': 'June 2025',
      'exp.3.title': 'On-foot courier',
      'exp.3.text': 'Delivered orders from cafés and restaurants on foot.',
      'exp.4.date': 'July – August 2024',
      'exp.4.title': 'PlayStation club administrator',
      'exp.4.text': 'Kept order in the club, took payments, and tracked playing time. Helped set up consoles.',

      'edu.college': 'Central Asian Technical and Economic College',
      'edu.years': '2022–2025',
      'edu.specialty': 'Specialty: Software developer',
      'edu.qualification': 'Technical specialist',
      'edu.extra': 'Additional information: during my studies I learned the following technologies: Python, C#, Unity, Web, Arduino',

      'proj.title': 'Projects',
      'proj.1.name': '2D platformer about time travel',
      'proj.1.desc': 'A 2D platformer where time travel is the core of the gameplay. The player explores levels, overcomes obstacles, and interacts with the environment using the features of different time periods. The project combines classic platformer mechanics with puzzles and a changing game world. The main goal is to create interesting gameplay situations and tie movement mechanics to the time-travel theme. This is a pet project through which I am learning game development and game mechanics design.',
      'proj.2.name': 'Résumé website',
      'proj.2.desc': 'A personal portfolio website created to present my skills, interests, and projects. It brings together information about me, technical competencies, experience, and examples of my work in a single interface. The visual style is inspired by dark fantasy and combines an atmospheric look with convenient navigation. During development I focus on responsive layout, code structure, and content accessibility across devices. The project is also practice in HTML, CSS, and JavaScript.',
      'proj.3.name': 'All-in-one calculator (in progress)',
      'proj.3.desc': 'A small calculator app for everyday arithmetic. The project lets me practice handling user input, working with numbers, and implementing mathematical operations. Special attention is paid to correct expression parsing, displaying results, and preventing calculation errors. The interface is being designed for ease of use and clear feedback to the user. It is a practical project for reinforcing programming basics and building interactive interfaces.',
      'proj.4.name': 'Battleship in space',
      'proj.4.desc': 'A game project that reimagines the classic Battleship in a sci-fi setting. Instead of fixed ship placement, ships can move around the board and use special abilities by spending a limited energy supply. Damage affects ship mobility, and some bonuses let you change position or hide your moves from the opponent. The project includes a mode against a bot and a local two-player battle on one device.',
      'proj.5.name': 'Witch simulator',
      'proj.5.desc': 'A game project about the life of a witch in a fantasy world, where magic and exploring the environment form the core of the experience. The concept lets the player learn magical abilities, experiment with spells, and develop their own skills. An important part of the project is the interaction of game systems, from resource management to using magic in different situations. Developing such a simulator lets me experiment with game logic, character progression, and building an atmospheric world.',

      'contacts.title': 'Contacts',
      'contacts.telegram': 'Alexander Levin'
    },

    ru: {
      'meta.title': 'Портфолио',
      'name.full': 'Левин Александр Васильевич',

      'menu.main': 'Главная',
      'menu.about': 'Обо мне',
      'menu.skills': 'Навыки',
      'menu.experience': 'Рабочий опыт',
      'menu.education': 'Образование',
      'menu.projects': 'Проекты',
      'menu.contacts': 'Контакты',
      'lang.label': 'Язык',

      'hero.kicker': 'Начинающий разработчик',
      'hero.title': 'Левин Александр',
      'hero.subtitle': 'Создаю проекты, изучаю новые технологии и стремлюсь к постоянному развитию в сфере программирования.',

      'about.title': 'Обо мне',
      'about.text': 'Я начинающий разработчик, увлечённый программированием и созданием собственных проектов. Быстро обучаюсь, с интересом осваиваю новые технологии и стараюсь применять полученные знания на практике. <br>' +
        'Мне нравится решать технические задачи, экспериментировать с идеями и находить способы сделать свои проекты лучше. В свободное время я увлекаюсь видеоиграми, чтением, комиксами и настольными ролевыми играми. Также мне интересно разрабатывать собственные игровые концепции и исследовать, как устроены виртуальные миры и их механики. <br>' +
        'Я стремлюсь постоянно развиваться, совершенствовать свои навыки и создавать полезные, интересные и качественные проекты.',
      'quotes.title': 'Цитаты',

      'skills.title': 'Навыки',
      'skill.1.name': 'Английский',
      'skill.1.desc': 'Уровень B2–C1: уверенно читаю техническую документацию, понимаю сложные тексты и могу общаться на профессиональные темы. Продолжаю совершенствовать навыки для достижения уровня C1.',
      'skill.2.desc': 'Уверенно работаю с Unity, разрабатываю игровые механики и использую основные инструменты движка для создания игровых проектов.',
      'skill.3.desc': 'Изучаю движок Godot, осваиваю его инструменты, систему сцен и скриптовый язык GDScript для разработки игр.',
      'skill.4.desc': 'Обладаю средним уровнем владения Python, умею писать скрипты, работать с базовыми структурами данных и автоматизировать задачи.',
      'skill.5.desc': 'Обладаю средним уровнем владения HTML5, умею создавать структуру веб-страниц, использовать семантическую разметку и основные HTML-элементы.',
      'skill.6.desc': 'Умею эффективно использовать ИИ для решения рабочих задач: составления запросов, генерации и анализа кода, поиска решений, автоматизации процессов и ускорения разработки.',

      'exp.title': 'Рабочий опыт',
      'exp.1.date': 'Май 2026-Сентябрь 2026',
      'exp.1.title': 'Оператор поддержки',
      'exp.1.text': 'Работал оператором поддержки в CDEK. Работал с людьми в чатах и звонках. Работал с претензиями, негативно настроенными клиентами.',
      'exp.2.date': 'Сентябрь 2025-Март 2026',
      'exp.2.title': 'Оператор чатов поддержки',
      'exp.2.text': 'Работал оператором поддержки в маркетплейсе Ozon. Работал в чатах. Помогал людям с заказами, претензиями, ошибками в работе приложения и сайта.',
      'exp.3.date': 'Июнь 2025',
      'exp.3.title': 'Пеший курьер',
      'exp.3.text': 'Доставлял заказы из кафе и ресторанов на ногах.',
      'exp.4.date': 'Июль-Август 2024',
      'exp.4.title': 'Администратор PS клуба',
      'exp.4.text': 'Следил за порядком в клубе. Принимал оплату, следил за игровым временем. Помогал с настройкой приставок.',

      'edu.college': 'Центральноазиатский Технико-Экономический колледж',
      'edu.years': '2022-2025',
      'edu.specialty': 'Специальность: разработчик программного обеспечения',
      'edu.qualification': 'Технический специалист',
      'edu.extra': 'Дополнительная информация: во время учёбы изучал следующие технологии: Python, C#, Unity, Web, Arduino',

      'proj.title': 'Проекты',
      'proj.1.name': '2д платформер с тематикой путешествия во времени',
      'proj.1.desc': '2D-платформер, в котором тема путешествий во времени становится основой игрового процесса. Игрок исследует уровни, преодолевает препятствия и взаимодействует с окружением, используя особенности разных временных периодов. Проект предполагает сочетание классических механик платформера с головоломками и изменением игрового мира. Основная задача разработки — создать интересные игровые ситуации и связать механику перемещения с временной тематикой. Это pet-проект, в рамках которого я изучаю разработку игр и проектирование игровых механик.',
      'proj.2.name': 'Сайт-резюме',
      'proj.2.desc': 'Персональный сайт-портфолио, созданный для презентации моих навыков, интересов и собственных проектов. Сайт объединяет информацию обо мне, технические компетенции, опыт и примеры выполненных работ в едином интерфейсе. Визуальный стиль вдохновлён тёмным фэнтези и сочетает атмосферное оформление с удобной навигацией. При разработке я уделяю внимание адаптивной вёрстке, структурированию кода и доступности контента на разных устройствах. Проект также служит практикой в HTML, CSS и JavaScript.',
      'proj.3.name': 'Калькулятор всё в одном (в прогрессе)',
      'proj.3.desc': 'Небольшое приложение-калькулятор, предназначенное для выполнения повседневных арифметических вычислений. Проект позволяет отработать обработку пользовательского ввода, работу с числами и реализацию математических операций. Особое внимание уделяется корректной обработке выражений, отображению результата и предотвращению ошибок при вычислениях. Интерфейс разрабатывается с учётом удобства использования и понятной обратной связи для пользователя. Это практический проект для закрепления основ программирования и создания интерактивных интерфейсов.',
      'proj.4.name': 'Морской бой в космосе',
      'proj.4.desc': 'Игровой проект, переосмысляющий классический морской бой в научно-фантастическом сеттинге. Вместо неподвижного размещения кораблей предполагается возможность перемещать их по игровому полю и использовать специальные способности, расходуя ограниченный запас энергии. Повреждения кораблей влияют на их мобильность, а некоторые бонусы позволяют менять позицию или скрывать перемещения от противника. Проект предусматривает режим игры против бота и локальное сражение двух игроков на одном устройстве.',
      'proj.5.name': 'Симулятор ведьмы',
      'proj.5.desc': 'Игровой проект о жизни ведьмы в фэнтезийном мире, где магия и исследование окружающей среды составляют основу игрового опыта. Концепция предполагает возможность изучать магические способности, экспериментировать с заклинаниями и развивать собственные навыки. Важной частью проекта является взаимодействие игровых систем, от управления ресурсами до применения магии в различных ситуациях. Разработка такого симулятора предоставляет возможность экспериментировать с игровой логикой, прогрессией персонажа и созданием атмосферного мира.',

      'contacts.title': 'Контакты',
      'contacts.telegram': 'Левин Александр'
    }
  };

  function readSaved() {
    try {
      var v = localStorage.getItem(STORAGE_KEY);
      return SUPPORTED.indexOf(v) !== -1 ? v : null;
    } catch (e) {
      return null;
    }
  }

  function save(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) { /* хранилище недоступно — просто не сохраняем */ }
  }

  // Автовыбор: сохранённый выбор > язык браузера > английский
  function detect() {
    var saved = readSaved();
    if (saved) return saved;

    var langs = navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language || ''];
    for (var i = 0; i < langs.length; i++) {
      var code = String(langs[i]).toLowerCase().slice(0, 2);
      if (SUPPORTED.indexOf(code) !== -1) return code;
    }
    return FALLBACK;
  }

  var current = FALLBACK;

  function apply(lang) {
    var t = dict[lang];
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) el.textContent = t[key];
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-html');
      if (t[key] !== undefined) el.innerHTML = t[key];
    });

    if (t['meta.title']) document.title = t['meta.title'];

    var select = document.getElementById('lang-select');
    if (select && select.value !== lang) select.value = lang;
  }

  function setLang(lang, persist) {
    if (SUPPORTED.indexOf(lang) === -1) lang = FALLBACK;
    current = lang;
    apply(lang);
    if (persist) save(lang);
    document.dispatchEvent(new CustomEvent('sitelangchange', { detail: { lang: lang } }));
  }

  window.I18N = {
    get lang() { return current; },
    set: function (lang) { setLang(lang, true); }
  };

  current = detect();
  apply(current);

  var select = document.getElementById('lang-select');
  if (select) {
    select.addEventListener('change', function (e) {
      setLang(e.target.value, true);
    });
  }
})();