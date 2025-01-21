export const defaultTextHandlers = [
  {
    id: 'vowels',
    priority: 5,
    visualPriority: 5,
    mimMatchLength: 1,
    label: 'aeiou',
    startCount: 8,
    activeCount: 8,
    persistentCount: 8,
    alerted: false,
    class: 'core',

    process: (
      text: string,
      persistentCount: number
    ): { text: string; modifiedText: string; matchCount: number } => {
      let matchCount = 0;
    
      // Replace matched characters and count them
      let modifiedText = text.replace(/[aeiou]/gi, (match) => {
        if (matchCount >= persistentCount) {
          return match;
        }
        matchCount++;
        return '';
      });
    
      return {
        text,
        modifiedText,
        matchCount,
      };
    }
  },

  {
    id: 'constonants',
    priority: 5,
    visualPriority: 5,
    mimMatchLength: 1,
    label: 'zxcvb...',
    startCount: 20,
    activeCount: 20,
    persistentCount: 20,
    alerted: false,
    class: 'core',

    process: (
      text: string,
      persistentCount: number
    ): { text: string; modifiedText: string; matchCount: number } => {
      let matchCount = 0;
    
      // Replace matched characters and count them
      let modifiedText = text.replace(/[bcdfghjklmnpqrstvwxyz]/gi, (match) => {
        if (matchCount >= persistentCount) {
          return match;
        }
        matchCount++;
        return '';
      });
    
      return {
        text,
        modifiedText,
        matchCount,
      };
    }
  },
  {
    id: 'whitespace',
    priority: 10,
    visualPriority: 5,
    mimMatchLength: 1,
    label: '<space>',
    startCount: 10,
    activeCount: 10,
    persistentCount: 10,
    alerted: false,
    class: 'core',

    process: (
      text: string,
      persistentCount: number
    ): { text: string; modifiedText: string; matchCount: number } => {
      let matchCount = 0;
    
      // Replace matched characters and count them
      let modifiedText = text.replace(/[\s]/gi, (match) => {
        if (matchCount >= persistentCount) {
          return match;
        }
        matchCount++;
        return '';
      });
    
      return {
        text,
        modifiedText,
        matchCount,
      };
    }
  },
  {
    id: 'specials',
    priority: 5,
    visualPriority: 5,
    mimMatchLength: 1,
    label: '?%&!',
    startCount: 3,
    activeCount: 3,
    persistentCount: 3,
    alerted: false,
    class: 'core',

    process: (
      text: string,
      persistentCount: number
    ): { text: string; modifiedText: string; matchCount: number } => {
      let matchCount = 0;
    
      // Replace matched characters and count them
      let modifiedText = text.replace(/[\?\%\&\*\_\-\"\'\(\)\\]/ig, (match) => {
        if (matchCount >= persistentCount) {
          return match;
        }
        matchCount++;
        return '';
      });
    
      return {
        text,
        modifiedText,
        matchCount,
      };
    }
  },
  {
    id: 'a',
    priority: 4,
    visualPriority: 30,
    mimMatchLength: 1,
    label: 'a',
    startCount: 3,
    activeCount: 3,
    persistentCount: 3,
    alerted: false,
    class: 'letters',

    process: (
      text: string,
      persistentCount: number
    ): { text: string; modifiedText: string; matchCount: number } => {
      let matchCount = 0;
    
      // Replace matched characters and count them
      let modifiedText = text.replace(/[a]/ig, (match) => {
        if (matchCount >= persistentCount) {
          return match;
        }
        matchCount++;
        return '';
      });
    
      return {
        text,
        modifiedText,
        matchCount,
      };
    }
  },
  {
    id: 'hello',
    priority: 2,
    visualPriority: 20,
    mimMatchLength: 5,
    label: '"hello"',
    startCount: 5,
    activeCount: 5,
    persistentCount: 5,
    alerted: false,
    class: 'words',

    process: (
      text: string,
      persistentCount: number
    ): { text: string; modifiedText: string; matchCount: number } => {
      let matchCount = 0;
    
      // Replace matched characters and count them
      let modifiedText = text.replace(/hello/ig, (match) => {
        if (matchCount >= persistentCount) {
          return match;
        }
        matchCount++;
        return '';
      });
    
      return {
        text,
        modifiedText,
        matchCount,
      };
    }
  }
];
