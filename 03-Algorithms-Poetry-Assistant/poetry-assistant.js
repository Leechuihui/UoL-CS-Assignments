/**
 * Poetry Assistant Core Algorithms and Data Structures
 * Contains:
 * 1. Trie Tree Data Structure (for fast word lookup)
 * 2. Rhyme Map Data Structure (for rhyming word lookup)
 * 3. Rhyme Detection Algorithm
 * 4. Syllable Counting Algorithm
 */

class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
        this.word = null;
    }
}

/**
 * Trie Tree Data Structure
 * For efficient word storage and prefix lookup
 */
class Trie {
    constructor() {
        this.root = new TrieNode();
        this.wordCount = 0;
    }

    /**
     * Insert a word into the Trie tree
     */
    insert(word) {
        let node = this.root;
        const lowerWord = word.toLowerCase();

        for (let char of lowerWord) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }

        if (!node.isEndOfWord) {
            node.isEndOfWord = true;
            node.word = lowerWord;
            this.wordCount++;
        }
    }

    /**
     * Search if a word exists in the Trie
     */
    search(word) {
        let node = this.root;
        const lowerWord = word.toLowerCase();

        for (let char of lowerWord) {
            if (!node.children[char]) {
                return false;
            }
            node = node.children[char];
        }

        return node.isEndOfWord;
    }

    /**
     * Find all words that start with the given prefix
     */
    findAllWithPrefix(prefix) {
        let node = this.root;
        const lowerPrefix = prefix.toLowerCase();

        // Navigate to the prefix node
        for (let char of lowerPrefix) {
            if (!node.children[char]) {
                return [];
            }
            node = node.children[char];
        }

        // Collect all words starting from this node
        const results = [];
        this._collectWords(node, results);
        return results;
    }

    /**
     * Recursively collect all words (helper method)
     */
    _collectWords(node, results) {
        if (node.isEndOfWord && node.word) {
            results.push(node.word);
        }

        for (let char in node.children) {
            this._collectWords(node.children[char], results);
        }
    }
}

/**
 * Rhyme Map Data Structure
 * Uses hash table to organize words by rhyme pattern
 */
class RhymeMap {
    constructor() {
        // Key: rhyme pattern, Value: array of words
        this.rhymeGroups = new Map();
    }

    /**
     * Add a word to the rhyme map
     */
    addWord(word) {
        const rhymePattern = this._getRhymePattern(word);

        if (!this.rhymeGroups.has(rhymePattern)) {
            this.rhymeGroups.set(rhymePattern, []);
        }

        const lowerWord = word.toLowerCase();
        const group = this.rhymeGroups.get(rhymePattern);
        if (!group.includes(lowerWord)) {
            group.push(lowerWord);
        }
    }

    /**
     * Get the rhyme pattern of a word (improved algorithm)
     * Algorithm: GET-RHYME-PATTERN
     * Based on word ending letter sequences, considers common rhyme rules
     * Uses last 2 characters as rhyme pattern to ensure short and long words can match
     * 
     * Pseudocode correspondence:
     * Line 1: lowerWord = LOWERCASE(TRIM(word))
     * Line 2-3: if LENGTH(lowerWord) == 0 return ""
     * Line 4: len = LENGTH(lowerWord)
     * Line 5-6: if len == 1 return lowerWord
     * Line 7-8: if len >= 4 and ENDS-WITH(lowerWord, "ing") return SUBSTRING(lowerWord, len - 3, len)
     * Line 9-10: if len >= 4 and ENDS-WITH(lowerWord, "ed") return SUBSTRING(lowerWord, len - 3, len)
     * Line 11-12: if len >= 4 and (ENDS-WITH(lowerWord, "er") or ENDS-WITH(lowerWord, "ly")) return SUBSTRING(lowerWord, len - 3, len)
     * Line 13: return SUBSTRING(lowerWord, len - 2, len)
     */
    _getRhymePattern(word) {
        // Line 1: Convert to lowercase and trim whitespace
        const lowerWord = word.toLowerCase().trim();

        // Line 2-3: Handle empty string
        if (lowerWord.length === 0) return '';

        // Line 4: Get word length
        const len = lowerWord.length;

        // Line 5-6: Single character words return the whole word
        if (len === 1) {
            return lowerWord;
        }

        // Line 7-8: Special case: words ending in -ing (e.g., running, playing)
        // Use last 3 characters to group them properly
        if (len >= 4 && lowerWord.endsWith('ing')) {
            return lowerWord.substring(len - 3); // e.g., "ring" -> "ing", "running" -> "ing"
        }

        // Line 9-10: Special case: words ending in -ed (e.g., played, tried)
        // Use 3 characters to account for different pronunciations
        if (len >= 4 && lowerWord.endsWith('ed')) {
            return lowerWord.substring(len - 3); // e.g., "played" -> "yed", "tried" -> "ied"
        }

        // Line 11-12: Special case: words ending in -er or -ly
        if (len >= 4 && (lowerWord.endsWith('er') || lowerWord.endsWith('ly'))) {
            return lowerWord.substring(len - 3); // e.g., "player" -> "yer", "quickly" -> "kly"
        }

        // Line 13: For all other cases, use last 2 characters as rhyme pattern
        // This allows matching "cat" (at) and "splat" (at)
        return lowerWord.substring(len - 2);
    }

    /**
     * Get all words that rhyme with the given word
     */
    getRhymes(word) {
        const lowerWord = word.toLowerCase().trim();
        const rhymePattern = this._getRhymePattern(lowerWord);

        // Find matching rhyme group
        const rhymes = this.rhymeGroups.get(rhymePattern) || [];

        // Filter out the original word itself
        return rhymes.filter(w => w !== lowerWord);
    }

    /**
     * Get the total number of rhyme groups
     */
    getGroupCount() {
        return this.rhymeGroups.size;
    }
}

/**
 * Syllable Counter
 * Estimates the number of syllables in English words
 */
class SyllableCounter {
    /**
     * Count the number of syllables in a word (approximation algorithm)
     * Algorithm: COUNT-SYLLABLES
     * Estimates syllable count based on vowel patterns in English words
     * 
     * Pseudocode correspondence:
     * Line 1: lowerWord = LOWERCASE(TRIM(word))
     * Line 2-3: if LENGTH(lowerWord) == 0 return 0
     * Line 4-5: if LENGTH(lowerWord) <= 3 return 1
     * Line 6: syllables = 0
     * Line 7: prevWasVowel = FALSE
     * Line 8: vowels = SET("a", "e", "i", "o", "u", "y")
     * Line 9-14: for i = 1 to LENGTH(lowerWord) - count vowel groups
     * Line 15-16: if ENDS-WITH(lowerWord, "e") and LENGTH(lowerWord) > 3 and syllables > 1 then syllables = syllables - 1
     * Line 17-18: if ENDS-WITH(lowerWord, "le") and syllables > 1 then syllables = syllables + 1
     * Line 19: return MAX(1, syllables)
     */
    countSyllables(word) {
        // Line 1: Convert to lowercase and trim whitespace
        const lowerWord = word.toLowerCase().trim();

        // Line 2-3: Handle empty string
        if (lowerWord.length === 0) return 0;

        // Line 4-5: Short words (3 or fewer characters) typically have 1 syllable
        if (lowerWord.length <= 3) return 1;

        // Line 6: Initialize syllable counter
        let syllables = 0;

        // Line 7: Track previous character type
        let prevWasVowel = false;

        // Line 8: Define vowel letters (including 'y' which can be a vowel)
        const vowels = new Set(['a', 'e', 'i', 'o', 'u', 'y']);

        // Line 9-14: Count vowel groups (consecutive vowels count as one syllable)
        for (let i = 0; i < lowerWord.length; i++) {
            const char = lowerWord[i];
            const isVowel = vowels.has(char);

            // Line 12-13: If current is vowel and previous was not, count as a syllable
            if (isVowel && !prevWasVowel) {
                syllables++;
            }
            prevWasVowel = isVowel;
        }

        // Line 15-16: Special case: silent 'e' at the end usually doesn't count
        // (e.g., "make" - the 'e' is silent, so subtract one syllable)
        if (lowerWord.endsWith('e') && lowerWord.length > 3 && syllables > 1) {
            syllables--;
        }

        // Line 17-18: Special case: 'le' ending usually forms a syllable
        // (e.g., "table" - the 'le' creates a syllable)
        if (lowerWord.endsWith('le') && syllables > 1) {
            syllables++;
        }

        // Line 19: Ensure at least one syllable (all words have at least one)
        return Math.max(1, syllables);
    }
}

/**
 * Poetry Assistant Main Class
 * Integrates all data structures and algorithms
 */
class PoetryAssistant {
    constructor() {
        this.trie = new Trie();
        this.rhymeMap = new RhymeMap();
        this.syllableCounter = new SyllableCounter();
        this.wordList = [];
        this.isLoaded = false;
    }

    /**
     * Initialize from word list
     */
    async loadWordList(wordList) {
        if (this.isLoaded) return;

        console.log('Starting to load word list...');
        this.wordList = wordList.filter(word => {
            // Filter: only keep alphabetic words, length between 2-20
            return /^[a-zA-Z]+$/.test(word) && word.length >= 2 && word.length <= 20;
        });

        console.log(`Processing ${this.wordList.length} words...`);

        // Build Trie and rhyme map in parallel
        for (const word of this.wordList) {
            this.trie.insert(word);
            this.rhymeMap.addWord(word);
        }

        this.isLoaded = true;
        console.log('Word list loading completed!');
        console.log(`Trie tree contains ${this.trie.wordCount} words`);
        console.log(`Rhyme map contains ${this.rhymeMap.getGroupCount()} rhyme groups`);
    }

    /**
     * Find rhyming words
     */
    findRhymes(word) {
        if (!this.isLoaded) {
            return { error: 'Word list has not been loaded yet' };
        }

        const lowerWord = word.toLowerCase().trim();

        // Check if input is valid
        if (lowerWord.length === 0) {
            return { error: 'Please enter a word' };
        }

        // Check if word contains only letters
        if (!/^[a-zA-Z]+$/.test(lowerWord)) {
            return { error: 'Please enter a valid English word (letters only)' };
        }

        // Even if word is not in the list, try to find rhyming words
        // This allows supporting common words not in the word list
        const wordExists = this.trie.search(lowerWord);
        const rhymes = this.rhymeMap.getRhymes(lowerWord);

        // If word is not in list and no rhymes found, return error
        if (!wordExists && rhymes.length === 0) {
            return { error: `No rhyming words found for "${word}". The word may not be in the word list, or there may be no matching rhyming words.` };
        }

        return {
            word: lowerWord,
            rhymes: rhymes,
            count: rhymes.length,
            wordExists: wordExists  // Mark whether the word is in the list
        };
    }

    /**
     * Find alliteration words (words starting with the same letter)
     */
    findAlliteration(word) {
        if (!this.isLoaded) {
            return { error: 'Word list has not been loaded yet' };
        }

        const lowerWord = word.toLowerCase().trim();

        if (lowerWord.length === 0) {
            return { error: 'Please enter a word' };
        }

        const firstLetter = lowerWord[0];
        const wordsWithSameStart = this.trie.findAllWithPrefix(firstLetter);

        // Filter out the original word itself, and return only first 50
        const alliterations = wordsWithSameStart
            .filter(w => w !== lowerWord)
            .slice(0, 50);

        return {
            letter: firstLetter,
            words: alliterations,
            count: alliterations.length
        };
    }

    /**
     * Get syllable count
     */
    getSyllableCount(word) {
        const lowerWord = word.toLowerCase().trim();
        const count = this.syllableCounter.countSyllables(lowerWord);

        return {
            word: lowerWord,
            syllables: count
        };
    }
}

// Create global instance
const poetryAssistant = new PoetryAssistant();

