export const supportedLocales = ['ru', 'kk'] as const;

export type Locale = (typeof supportedLocales)[number];

export const DEFAULT_LOCALE: Locale = 'ru';
export const LOCALE_STORAGE_KEY = 'webka-locale';
export const LOCALE_COOKIE_KEY = 'webka-locale';

const messages = {
  ru: {
    common: {
      unknownError: 'Неизвестная ошибка',
      goHome: 'На главную',
      selectOption: 'Выберите вариант',
    },
    language: {
      switcherLabel: 'Выбор языка',
      russian: 'Русский',
      kazakh: 'Қазақша',
      shortRussian: 'РУС',
      shortKazakh: 'ҚАЗ',
    },
    header: {
      home: 'Главная',
      articles: 'Статьи',
      create: 'Создать',
      profile: 'Профиль',
      mainNavigation: 'Основная навигация',
      mobileNavigation: 'Мобильная навигация',
      signedIn: 'Вы вошли',
      login: 'Войти',
      join: 'Регистрация',
      logout: 'Выйти',
      toggleMenu: 'Открыть меню',
      brandTagline: 'Современное медиа-пространство',
    },
    home: {
      eyebrow: 'Современная редакционная платформа',
      title: 'Современная публикация новостей с более спокойным и точным чтением.',
      description:
        'NewsHub ощущается как полноценный продукт: чище типографика, сильнее иерархия и заметно лучше путь от просмотра к публикации.',
      exploreArticles: 'Смотреть статьи',
      startWriting: 'Начать писать',
      livePreview: 'Живой пример',
      refreshedUi: 'Обновлённый интерфейс',
      featuredStory: 'Главная история',
      featuredStoryTitle: 'Обновления дизайна делают контент более надёжным и убедительным.',
      featuredStoryDescription:
        'Лучше контраст, ритм и фокус на том, что действительно важно: на самом тексте.',
      statPublishingRhythm: 'ритм публикаций',
      statResponsiveLayout: 'адаптивный интерфейс',
      statReadersAuthors: 'для читателей и авторов',
      featureFastTitle: 'Быстрый сценарий чтения',
      featureFastDescription:
        'Более чистая подача статьи помогает быстро просматривать материал, сохранять интерес и возвращаться снова.',
      featureCreatorsTitle: 'Сделано для авторов',
      featureCreatorsDescription:
        'Авторы проходят путь от идеи до публикации в простом и аккуратном редакторском процессе.',
      featureClarityTitle: 'Редакционная ясность',
      featureClarityDescription:
        'Лучшие отступы, более сильная иерархия и понятные сценарии действий на всех страницах.',
      readyEyebrow: 'Готово к публикации',
      readyTitle: 'Превращайте читателей в авторов с более чистым сценарием создания.',
      readyDescription:
        'Зарегистрируйтесь, войдите и публикуйте материалы в более цельном интерфейсе по всему сайту.',
      createAccount: 'Создать аккаунт',
      browseFeed: 'Открыть ленту',
    },
    login: {
      eyebrow: 'С возвращением',
      title: 'Войдите и продолжайте публиковать уверенно.',
      description: 'Откройте профиль, управляйте статьями и продолжайте редакционную работу без лишних шагов.',
      formTitle: 'Вход',
      formDescription: 'Используйте данные своей учётной записи, чтобы войти на платформу.',
      emailLabel: 'Email',
      passwordLabel: 'Пароль',
      emailPlaceholder: 'you@example.com',
      passwordHelp: 'Минимум 6 символов',
      submit: 'Войти в кабинет',
      needAccount: 'Нет аккаунта?',
      createOne: 'Создать',
      invalidEmail: 'Введите корректный email',
      invalidPassword: 'Пароль должен содержать минимум 6 символов',
      invalidCredentials: 'Неверный email или пароль',
      success: 'Вход выполнен',
    },
    register: {
      eyebrow: 'Присоединяйтесь к платформе',
      title: 'Создайте аккаунт для публикации, редактирования и роста аудитории.',
      description: 'Один раз заполните профиль и используйте его во всём редакционном опыте NewsHub.',
      formTitle: 'Создать аккаунт',
      formDescription: 'Присоединяйтесь к сообществу и начинайте публиковать.',
      nameLabel: 'Полное имя',
      emailLabel: 'Email',
      passwordLabel: 'Пароль',
      confirmPasswordLabel: 'Подтвердите пароль',
      namePlaceholder: 'Иван Иванов',
      emailPlaceholder: 'you@example.com',
      passwordHelp: 'Минимум 6 символов',
      submit: 'Создать аккаунт',
      alreadyRegistered: 'Уже зарегистрированы?',
      login: 'Войти',
      invalidName: 'Имя должно содержать минимум 2 символа',
      invalidEmail: 'Введите корректный email',
      invalidPassword: 'Пароль должен содержать минимум 6 символов',
      passwordsMismatch: 'Пароли не совпадают',
      success: 'Регистрация прошла успешно. Переход к входу...',
    },
    articles: {
      eyebrow: 'Лента статей',
      title: 'Открывайте свежие истории от сообщества.',
      description: 'Ищите, фильтруйте и просматривайте статьи в более чистой журнальной ленте.',
      publishArticle: 'Опубликовать статью',
      searchPlaceholder: 'Поиск по заголовку, автору или содержанию',
      newest: 'Сначала новые',
      oldest: 'Сначала старые',
      editorialCover: 'Обложка статьи',
      noResultsTitle: 'По вашему запросу ничего не найдено.',
      noResultsDescription: 'Попробуйте другой запрос или опубликуйте первый материал по этой теме.',
      createFirst: 'Создать первую статью',
    },
    article: {
      unavailable: 'Недоступно',
      notFoundTitle: 'Статья не найдена',
      notFoundDescription: 'Эта статья могла быть удалена или ссылка больше не действует.',
      backToArticles: 'К статьям',
      backToFeed: 'Назад к ленте',
      featuredVisual: 'Главное изображение статьи',
      writtenBy: 'Автор',
      editArticle: 'Редактировать статью',
      deleteArticle: 'Удалить статью',
      confirmDelete: 'Вы уверены, что хотите удалить эту статью?',
      deleteSuccess: 'Статья удалена',
    },
    createArticle: {
      redirectingLogin: 'Перенаправление на страницу входа...',
      eyebrow: 'Студия автора',
      title: 'Опубликуйте новую статью в более чистом редакционном процессе.',
      description: 'Добавьте сильный заголовок, насыщенный текст, визуальный контекст и понятные теги в одном месте.',
      formTitle: 'Новая статья',
      formDescription: 'Поделитесь своей точкой зрения с сообществом.',
      titleLabel: 'Заголовок статьи',
      contentLabel: 'Содержание',
      imageLabel: 'URL главного изображения',
      tagsLabel: 'Теги',
      titlePlaceholder: 'Напишите сильный заголовок',
      contentPlaceholder: 'Напишите полный текст статьи...',
      imagePlaceholder: 'https://example.com/image.jpg',
      tagsPlaceholder: 'новости, технологии, дизайн',
      submit: 'Опубликовать статью',
      invalidTitle: 'Заголовок должен быть не короче 5 символов',
      invalidContent: 'Текст должен быть не короче 20 символов',
      invalidImage: 'Введите корректный URL изображения (http/https) или оставьте поле пустым',
      success: 'Статья успешно создана',
    },
    editArticle: {
      eyebrow: 'Режим редактирования',
      title: 'Доработайте статью перед тем, как она снова попадёт к читателям.',
      formTitle: 'Редактировать статью',
      formDescription: 'Обновите текст, изображение и теги.',
      submit: 'Сохранить изменения',
      cancel: 'Отмена',
      invalidTitle: 'Заголовок должен быть не короче 5 символов',
      invalidContent: 'Текст должен быть не короче 20 символов',
      invalidImage: 'Введите корректный URL изображения или оставьте поле пустым',
      loadFailed: 'Не удалось загрузить статью',
      ownOnly: 'Можно редактировать только свои статьи',
      success: 'Статья обновлена',
    },
    profile: {
      signInRequired: 'Требуется вход',
      signInDescription: 'Пожалуйста, войдите, чтобы открыть профиль и рабочее пространство.',
      eyebrow: 'Профиль',
      title: 'Личное пространство для аккаунта и доступа к публикации.',
      formTitle: 'Мой профиль',
      fullName: 'Полное имя',
      email: 'Email',
      role: 'Роль',
      accountId: 'ID аккаунта',
      browseArticles: 'Смотреть статьи',
      createArticle: 'Создать статью',
      signOut: 'Выйти из аккаунта',
      roleAdmin: 'Администратор',
      roleAuthor: 'Автор',
      roleReader: 'Читатель',
    },
    notFound: {
      title: 'Страница не найдена',
      description: 'Страница могла быть перемещена, удалена или ссылка больше не действует.',
      returnHome: 'Вернуться на главную',
    },
    error: {
      label: 'Ошибка приложения',
      title: 'Что-то пошло не так',
      fallback: 'При загрузке страницы произошла непредвиденная ошибка.',
      retry: 'Попробовать снова',
    },
  },
  kk: {
    common: {
      unknownError: 'Белгісіз қате',
      goHome: 'Басты бетке',
      selectOption: 'Нұсқаны таңдаңыз',
    },
    language: {
      switcherLabel: 'Тілді таңдау',
      russian: 'Русский',
      kazakh: 'Қазақша',
      shortRussian: 'РУС',
      shortKazakh: 'ҚАЗ',
    },
    header: {
      home: 'Басты бет',
      articles: 'Мақалалар',
      create: 'Құру',
      profile: 'Профиль',
      mainNavigation: 'Негізгі навигация',
      mobileNavigation: 'Мобильді навигация',
      signedIn: 'Кіру орындалды',
      login: 'Кіру',
      join: 'Тіркелу',
      logout: 'Шығу',
      toggleMenu: 'Мәзірді ашу',
      brandTagline: 'Заманауи медиа кеңістік',
    },
    home: {
      eyebrow: 'Заманауи редакциялық платформа',
      title: 'Жаңалықтарды жариялаудың заманауи тәсілі және сабырлырақ оқу тәжірибесі.',
      description:
        'NewsHub енді толыққанды өнім сияқты сезіледі: типографика таза, иерархия анық, ал оқудан жариялауға дейінгі жол әлдеқайда ыңғайлы.',
      exploreArticles: 'Мақалаларды қарау',
      startWriting: 'Жаза бастау',
      livePreview: 'Тікелей көрініс',
      refreshedUi: 'Жаңарған интерфейс',
      featuredStory: 'Негізгі мақала',
      featuredStoryTitle: 'Дизайн жаңартулары контентті сенімдірек әрі кәсіби етіп көрсетеді.',
      featuredStoryDescription: 'Контраст, ырғақ және ең маңызды нәрсе, яғни мәтіннің өзіне деген назар жақсарды.',
      statPublishingRhythm: 'жариялау ырғағы',
      statResponsiveLayout: 'бейімделгіш интерфейс',
      statReadersAuthors: 'оқырман мен авторға',
      featureFastTitle: 'Жылдам оқу ағымы',
      featureFastDescription:
        'Таза мақала тәжірибесі келушілерге мазмұнды жылдам қарап, қызығушылықты сақтап, қайта оралуға көмектеседі.',
      featureCreatorsTitle: 'Авторлар үшін жасалған',
      featureCreatorsDescription:
        'Авторлар ойдан бастап жарияланған материалға дейінгі жолды қарапайым әрі ұқыпты редактор ағынымен өтеді.',
      featureClarityTitle: 'Редакциялық айқындық',
      featureClarityDescription:
        'Жақсырақ арақашықтық, күшті иерархия және әр беттегі түсінікті әрекет сценарийлері.',
      readyEyebrow: 'Жариялауға дайын',
      readyTitle: 'Мазмұн жасаудың ыңғайлы ағынымен оқырманды авторға айналдырыңыз.',
      readyDescription: 'Тіркеліп, кіріп, сайттың барлық бөлігінде біртұтас әрі жинақы интерфейспен жариялаңыз.',
      createAccount: 'Аккаунт ашу',
      browseFeed: 'Лентаны ашу',
    },
    login: {
      eyebrow: 'Қайта келуіңізбен',
      title: 'Жүйеге кіріп, жариялауды сенімді түрде жалғастырыңыз.',
      description: 'Профильге кіріп, мақалаларды басқарып, редакциялық жұмысты кідіріссіз жалғастырыңыз.',
      formTitle: 'Кіру',
      formDescription: 'Платформаға кіру үшін аккаунт деректерін пайдаланыңыз.',
      emailLabel: 'Email',
      passwordLabel: 'Құпиясөз',
      emailPlaceholder: 'you@example.com',
      passwordHelp: 'Кемінде 6 таңба',
      submit: 'Жұмыс аймағына кіру',
      needAccount: 'Аккаунтыңыз жоқ па?',
      createOne: 'Тіркелу',
      invalidEmail: 'Дұрыс email енгізіңіз',
      invalidPassword: 'Құпиясөз кемінде 6 таңбадан тұруы керек',
      invalidCredentials: 'Email немесе құпиясөз қате',
      success: 'Кіру сәтті орындалды',
    },
    register: {
      eyebrow: 'Платформаға қосылыңыз',
      title: 'Жариялау, өңдеу және аудиторияңызды өсіру үшін аккаунт ашыңыз.',
      description: 'Профильді бір рет толтырып, оны NewsHub редакциялық тәжірибесінің барлық бөлігінде пайдаланыңыз.',
      formTitle: 'Аккаунт ашу',
      formDescription: 'Қауымдастыққа қосылып, жариялауды бастаңыз.',
      nameLabel: 'Толық аты',
      emailLabel: 'Email',
      passwordLabel: 'Құпиясөз',
      confirmPasswordLabel: 'Құпиясөзді растаңыз',
      namePlaceholder: 'Айдана Серік',
      emailPlaceholder: 'you@example.com',
      passwordHelp: 'Кемінде 6 таңба',
      submit: 'Аккаунт ашу',
      alreadyRegistered: 'Тіркеліп қойғансыз ба?',
      login: 'Кіру',
      invalidName: 'Аты кемінде 2 таңбадан тұруы керек',
      invalidEmail: 'Дұрыс email енгізіңіз',
      invalidPassword: 'Құпиясөз кемінде 6 таңбадан тұруы керек',
      passwordsMismatch: 'Құпиясөздер сәйкес келмейді',
      success: 'Тіркелу сәтті аяқталды. Кіру бетіне өтеміз...',
    },
    articles: {
      eyebrow: 'Мақалалар легі',
      title: 'Қауымдастықтың жаңа материалдарын ашыңыз.',
      description: 'Таза журнал стиліндегі лентада мақалаларды іздеп, сүзгілеп және қараңыз.',
      publishArticle: 'Мақала жариялау',
      searchPlaceholder: 'Тақырып, автор немесе мазмұн бойынша іздеу',
      newest: 'Алдымен жаңалары',
      oldest: 'Алдымен ескілері',
      editorialCover: 'Мақала мұқабасы',
      noResultsTitle: 'Сұрауыңыз бойынша ештеңе табылмады.',
      noResultsDescription: 'Басқа кілтсөзді қолданып көріңіз немесе осы тақырыптағы алғашқы материалды жариялаңыз.',
      createFirst: 'Алғашқы мақаланы құру',
    },
    article: {
      unavailable: 'Қолжетімсіз',
      notFoundTitle: 'Мақала табылмады',
      notFoundDescription: 'Бұл мақала өшірілген болуы мүмкін немесе сілтеме енді жарамсыз.',
      backToArticles: 'Мақалаларға',
      backToFeed: 'Лентаға оралу',
      featuredVisual: 'Негізгі мақала бейнесі',
      writtenBy: 'Автор',
      editArticle: 'Мақаланы өңдеу',
      deleteArticle: 'Мақаланы жою',
      confirmDelete: 'Бұл мақаланы жойғыңыз келетініне сенімдісіз бе?',
      deleteSuccess: 'Мақала жойылды',
    },
    createArticle: {
      redirectingLogin: 'Кіру бетіне бағытталуда...',
      eyebrow: 'Автор студиясы',
      title: 'Таза редакциялық ағынмен жаңа мақала жариялаңыз.',
      description: 'Бір жерден мықты тақырып, мазмұнды мәтін, визуал және табуға оңай тегтер қосыңыз.',
      formTitle: 'Жаңа мақала',
      formDescription: 'Өз көзқарасыңызды қауымдастықпен бөлісіңіз.',
      titleLabel: 'Мақала тақырыбы',
      contentLabel: 'Мазмұны',
      imageLabel: 'Негізгі сурет URL',
      tagsLabel: 'Тегтер',
      titlePlaceholder: 'Тартымды тақырып жазыңыз',
      contentPlaceholder: 'Мақаланың толық мәтінін осы жерге жазыңыз...',
      imagePlaceholder: 'https://example.com/image.jpg',
      tagsPlaceholder: 'жаңалықтар, технология, дизайн',
      submit: 'Мақаланы жариялау',
      invalidTitle: 'Тақырып кемінде 5 таңбадан тұруы керек',
      invalidContent: 'Мәтін кемінде 20 таңбадан тұруы керек',
      invalidImage: 'Дұрыс сурет URL енгізіңіз (http/https) немесе бос қалдырыңыз',
      success: 'Мақала сәтті құрылды',
    },
    editArticle: {
      eyebrow: 'Өңдеу режимі',
      title: 'Мақаланы оқырманға қайта жібермес бұрын жетілдіріңіз.',
      formTitle: 'Мақаланы өңдеу',
      formDescription: 'Мазмұнды, суретті және тегтерді жаңартыңыз.',
      submit: 'Өзгерістерді сақтау',
      cancel: 'Бас тарту',
      invalidTitle: 'Тақырып кемінде 5 таңбадан тұруы керек',
      invalidContent: 'Мәтін кемінде 20 таңбадан тұруы керек',
      invalidImage: 'Дұрыс сурет URL енгізіңіз немесе бос қалдырыңыз',
      loadFailed: 'Мақаланы жүктеу мүмкін болмады',
      ownOnly: 'Тек өз мақалаңызды өңдей аласыз',
      success: 'Мақала жаңартылды',
    },
    profile: {
      signInRequired: 'Кіру қажет',
      signInDescription: 'Профиль мен жұмыс аймағын ашу үшін жүйеге кіріңіз.',
      eyebrow: 'Профиль',
      title: 'Аккаунтыңыз бен жариялау қолжетімділігіне арналған жеке кеңістік.',
      formTitle: 'Менің профилім',
      fullName: 'Толық аты',
      email: 'Email',
      role: 'Рөлі',
      accountId: 'Аккаунт ID',
      browseArticles: 'Мақалаларды қарау',
      createArticle: 'Мақала құру',
      signOut: 'Аккаунттан шығу',
      roleAdmin: 'Әкімші',
      roleAuthor: 'Автор',
      roleReader: 'Оқырман',
    },
    notFound: {
      title: 'Бет табылмады',
      description: 'Бет жылжытылған, жойылған немесе сілтеме енді жарамсыз болуы мүмкін.',
      returnHome: 'Басты бетке оралу',
    },
    error: {
      label: 'Қолданба қатесі',
      title: 'Бір нәрсе дұрыс болмады',
      fallback: 'Бетті жүктеу кезінде күтпеген қате орын алды.',
      retry: 'Қайталап көру',
    },
  },
} as const;

const knownMessages: Record<string, Record<Locale, string>> = {
  'Internal server error': {
    ru: 'Внутренняя ошибка сервера',
    kk: 'Сервердің ішкі қатесі',
  },
  Unauthorized: {
    ru: 'Требуется авторизация',
    kk: 'Авторизация қажет',
  },
  'Title and content are required': {
    ru: 'Нужны заголовок и содержание',
    kk: 'Тақырып пен мазмұн қажет',
  },
  'Validation failed': {
    ru: 'Проверка данных не пройдена',
    kk: 'Деректер тексерістен өтпеді',
  },
  'Article not found': {
    ru: 'Статья не найдена',
    kk: 'Мақала табылмады',
  },
  'Forbidden: You can only edit your own articles': {
    ru: 'Можно редактировать только свои статьи',
    kk: 'Тек өз мақалаларыңызды өңдей аласыз',
  },
  'Forbidden: You can only delete your own articles': {
    ru: 'Можно удалять только свои статьи',
    kk: 'Тек өз мақалаларыңызды өшіре аласыз',
  },
  'All fields are required': {
    ru: 'Все поля обязательны',
    kk: 'Барлық өрісті толтыру қажет',
  },
  'User already exists': {
    ru: 'Пользователь уже существует',
    kk: 'Пайдаланушы бұрыннан бар',
  },
  'User created successfully': {
    ru: 'Пользователь создан',
    kk: 'Пайдаланушы сәтті құрылды',
  },
  'Failed to register': {
    ru: 'Не удалось зарегистрироваться',
    kk: 'Тіркелу мүмкін болмады',
  },
  'Failed to load articles': {
    ru: 'Не удалось загрузить статьи',
    kk: 'Мақалаларды жүктеу мүмкін болмады',
  },
  'Failed to load article': {
    ru: 'Не удалось загрузить статью',
    kk: 'Мақаланы жүктеу мүмкін болмады',
  },
  'Failed to create article': {
    ru: 'Не удалось создать статью',
    kk: 'Мақаланы құру мүмкін болмады',
  },
  'Failed to update article': {
    ru: 'Не удалось обновить статью',
    kk: 'Мақаланы жаңарту мүмкін болмады',
  },
  'Failed to delete article': {
    ru: 'Не удалось удалить статью',
    kk: 'Мақаланы жою мүмкін болмады',
  },
  'Invalid email or password': {
    ru: 'Неверный email или пароль',
    kk: 'Email немесе құпиясөз қате',
  },
  'Login successful': {
    ru: 'Вход выполнен',
    kk: 'Кіру сәтті орындалды',
  },
  'Registration successful. Redirecting to login...': {
    ru: 'Регистрация прошла успешно. Переход к входу...',
    kk: 'Тіркелу сәтті аяқталды. Кіру бетіне өтеміз...',
  },
  'Article successfully created': {
    ru: 'Статья успешно создана',
    kk: 'Мақала сәтті құрылды',
  },
  'Article updated successfully': {
    ru: 'Статья обновлена',
    kk: 'Мақала жаңартылды',
  },
  'Article deleted successfully': {
    ru: 'Статья удалена',
    kk: 'Мақала жойылды',
  },
  'You can only edit your own articles': {
    ru: 'Можно редактировать только свои статьи',
    kk: 'Тек өз мақалаңызды өңдей аласыз',
  },
  'Unknown error': {
    ru: 'Неизвестная ошибка',
    kk: 'Белгісіз қате',
  },
};

export function isSupportedLocale(value: string): value is Locale {
  return supportedLocales.includes(value as Locale);
}

export function getMessage(locale: Locale, key: string): string {
  const parts = key.split('.');
  let current: unknown = messages[locale];

  for (const part of parts) {
    if (!current || typeof current !== 'object' || !(part in current)) {
      return key;
    }

    current = (current as Record<string, unknown>)[part];
  }

  return typeof current === 'string' ? current : key;
}

export function getLocaleCode(locale: Locale) {
  return locale === 'kk' ? 'kk-KZ' : 'ru-RU';
}

export function translateKnownMessage(locale: Locale, message: string) {
  return knownMessages[message]?.[locale] ?? message;
}

export function formatResultsCount(locale: Locale, count: number) {
  if (locale === 'kk') {
    return `${count} нәтиже`;
  }

  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod10 === 1 && mod100 !== 11) {
    return `${count} результат`;
  }

  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
    return `${count} результата`;
  }

  return `${count} результатов`;
}

export function getRoleLabel(locale: Locale, role: string) {
  const roleKey = {
    admin: 'profile.roleAdmin',
    author: 'profile.roleAuthor',
    reader: 'profile.roleReader',
  }[role];

  return roleKey ? getMessage(locale, roleKey) : role;
}
