export const defaultTextHandlers = [
  {
    id: 'vowels',
    priority: 5,
    mimMatchLength: 1,
    label: 'Vowels',
    startCount: 66,
    activeCount: 66,
    persistentCount: 66,
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
    mimMatchLength: 1,
    label: 'Constonants',
    startCount: 98,
    activeCount: 98,
    persistentCount: 98,
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
    mimMatchLength: 1,
    label: 'Space',
    startCount: 30,
    activeCount: 30,
    persistentCount: 30,
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
    mimMatchLength: 1,
    label: '?%&!',
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
  }
];