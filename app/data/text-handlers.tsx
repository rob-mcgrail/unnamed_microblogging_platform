export const defaultTextHandlers = [
  {
    id: 'vowels',
    priority: 5,
    visualPriority: 5,
    mimMatchLength: 1,
    label: 'Vowels',
    startCount: 8,
    activeCount: 8,
    persistentCount: 8,
    alerted: false,

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
    label: 'Constonants',
    startCount: 20,
    activeCount: 20,
    persistentCount: 20,
    alerted: false,

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
    label: 'Space',
    startCount: 10,
    activeCount: 10,
    persistentCount: 10,
    alerted: false,

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

    process: (
      text: string,
      persistentCount: number
    ): { text: string; modifiedText: string; matchCount: number } => {
      let matchCount = 0;
    
      // Replace matched characters and count them
      let modifiedText = text.replace(/[\?\%\&\*\_\-\"\'\(\)\\]/g, (match) => {
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

    process: (
      text: string,
      persistentCount: number
    ): { text: string; modifiedText: string; matchCount: number } => {
      let matchCount = 0;
    
      // Replace matched characters and count them
      let modifiedText = text.replace(/[a]/g, (match) => {
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
    id: 'hi',
    priority: 2,
    visualPriority: 20,
    mimMatchLength: 1,
    label: 'hi',
    startCount: 5,
    activeCount: 5,
    persistentCount: 5,
    alerted: false,

    process: (
      text: string,
      persistentCount: number
    ): { text: string; modifiedText: string; matchCount: number } => {
      let matchCount = 0;
    
      // Replace matched characters and count them
      let modifiedText = text.replace(/fuck/g, (match) => {
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
